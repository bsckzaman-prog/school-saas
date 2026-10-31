'use client';

import React, { useState } from 'react';

interface TeacherEntryFormProps {
  tName: string; setTName: (v: string) => void;
  tNameEn: string; setTNameEn: (v: string) => void;
  tDesignation: string; setTDesignation: (v: string) => void;
  tPhone: string; setTPhone: (v: string) => void;
  tNid: string; setTNid: (v: string) => void;
  tIndex: string; setTIndex: (v: string) => void;
  tFather: string; setTFather: (v: string) => void;
  tMother: string; setTMother: (v: string) => void;
  tDob: string; setTDob: (v: string) => void;
  tMpoDate: string; setTMpoDate: (v: string) => void;
  tEmail: string; setTEmail: (v: string) => void;
  tQualification: string; setTQualification: (v: string) => void;
  tAddress: string; setTAddress: (v: string) => void;
  setTPhotoFile: (v: any) => void;
  handleTeacherSubmit: (e: React.FormEvent) => void;
  teacherMessage: string;
}

export default function TeacherEntryForm({
  tName, setTName, tNameEn, setTNameEn, tDesignation, setTDesignation, tPhone, setTPhone,
  tNid, setTNid, tIndex, setTIndex, tFather, setTFather, tMother, setTMother,
  tDob, setTDob, tMpoDate, setTMpoDate, tEmail, setTEmail, tQualification, setTQualification,
  tAddress, setTAddress, setTPhotoFile, handleTeacherSubmit, teacherMessage
}: TeacherEntryFormProps) {
  // রি-রেন্ডার ট্রিগার করার জন্য একটি লোকাল স্টেট
  const [previewTrigger, setPreviewTrigger] = useState(0);

  return (
    <form onSubmit={handleTeacherSubmit} className="space-y-4 p-5 bg-slate-50 rounded-2xl border text-xs text-slate-700">
      <h3 className="font-black text-sm text-blue-900 border-b pb-2 mb-2">➕ নতুন শিক্ষক ও কর্মচারী ডাটা এন্ট্রি ফরম</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* বামের ৩ কলামে সমস্ত ইনপুট ফিল্ড */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-600 mb-1">শিক্ষকের নাম (বাংলা) *</label>
            <input type="text" required className="w-full p-2 border rounded-lg bg-white font-bold outline-none" value={tName} onChange={(e) => setTName(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">Teacher Name (English)</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white uppercase font-black text-blue-800 outline-none" value={tNameEn} onChange={(e) => setTNameEn(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">পদবী (Designation) *</label>
            <input type="text" required className="w-full p-2 border rounded-lg bg-white font-bold outline-none" value={tDesignation} onChange={(e) => setTDesignation(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">মোবাইল নম্বর *</label>
            <input type="text" required className="w-full p-2 border rounded-lg bg-white font-bold text-emerald-700 outline-none" value={tPhone} onChange={(e) => setTPhone(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">জাতীয় পরিচয় পত্র নং (NID)</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white font-mono outline-none" value={tNid} onChange={(e) => setTNid(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">ইনডেক্স নম্বর (Index No)</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white font-mono outline-none" value={tIndex} onChange={(e) => setTIndex(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">পিতার নাম</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white outline-none" value={tFather} onChange={(e) => setTFather(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">মাতার নাম</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white outline-none" value={tMother} onChange={(e) => setTMother(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">জন্ম তারিখ</label>
            <input type="date" className="w-full p-2 border rounded-lg bg-white outline-none font-mono" value={tDob} onChange={(e) => setTDob(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">প্রথম এমপিও তারিখ</label>
            <input type="date" className="w-full p-2 border rounded-lg bg-white outline-none font-mono" value={tMpoDate} onChange={(e) => setTMpoDate(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">ইমেইল এড্রেস</label>
            <input type="email" className="w-full p-2 border rounded-lg bg-white outline-none font-mono" value={tEmail} onChange={(e) => setTEmail(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1"> can শিক্ষাগত যোগ্যতা</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white outline-none" value={tQualification} onChange={(e) => setTQualification(e.target.value)} />
          </div>
          <div className="sm:col-span-2 md:col-span-3">
            <label className="block font-bold text-slate-600 mb-1">স্থায়ী ও বর্তমান ঠিকানা</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white font-medium outline-none" value={tAddress} onChange={(e) => setTAddress(e.target.value)} />
          </div>
        </div>

        {/* ডানের ১ কলামে ছবি আপলোড ও নিখুঁত চারকোনা প্রিভিউ বক্স */}
        <div className="lg:col-span-1 bg-white p-4 border rounded-xl flex flex-col items-center justify-center text-center shadow-sm w-full">
          <label className="block font-bold text-slate-700 mb-3 text-center">📷 can শিক্ষকের ছবি *</label>
          
          <div className="w-[130px] h-[130px] rounded-lg border-2 border-dashed border-blue-300 bg-slate-50 flex items-center justify-center overflow-hidden mb-3 p-1 shadow-inner">
            {typeof window !== 'undefined' && document.getElementById('teacher_photo_input') && (document.getElementById('teacher_photo_input') as any)?.files?.length > 0 ? (
              <img 
                src={URL.createObjectURL((document.getElementById('teacher_photo_input') as any).files[0])} 
                alt="Preview" 
                className="w-full h-full object-cover aspect-square rounded"
              />
            ) : (
              <span className="text-slate-400 font-bold text-[10px]">কোনো ছবি নেই</span>
            )}
          </div>

          <input 
            id="teacher_photo_input"
            type="file" 
            accept="image/*" 
            className="text-[9px] w-full bg-slate-50 p-1 border rounded cursor-pointer font-bold" 
            onChange={(e: any) => {
              setTPhotoFile(e.target.files[0]);
              setPreviewTrigger(prev => prev + 1); // ইমেজ সিলেক্ট করলে লাইভ রেন্ডার হবে
            }} 
          />
        </div>

      </div>

      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors mt-4">
         can শিক্ষক প্রোফাইল সেভ করুন 💾
      </button>
      {teacherMessage && <p className="text-center font-bold text-emerald-600 mt-2">{teacherMessage}</p>}
    </form>
  );
}
