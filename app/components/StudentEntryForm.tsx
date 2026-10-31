'use client';

import React from 'react';
import * as XLSX from 'xlsx';


interface StudentEntryFormProps {
  officeSName: string; setOfficeSName: (v: string) => void;
  officeSNameEn: string; setOfficeSNameEn: (v: string) => void;
  officeRoll: string; setOfficeRoll: (v: string) => void;
  officeClass: string; setOfficeClass: (v: string) => void;
  officeGroup: string; setOfficeGroup: (v: string) => void;
  officePhone: string; setOfficePhone: (v: string) => void;
  officeFatherName: string; setOfficeFatherName: (v: string) => void;
  officeFatherNameEn: string; setOfficeFatherNameEn: (v: string) => void;
  officeMotherName: string; setOfficeMotherName: (v: string) => void;
  officeMotherNameEn: string; setOfficeMotherNameEn: (v: string) => void;
  officeDob: string; setOfficeDob: (v: string) => void;
  officeGender: string; setOfficeGender: (v: string) => void;
  officeReligion: string; setOfficeReligion: (v: string) => void;
  officeNid: string; setOfficeNid: (v: string) => void;
  officeDivision: string; setOfficeDivision: (v: string) => void;
  officeDistrict: string; setOfficeDistrict: (v: string) => void;
  officeUpazila: string; setOfficeUpazila: (v: string) => void;
  officePostOffice: string; setOfficePostOffice: (v: string) => void;
  officeVillage: string; setOfficeVillage: (v: string) => void;
  setOfficePhotoFile: (v: any) => void;
  handleOfficeStudentSubmit: (e: React.FormEvent) => void;
  officeStudentMessage: string;
  handleOfficeClassChange: (v: string) => void;
}

