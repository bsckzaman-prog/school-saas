'use client';

import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface TeacherManagerProps {
  schoolId: string;
  teachers: any;
  fetchTeachers: () => void;
}

export default function TeacherManager({ schoolId, teachers, fetchTeachers }: TeacherManagerProps) {
  const [loading, setLoading] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any>(null);
  const [localPhotoFile, setLocalPhotoFile] = useState<any>(null);

  const handleDeleteTeacher = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিতভাবে এই শিক্ষকের প্রোফাইল ডিলিট করতে চান?')) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('teachers').delete().eq('id', id);
      if (!error) {
        alert('🎉 শিক্ষক সফলভাবে তালিকা থেকে ডিলিট হয়েছে।');
        fetchTeachers();
      } else {
        alert('❌ ডিলিট ব্যর্থ: ' + error.message);
      }
    } catch (err: any) { alert(err.message); } finally { setLoading(false); }
  };

  const handleUpdateTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;
    setLoading(true);
    try {
      let finalPhotoUrl = editingTeacher.teacher_photo || '';
      if (localPhotoFile && localPhotoFile.length > 0) {
        const fileExt = localPhotoFile[0].name.split('.').pop();
        const filePath = `${schoolId}/teacher-update-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('student-images').upload(filePath, localPhotoFile[0]);
        if (!uploadError) {
         const { data } = supabase.storage.from('student-images').getPublicUrl(filePath);
	finalPhotoUrl = data.publicUrl;
        }
      }
      const { error } = await supabase.from('teachers').update({
        name: editingTeacher.name,
        teacher_name_en: editingTeacher.teacher_name_en ? editingTeacher.teacher_name_en.toUpperCase() : '',
        designation: editingTeacher.designation,
        phone: editingTeacher.phone,
        nid_no: editingTeacher.nid_no,
        index_no: editingTeacher.index_no,
        father_name: editingTeacher.father_name,
        mother_name: editingTeacher.mother_name,
        dob: editingTeacher.dob || null,
        mpo_date: editingTeacher.mpo_date || null,
        email: editingTeacher.email,
        qualification: editingTeacher.qualification,
        address: editingTeacher.address,
        teacher_photo: finalPhotoUrl
      }).eq('id', editingTeacher.id);

      if (!error) {
        alert('🎉 শিক্ষকের প্রোফাইল সফলভাবে লাইভ আপডেট হয়েছে!');
        setEditingTeacher(null);
        setLocalPhotoFile(null);
        fetchTeachers();
      } else { alert('❌ আপডেট ব্যর্থ: ' + error.message); }
    } catch (err: any) { alert(err.message); } finally { setLoading(false); }
  };

  return React.createElement('div', { className: 'bg-white p-4 rounded-xl shadow-sm border border-slate-200' },
    React.createElement('h3', { className: 'font-bold text-slate-700 text-sm mb-4 border-b pb-2' }, '📋 বর্তমান শিক্ষক ও কর্মচারীর তালিকা'),
    React.createElement('div', { className: 'overflow-x-auto text-xs' },
      React.createElement('table', { className: 'w-full text-left border-collapse border border-slate-200' },
        React.createElement('thead', null,
          React.createElement('tr', { className: 'bg-slate-100 text-slate-600 font-bold border-b border-slate-200' },
            React.createElement('th', { className: 'p-2.5 border border-slate-200 text-center w-16' }, 'ছবি'),
            React.createElement('th', { className: 'p-2.5 border border-slate-200' }, 'নাম (বাংলা) & English'),
            React.createElement('th', { className: 'p-2.5 border border-slate-200 font-medium text-emerald-800' }, 'পদবী (Designation)'),
            React.createElement('th', { className: 'p-2.5 border border-slate-200' }, 'পারিবারিক তথ্য'),
            React.createElement('th', { className: 'p-2.5 border border-slate-200' }, 'ইনডেক্স ও এনআইডি'),
            React.createElement('th', { className: 'p-2.5 border border-slate-200' }, 'যোগাযোগ ও ইমেইল'),
            React.createElement('th', { className: 'p-2.5 border border-slate-200 w-28 text-center' }, 'অ্যাকশন')
          )
        ),
        React.createElement('tbody', null,
          teachers && teachers.length > 0 ? teachers.map((teacher: any) =>
            React.createElement('tr', { key: teacher.id, className: 'border-b border-slate-200 hover:bg-slate-50 transition-colors' },
              React.createElement('td', { className: 'p-2 border border-slate-200 text-center' },
                React.createElement('div', { className: 'w-10 h-10 bg-slate-50 rounded border border-slate-200 flex items-center justify-center overflow-hidden mx-auto shadow-sm' },
                  teacher.teacher_photo ? React.createElement('img', {
                    src: teacher.teacher_photo,
                    className: 'w-full h-full object-cover aspect-square rounded',
                    alt: 'teacher',
                    onError: (e: any) => {
                      e.target.style.display = 'none';
                      if(e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                    }
                  }) : null,
                  React.createElement('span', { 
                    className: 'text-slate-300 text-base',
                    style: { display: teacher.teacher_photo ? 'none' : 'block' }
                  }, '👤')
                )
              ),
              React.createElement('td', { className: 'p-2 border border-slate-200' },
                React.createElement('p', { className: 'font-bold text-slate-800' }, teacher.name),
                React.createElement('p', { className: 'text-[10px] text-blue-700 font-black tracking-wide font-mono mt-0.5' }, teacher.teacher_name_en || 'N/A')
              ),
              React.createElement('td', { className: 'p-2 border border-slate-200 font-bold text-slate-700' }, teacher.designation),
              React.createElement('td', { className: 'p-2 border border-slate-200 text-slate-500 line-height-relaxed' },
                React.createElement('p', null, '👨‍👦 পিতা: ' + (teacher.father_name || 'N/A')),
                React.createElement('p', null, '👩‍👦 মাতা: ' + (teacher.mother_name || 'N/A'))
              ),
              React.createElement('td', { className: 'p-2 border border-slate-200 text-slate-600 font-mono' },
                React.createElement('p', { className: 'bg-blue-50 text-blue-700 px-1 py-0.5 rounded text-[10px] inline-block mb-1 font-bold' }, 'Index: ' + (teacher.index_no || 'N/A')),
                React.createElement('p', null, 'NID: ' + (teacher.nid_no || 'N/A'))
              ),
              React.createElement('td', { className: 'p-2 border border-slate-200 text-slate-600' },
                React.createElement('p', { className: 'font-bold text-emerald-700 font-mono' }, teacher.phone),
                React.createElement('p', { className: 'text-[10px] text-slate-400 font-mono' }, teacher.email || 'N/A')
              ),
              React.createElement('td', { className: 'p-2 border border-slate-200 text-center flex flex-col gap-1 items-center justify-center min-h-[55px]' },
                React.createElement('button', {
                  type: 'button',
                  onClick: () => { setEditingTeacher({ ...teacher }); setLocalPhotoFile(null); },
                  className: 'w-full bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white px-2 py-0.5 rounded font-bold transition-all text-[10px] border border-amber-200 shadow-sm'
                }, '📝 এডিট'),
                React.createElement('button', {
                  type: 'button',
                  disabled: loading,
                  onClick: () => handleDeleteTeacher(teacher.id),
                  className: 'w-full bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white px-2 py-0.5 rounded font-bold transition-all text-[10px] border border-rose-200 shadow-sm'
                }, loading ? '...' : '🗑️ ডিলিট')
              )
            )
          ) : React.createElement('tr', null,
            React.createElement('td', { colSpan: 7, className: 'p-4 text-center text-slate-400 font-medium' }, 'কোনো শিক্ষক বা কর্মচারীর ডাটা পাওয়া যায়নি।')
          )
        )
      )
    ),
    editingTeacher ? React.createElement('div', { className: 'fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto' },
      React.createElement('div', { className: 'bg-white rounded-2xl shadow-2xl max-w-5xl w-full border border-slate-200 overflow-hidden' },
        React.createElement('div', { className: 'bg-slate-900 text-white p-4 flex justify-between items-center' },
          React.createElement('div', null,
            React.createElement('h2', { className: 'font-bold text-sm' }, '📝  শিক্ষকের তথ্য ও ছবি লাইভ আপডেট প্যানেল'),
            React.createElement('p', { className: 'text-[9px] text-slate-400 font-mono' }, 'ID: ' + editingTeacher.id)
          ),
          React.createElement('button', { type: 'button', onClick: () => setEditingTeacher(null), className: 'bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors' }, '❌ বন্ধ করুন')
        ),
        React.createElement('form', { onSubmit: handleUpdateTeacherSubmit, className: 'p-5 space-y-4 text-xs' },
          React.createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-4 gap-6 items-start' },
            React.createElement('div', { className: 'lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4' },
              React.createElement('div', null,
                React.createElement('label', { className: 'block font-bold text-slate-600 mb-1' }, 'শিক্ষকের নাম (বাংলা) *'),
React.createElement('input', { type: 'text', required: true, className: 'w-full p-2 border rounded-lg bg-white font-bold outline-none border-slate-300', value: editingTeacher.name || '', onChange: (e) => setEditingTeacher({ ...editingTeacher, name: e.target.value }) })
),
React.createElement('div', null,
React.createElement('label', { className: 'block font-bold text-slate-600 mb-1' }, 'Teacher Name (English)'),
React.createElement('input', { type: 'text', className: 'w-full p-2 border rounded-lg bg-white uppercase font-black text-blue-800 outline-none border-slate-300', value: editingTeacher.teacher_name_en || '', onChange: (e) => setEditingTeacher({ ...editingTeacher, teacher_name_en: e.target.value }) })
),
React.createElement('div', null,
React.createElement('label', { className: 'block font-bold text-slate-600 mb-1' }, 'পদবী (Designation) *'),
React.createElement('input', { type: 'text', required: true, className: 'w-full p-2 border rounded-lg bg-white font-bold outline-none border-slate-300', value: editingTeacher.designation || '', onChange: (e) => setEditingTeacher({ ...editingTeacher, designation: e.target.value }) })
),
React.createElement('div', null,
React.createElement('label', { className: 'block font-bold text-slate-600 mb-1' }, 'মোবাইল নম্বর '),
React.createElement('input', { type: 'text', required: true, className: 'w-full p-2 border rounded-lg bg-white font-bold text-emerald-700 outline-none border-slate-300', value: editingTeacher.phone || '', onChange: (e) => setEditingTeacher({ ...editingTeacher, phone: e.target.value }) })
),
React.createElement('div', null,
React.createElement('label', { className: 'block font-bold text-slate-600 mb-1' }, 'জাতীয় পরিচয় পত্র নং (NID)'),
React.createElement('input', { type: 'text', className: 'w-full p-2 border rounded-lg bg-white font-mono outline-none border-slate-300', value: editingTeacher.nid_no || '', onChange: (e) => setEditingTeacher({ ...editingTeacher, nid_no: e.target.value }) })
),
React.createElement('div', null,
React.createElement('label', { className: 'block font-bold text-slate-600 mb-1' }, 'ইনডেক্স নম্বর (Index No)'),
React.createElement('input', { type: 'text', className: 'w-full p-2 border rounded-lg bg-white font-mono outline-none border-slate-300', value: editingTeacher.index_no || '', onChange: (e) => setEditingTeacher({ ...editingTeacher, index_no: e.target.value }) })
),
React.createElement('div', null,
React.createElement('label', { className: 'block font-bold text-slate-600 mb-1' }, 'পিতার নাম'),
React.createElement('input', { type: 'text', className: 'w-full p-2 border rounded-lg bg-white outline-none border-slate-300', value: editingTeacher.father_name || '', onChange: (e) => setEditingTeacher({ ...editingTeacher, father_name: e.target.value }) })
),
React.createElement('div', null,
React.createElement('label', { className: 'block font-bold text-slate-600 mb-1' }, 'মাতার নাম'),
React.createElement('input', { type: 'text', className: 'w-full p-2 border rounded-lg bg-white outline-none border-slate-300', value: editingTeacher.mother_name || '', onChange: (e) => setEditingTeacher({ ...editingTeacher, mother_name: e.target.value }) })
),
React.createElement('div', null,
React.createElement('label', { className: 'block font-bold text-slate-600 mb-1' }, 'জন্ম তারিখ'),
React.createElement('input', { type: 'date', className: 'w-full p-2 border rounded-lg bg-white outline-none font-mono border-slate-300', value: editingTeacher.dob || '', onChange: (e) => setEditingTeacher({ ...editingTeacher, dob: e.target.value }) })
),
React.createElement('div', null,
React.createElement('label', { className: 'block font-bold text-slate-600 mb-1' }, 'প্রথম এমপিও তারিখ'),
React.createElement('input', { type: 'date', className: 'w-full p-2 border rounded-lg bg-white outline-none font-mono border-slate-300', value: editingTeacher.mpo_date || '', onChange: (e) => setEditingTeacher({ ...editingTeacher, mpo_date: e.target.value }) })
),
React.createElement('div', null,
React.createElement('label', { className: 'block font-bold text-slate-600 mb-1' }, 'ইমেইল এড্রেস'),
React.createElement('input', { type: 'email', className: 'w-full p-2 border rounded-lg bg-white outline-none font-mono border-slate-300', value: editingTeacher.email || '', onChange: (e) => setEditingTeacher({ ...editingTeacher, email: e.target.value }) })
),
React.createElement('div', null,
React.createElement('label', { className: 'block font-bold text-slate-600 mb-1' }, 'শিক্ষাগত যোগ্যতা'),
React.createElement('input', { type: 'text', className: 'w-full p-2 border rounded-lg bg-white outline-none border-slate-300', value: editingTeacher.qualification || '', onChange: (e) => setEditingTeacher({ ...editingTeacher, qualification: e.target.value }) })
),
React.createElement('div', { className: 'sm:col-span-2 md:col-span-3' },
React.createElement('label', { className: 'block font-bold text-slate-600 mb-1' }, 'স্থায়ী ও বর্তমান ঠিকানা'),
React.createElement('input', { type: 'text', className: 'w-full p-2 border rounded-lg bg-white font-medium outline-none border-slate-300', value: editingTeacher.address || '', onChange: (e) => setEditingTeacher({ ...editingTeacher, address: e.target.value }) })
)
),
React.createElement('div', { className: 'lg:col-span-1 bg-white p-4 border rounded-xl flex flex-col items-center justify-center text-center shadow-sm w-full' },
React.createElement('label', { className: 'block font-bold text-slate-700 mb-3 text-center' }, '📷  शिक्षকের ছবি'),
React.createElement('div', { className: 'w-[130px] h-[130px] rounded-lg border-2 border-dashed border-blue-300 bg-slate-50 flex items-center justify-center overflow-hidden mb-3 p-1 shadow-inner' },
localPhotoFile && localPhotoFile.length > 0 ? React.createElement('img', { src: URL.createObjectURL(localPhotoFile[0]), className: 'w-full h-full object-cover aspect-square rounded' }) :
editingTeacher.teacher_photo ? React.createElement('img', { src: editingTeacher.teacher_photo, className: 'w-full h-full object-cover aspect-square rounded' }) :
React.createElement('span', { className: 'text-slate-400 font-bold text-[10px]' }, 'কোনো ছবি নেই')
),
React.createElement('input', {
type: 'file',
accept: 'image/',
className: 'text-[9px] w-full bg-slate-50 p-1 border rounded cursor-pointer font-bold',
onChange: (e: any) => { if (e.target.files && e.target.files.length > 0) setLocalPhotoFile(e.target.files); }
}),
React.createElement('p', { className: 'text-[9px] text-slate-400 mt-1' }, 'নতুন ছবি সিলেক্ট করলে ওপরের বক্সে তাৎক্ষণিক প্রিভিউ হবে।')
)
),
React.createElement('button', {
type: 'submit',
disabled: loading,
className: 'w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors mt-4 text-xs shadow-md'
}, loading ? 'আপডেট হচ্ছে...' : 'शिक्षকের তথ্য ও ছবি লাইভ আপডেট করুন 💾')
)
)
) : null
);
}