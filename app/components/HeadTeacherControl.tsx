'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface HeadTeacherControlProps {
  schoolId: string;
  liveHeadPhoto: string;
  liveHeadMessage: string;
  onUpdateSuccess: (message: string, photoUrl: string) => void;
}

export default function HeadTeacherControl({ schoolId, liveHeadPhoto, liveHeadMessage, onUpdateSuccess }: HeadTeacherControlProps) {
  const [headMessage, setHeadMessage] = useState(liveHeadMessage || '');
  const [headPhotoUrl, setHeadPhotoUrl] = useState(liveHeadPhoto || '');
  const [headPhotoFile, setHeadPhotoFile] = useState<any>(null);
  const [headLoading, setHeadLoading] = useState(false);
  const [headFeedback, setHeadFeedback] = useState('');

  const [chairmanMessage, setChairmanMessage] = useState('');
  const [chairmanPhotoUrl, setChairmanPhotoUrl] = useState('');
  const [chairmanPhotoFile, setChairmanPhotoFile] = useState<any>(null);
  const [chairmanLoading, setChairmanLoading] = useState(false);
  const [chairmanFeedback, setChairmanFeedback] = useState('');

    const fetchChairmanDataOnControl = async () => {
    try {
      const { data, error } = await supabase.from('schools').select('chairman_text, chairman_img').eq('id', schoolId).single();
      if (!error && data) {
        setChairmanMessage(data.chairman_text || '');
        setChairmanPhotoUrl(data.chairman_img || '');
      }
    } catch (err) { console.error(err); }
  };


  useEffect(() => { fetchChairmanDataOnControl(); }, [schoolId]);

  const handleHeadUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setHeadLoading(true);
    setHeadFeedback('');
    try {
      let finalHeadUrl = headPhotoUrl;
      if (headPhotoFile && headPhotoFile.length > 0) {
        const fileToUpload = headPhotoFile[0];
        const fileExt = fileToUpload.name.split('.').pop();
        const fileName = 'head-' + Date.now() + '.' + fileExt;
        const filePath = schoolId + '/' + fileName;
        const { error: uploadError } = await supabase.storage.from('student-images').upload(filePath, fileToUpload);
        if (uploadError) throw new Error(uploadError.message);
        const { data: { publicUrl } } = supabase.storage.from('student-images').getPublicUrl(filePath);
        finalHeadUrl = publicUrl;
      }

      const { error } = await supabase.from('schools').update({
        head_message: headMessage.trim(),
        head_photo: finalHeadUrl
      }).eq('id', schoolId);

      if (error) {
        setHeadFeedback('❌ আপডেট ব্যর্থ: ' + error.message);
      } else {
        setHeadFeedback('🎉 প্রধান শিক্ষকের বাণী ও ছবি সফলভাবে লাইভ সেভ হয়েছে।');
        setHeadPhotoUrl(finalHeadUrl);
        setHeadPhotoFile(null);
        onUpdateSuccess(headMessage.trim(), finalHeadUrl);
      }
    } catch (err: any) {
      setHeadFeedback('❌ ত্রুটি: ' + err.message);
    } finally {
      setHeadLoading(false);
    }
  };

  const handleChairmanUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setChairmanLoading(true);
    setChairmanFeedback('');
    try {
      let finalChairmanUrl = chairmanPhotoUrl;
      if (chairmanPhotoFile && chairmanPhotoFile.length > 0) {
        const fileToUpload = chairmanPhotoFile[0];
        const fileExt = fileToUpload.name.split('.').pop();
        const fileName = 'chairman-' + Date.now() + '.' + fileExt;
        const filePath = schoolId + '/' + fileName;
        const { error: uploadError } = await supabase.storage.from('student-images').upload(filePath, fileToUpload);
        if (uploadError) throw new Error(uploadError.message);
        const { data: { publicUrl } } = supabase.storage.from('student-images').getPublicUrl(filePath);
        finalChairmanUrl = publicUrl;
      }

               const { error } = await supabase.from('schools').update({
        chairman_text: chairmanMessage.trim(),
        chairman_img: finalChairmanUrl
      }).eq('id', schoolId);


      if (error) {
        setChairmanFeedback('❌ আপডেট ব্যর্থ: ' + error.message);
      } else {
        setChairmanFeedback('🎉 সম্মানিত সভাপতির বাণী ও ছবি সফলভাবে লাইভ সেভ হয়েছে।');
        setChairmanPhotoUrl(finalChairmanUrl);
        setChairmanPhotoFile(null);
      }
    } catch (err: any) {
      setChairmanFeedback('❌ ত্রুটি: ' + err.message);
    } finally {
      setChairmanLoading(false);
    }
  };

  return React.createElement('div', { className: 'w-full space-y-6 animate-scaleUp font-sans' },
    React.createElement('div', { className: 'bg-white p-5 rounded-2xl shadow-sm border' },
      React.createElement('h3', { className: 'text-sm font-black text-blue-950 border-b pb-2 mb-4 font-bold' }, '👨‍💼 প্রধান শিক্ষকের বাণী ও ছবি কন্ট্রোল উইজেট'),
      React.createElement('form', { onSubmit: handleHeadUpdate, className: 'flex flex-col md:flex-row gap-6 items-start w-full' },
        React.createElement('div', { className: 'flex-1 space-y-4 w-full' },
          React.createElement('div', null,
            React.createElement('label', { className: 'font-bold text-slate-600 block mb-1 text-xs' }, 'প্রধান শিক্ষকের বাণী:'),
            React.createElement('textarea', { rows: 4, className: 'w-full p-3 border rounded-xl bg-slate-50 font-medium outline-none text-xs leading-relaxed text-slate-700', value: headMessage, onChange: (e) => setHeadMessage(e.target.value) })
          ),
          React.createElement('button', { type: 'submit', disabled: headLoading, className: 'bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition' }, headLoading ? 'আপডেট হচ্ছে...' : 'প্রধান শিক্ষকের বাণী ও ছবি সংরক্ষণ করুন 💾')
        ),
        React.createElement('div', { className: 'w-full md:w-44 flex flex-col items-center border p-4 bg-slate-50 rounded-2xl flex-shrink-0' },
          React.createElement('span', { className: 'font-bold text-slate-700 mb-2 block text-center text-xs' }, '📷 ছবি প্রিভিউ'),
          React.createElement('div', { className: 'w-24 h-28 bg-white border rounded-xl shadow-inner flex items-center justify-center overflow-hidden mb-3' }, headPhotoFile ? React.createElement('img', { src: URL.createObjectURL(headPhotoFile[0]), className: 'w-full h-full object-cover', alt: 'preview' }) : headPhotoUrl ? React.createElement('img', { src: headPhotoUrl, className: 'w-full h-full object-cover', alt: 'current' }) : React.createElement('span', { className: 'text-2xl text-slate-300' }, '👤') ),
          React.createElement('input', { type: 'file', accept: 'image/*', className: 'text-[10px] w-full bg-white p-1 border rounded cursor-pointer font-bold', onChange: (e: any) => { if (e.target.files && e.target.files.length > 0) setHeadPhotoFile(e.target.files); } })
        )
      ),
      headFeedback && React.createElement('p', { className: 'font-semibold mt-3 p-2 rounded border text-center text-emerald-700 bg-emerald-50 text-xs border-emerald-200' }, headFeedback)
    ),

    React.createElement('div', { className: 'bg-white p-5 rounded-2xl shadow-sm border' },
      React.createElement('h3', { className: 'text-sm font-black text-emerald-950 border-b pb-2 mb-4 font-bold' }, '🤵 সম্মানিত সভাপতির বাণী ও ছবি কন্ট্রোল উইজেট'),
      React.createElement('form', { onSubmit: handleChairmanUpdate, className: 'flex flex-col md:flex-row gap-6 items-start w-full' },
        React.createElement('div', { className: 'flex-1 space-y-4 w-full' },
          React.createElement('div', null,
            React.createElement('label', { className: 'font-bold text-slate-600 block mb-1 text-xs' }, 'সম্মানিত সভাপতির মূল্যবান বাণী ও পরিচিতি:'),
            React.createElement('textarea', { rows: 4, className: 'w-full p-3 border rounded-xl bg-slate-50 font-medium outline-none text-xs leading-relaxed text-slate-700', value: chairmanMessage, onChange: (e) => setChairmanMessage(e.target.value) })
          ),
          React.createElement('button', { type: 'submit', disabled: chairmanLoading, className: 'bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition' }, chairmanLoading ? 'আপডেট হচ্ছে...' : 'সম্মানিত সভাপতির বাণী ও ছবি সংরক্ষণ করুন 💾')
        ),
        React.createElement('div', { className: 'w-full md:w-44 flex flex-col items-center border p-4 bg-slate-50 rounded-2xl flex-shrink-0' },
          React.createElement('span', { className: 'font-bold text-slate-700 mb-2 block text-center text-xs' }, '📷 ছবি প্রিভিউ'),
          React.createElement('div', { className: 'w-24 h-28 bg-white border rounded-xl shadow-inner flex items-center justify-center overflow-hidden mb-3' }, chairmanPhotoFile ? React.createElement('img', { src: URL.createObjectURL(chairmanPhotoFile[0]), className: 'w-full h-full object-cover', alt: 'preview' }) : chairmanPhotoUrl ? React.createElement('img', { src: chairmanPhotoUrl, className: 'w-full h-full object-cover', alt: 'current' }) : React.createElement('span', { className: 'text-2xl text-slate-300' }, '👤') ),
          React.createElement('input', { type: 'file', accept: 'image/*', className: 'text-[10px] w-full bg-white p-1 border rounded cursor-pointer font-bold', onChange: (e: any) => { if (e.target.files && e.target.files.length > 0) setChairmanPhotoFile(e.target.files); } })
        )
      ),
      chairmanFeedback && React.createElement('p', { className: 'font-semibold mt-3 p-2 rounded border text-center text-emerald-700 bg-emerald-50 text-xs border-emerald-200' }, chairmanFeedback)
    )
  );
}