export default function StudentEntryForm({
  officeSName, setOfficeSName, officeSNameEn, setOfficeSNameEn, officeRoll, setOfficeRoll,
  officeClass, officeGroup, setOfficeGroup, officePhone, setOfficePhone,
  officeFatherName, setOfficeFatherName, officeFatherNameEn, setOfficeFatherNameEn,
  officeMotherName, setOfficeMotherName, officeMotherNameEn, setOfficeMotherNameEn,
  officeDob, setOfficeDob, officeGender, setOfficeGender, officeReligion, setOfficeReligion,
  officeNid, setOfficeNid, officeDivision, setOfficeDivision, officeDistrict, setOfficeDistrict,
  officeUpazila, setOfficeUpazila, officePostOffice, setOfficePostOffice, officeVillage, setOfficeVillage,
  setOfficePhotoFile, handleOfficeStudentSubmit, officeStudentMessage, handleOfficeClassChange
}: StudentEntryFormProps) {
  return (
    <form onSubmit={handleOfficeStudentSubmit} className="space-y-4 p-5 bg-slate-50 rounded-2xl border text-xs text-slate-700">
      <h3 className="font-bold text-slate-700 mb-2 border-b pb-2 text-sm">➕ নতুন শিক্ষার্থীর ডাটা ম্যানুয়ালি এন্ট্রি করুন</h3>
      
      {/* মেইন গ্রিড লেআউট: ডানে ছবি এবং বামে ফর্ম ফিল্ড */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* বামের ৩ কলামে সমস্ত ইনপুট ফিল্ড */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-600 mb-1">শিক্ষার্থীর নাম (বাংলা) *</label>
            <input type="text" required className="w-full p-2 border rounded-lg bg-white font-bold outline-none" placeholder="মাহিন" value={officeSName} onChange={(e) => setOfficeSName(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Student Name (English)</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white uppercase font-black text-blue-800 outline-none" placeholder="MAHI" value={officeSNameEn} onChange={(e) => setOfficeSNameEn(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">রোল / নিবন্ধন নম্বর *</label>
            <input type="text" required className="w-full p-2 border border-blue-300 rounded-lg text-center font-bold text-blue-700 outline-none" placeholder="13" value={officeRoll} onChange={(e) => setOfficeRoll(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">শ্রেণী *</label>
            <select className="w-full p-2 border rounded-lg bg-white font-bold outline-none text-blue-700" value={officeClass} onChange={(e) => handleOfficeClassChange(e.target.value)}>
              {['৬ষ্ঠ','৭ম','৮ম','৯ম','১০ম'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">শাখা / বিভাগ</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white font-bold outline-none" placeholder="ক" value={officeGroup} onChange={(e) => setOfficeGroup(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">মোবাইল নম্বর *</label>
            <input type="text" required className="w-full p-2 border rounded-lg bg-white font-bold text-emerald-700 outline-none" placeholder="017..." value={officePhone} onChange={(e) => setOfficePhone(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">পিতার নাম (বাংলা)</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white outline-none" value={officeFatherName} onChange={(e) => setOfficeFatherName(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">Father Name (En)</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white uppercase outline-none" value={officeFatherNameEn} onChange={(e) => setOfficeFatherNameEn(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">মাতার নাম (বাংলা)</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white outline-none" value={officeMotherName} onChange={(e) => setOfficeMotherName(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">Mother Name (En)</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white uppercase outline-none" value={officeMotherNameEn} onChange={(e) => setOfficeMotherNameEn(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">জন্ম তারিখ</label>
            <input type="date" className="w-full p-2 border rounded-lg bg-white outline-none font-mono" value={officeDob} onChange={(e) => setOfficeDob(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">লিঙ্গ</label>
            <select className="w-full p-2 border rounded-lg bg-white font-bold outline-none" value={officeGender} onChange={(e) => setOfficeGender(e.target.value)}>
              <option value="ছাত্রী">ছাত্রী</option>
              <option value="ছাত্র">ছাত্র</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">ধর্ম</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white outline-none" value={officeReligion} onChange={(e) => setOfficeReligion(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">জন্ম নিবন্ধন নম্বর</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white font-mono outline-none" value={officeNid} onChange={(e) => setOfficeNid(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">বিভাগ (Division)</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white outline-none" value={officeDivision} onChange={(e) => setOfficeDivision(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">জেলা</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white outline-none" value={officeDistrict} onChange={(e) => setOfficeDistrict(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">উপজেলা</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white outline-none" value={officeUpazila} onChange={(e) => setOfficeUpazila(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-slate-600 mb-1">পোস্ট অফিস</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white outline-none" value={officePostOffice} onChange={(e) => setOfficePostOffice(e.target.value)} />
          </div>
          <div className="sm:col-span-2 md:col-span-3">
            <label className="block font-bold text-slate-600 mb-1">গ্রাম / ঠিকানা</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-white font-medium outline-none" value={officeVillage} onChange={(e) => setOfficeVillage(e.target.value)} />
          </div>
        </div>

                {/* ডানের ১ কলামে ছবি আপলোড ও নিখুঁত প্রিভিউ বক্স */}
        <div className="lg:col-span-1 bg-white p-4 border rounded-xl flex flex-col items-center justify-center text-center shadow-sm w-full">
          <label className="block font-bold text-slate-700 mb-3 text-center">📷 শিক্ষার্থীর ছবি</label>
          
          <div className="w-[130px] h-[130px] rounded-lg border-2 border-dashed border-blue-300 bg-slate-50 flex items-center justify-center overflow-hidden mb-3 p-1 shadow-inner">
            {officeSName && typeof window !== 'undefined' && document.getElementById('student_photo_input') && (document.getElementById('student_photo_input') as any)?.files?.length > 0 ? (
              <img 
                src={URL.createObjectURL((document.getElementById('student_photo_input') as any).files[0])} 
                alt="Preview" 
                className="w-full h-full object-cover aspect-square rounded"
              />
            ) : (
              <span className="text-slate-400 font-bold text-[10px]">কোনো ছবি নেই</span>
            )}
          </div>

          <input 
            id="student_photo_input"
            type="file" 
            accept="image/*" 
            className="text-[9px] w-full bg-slate-50 p-1 border rounded cursor-pointer font-bold" 
            onChange={(e: any) => {
              setOfficePhotoFile(e.target.files);
              setOfficeSName(officeSName + ' '); setTimeout(() => setOfficeSName(officeSName.trim()), 10);
            }} 
          />
        </div>

      </div>

      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors mt-4">
        শিক্ষার্থী প্রোফাইল সেভ করুন 💾
      </button>
      {officeStudentMessage && <p className="text-center font-bold text-emerald-600 mt-2">{officeStudentMessage}</p>}
    </form>
  );
}
