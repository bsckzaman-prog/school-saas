'use client';

import React, { useState } from 'react';
import { supabase } from './lib/supabase';

interface SaasLandingPageProps {
  onViewSchool: (id: string, name: string) => void;
}

export default function SaasLandingPage({ onViewSchool }: SaasLandingPageProps) {
  const [schoolName, setSchoolName] = useState('');
  const [slug, setSlug] = useState('');
  const [searchSlug, setSearchSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [searchMessage, setSearchMessage] = useState('');

  const handleCreateSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolName || !slug) return setMessage('সবগুলো ঘর পূরণ করুন।');
    setLoading(true);
    setMessage('');

    const { error } = await supabase.from('schools').insert([{ name: schoolName, slug: slug.toLowerCase().trim() }]);
    setLoading(false);
    if (error) {
      setMessage(error.code === '23505' ? 'এই সাব-ডোমেনটি ইতিমধ্যে ব্যবহার করা হয়েছে!' : 'ত্রুটি: ' + error.message);
    } else {
      setMessage('🎉 সফলভাবে ওয়েবসাইট তৈরি হয়েছে!');
      setSchoolName('');
      setSlug('');
    }
  };

  const handleVisitSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchSlug) return setSearchMessage('সাব-ডোমেনটি লিখুন।');
    setSearchLoading(true);
    setSearchMessage('');

    const { data, error } = await supabase
      .from('schools')
      .select('id, name')
      .eq('slug', searchSlug.toLowerCase().trim())
      .single();

    setSearchLoading(false);
    if (error || !data) {
      setSearchMessage('🔍 কোনো স্কুল খুঁজে পাওয়া যায়নি!');
    } else {
      onViewSchool(data.id, data.name);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">SchoolPro SaaS</h1>
        <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">ডাটাবেজ কানেক্টেড 🟢</span>
      </header>
      
      <main className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">আপনার শিক্ষা প্রতিষ্ঠানের জন্য ডিজিটাল ওয়েবসাইট ও পোর্টাল</h2>
          <p className="text-lg text-slate-600">মাত্র ৫ মিনিটে আপনার স্কুল বা মাদ্রাসার জন্য প্রফেশনাল ওয়েবসাইট তৈরি করুন।</p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
            <h4 className="font-bold text-blue-900 mb-2">🔍 তৈরি করা স্কুল ওয়েবসাইট ভিজিট করুন</h4>
            <form onSubmit={handleVisitSchool} className="flex gap-2">
              <input type="text" placeholder="উদা: ngdm" className="p-3 border rounded-lg w-full text-sm outline-none bg-white" value={searchSlug} onChange={(e) => setSearchSlug(e.target.value)} />
              <button type="submit" disabled={searchLoading} className="bg-blue-600 text-white px-5 rounded-lg font-bold hover:bg-blue-700 transition text-sm disabled:bg-slate-400">
                {searchLoading ? 'খোঁজা হচ্ছে...' : 'ভিজিট'}
              </button>
            </form>
            {searchMessage && <p className="text-xs text-red-600 mt-2 font-medium">{searchMessage}</p>}
          </div>
        </div>
        
        <form onSubmit={handleCreateSchool} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-left">
          <h3 className="text-xl font-bold mb-4 text-center text-slate-800">নতুন স্কুল ফ্রি ট্রায়াল শুরু করুন</h3>
          <div className="mb-3">
            <input type="text" placeholder="স্কুলের নাম" className="w-full p-3 border rounded-lg text-sm bg-white" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
          </div>
          <div className="mb-4">
            <input type="text" placeholder="কাঙ্ক্ষিত সাব-ডোমেন (উদা: ngdm)" className="w-full p-3 border rounded-lg text-sm bg-white" value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white p-3 rounded-lg font-bold hover:bg-emerald-700 transition disabled:bg-slate-400">ওয়েবসাইট তৈরি করুন</button>
          {message && <p className="mt-4 p-3 rounded text-sm font-medium text-center bg-blue-50 text-blue-700">{message}</p>}
        </form>
      </main>
    </div>
  );
}
