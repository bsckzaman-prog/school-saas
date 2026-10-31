'use client';

import React from 'react';

interface PublicAdmissionFormProps {
  studentName: string; setStudentName: (v: string) => void;
  phoneNumber: string; setPhoneNumber: (v: string) => void;
  desiredClass: string; setDesiredClass: (v: string) => void;
  handlePublicAdmissionSubmit: (e: React.FormEvent) => void;
  formMessage: string;
  setCurrentTab: (v: any) => void;
}

export default function PublicAdmissionForm({
  studentName, setStudentName, phoneNumber, setPhoneNumber,
  desiredClass, setDesiredClass, handlePublicAdmissionSubmit,
  formMessage, setCurrentTab
}: PublicAdmissionFormProps) {
  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">📝 নতুন শিক্ষার্থী অনলাইন ভর্তি ফরম</h2>
        <button onClick={() => setCurrentTab('home')} className="bg-slate-900 text-white px-3 py-1 rounded-lg font-bold text-sm">🔙 হোমপেজে ফিরুন</button>
      </div>
      <form onSubmit={handlePublicAdmissionSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">কনফার্ম শিক্ষার্থীর নাম *</label>
          <input type="text" required className="w-full p-2 border rounded-lg bg-slate-50 font-bold outline-none" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">মোবাইল নম্বর *</label>
          <input type="text" required className="w-full p-2 border rounded-lg bg-slate-50 font-bold text-emerald-700 outline-none" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">কাঙ্ক্ষিত শ্রেণী *</label>
          <select className="w-full p-2 border rounded-lg bg-white font-bold text-blue-700 outline-none" value={desiredClass} onChange={(e) => setDesiredClass(e.target.value)}>
            {['৬ষ্ঠ','৭ম','৮ম','৯ম','১০ম'].map(c => <option key={c} value={c}>{c} শ্রেণী</option>)}
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors">আবেদন জমা দিন 🚀</button>
      </form>
      {formMessage && <p className="mt-4 p-2 bg-slate-100 rounded text-center font-bold text-sm text-slate-700">{formMessage}</p>}
    </div>
  );
}
