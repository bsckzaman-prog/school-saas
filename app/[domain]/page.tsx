'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../lib/supabase';
import SchoolWebsite from '../SchoolWebsite';

export default function DynamicDomainPage() {
  const params = useParams();
  const domainSlug = params?.domain as string; // মিডলওয়্যার থেকে পাঠানো সাব-ডোমেন বা স্লাগ

  const [schoolData, setSchoolData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!domainSlug) return;

    const checkSchoolAndLoad = async () => {
      try {
        // ডাটাবেজে এই সাব-ডোমেনের (slug) কোনো স্কুল রেজিস্টার্ড আছে কিনা তা চেক করা
        const { data, error } = await supabase
          .from('schools')
          .select('*')
          .eq('slug', domainSlug)
          .single();

        if (error || !data) {
          setErrorMsg('❌ দুঃখিত, এই সাব-ডোমেনে কোনো স্কুলের ওয়েবসাইট তৈরি করা হয়নি!');
        } else {
          setSchoolData(data);
        }
      } catch (err) {
        console.error(err);
        setErrorMsg('❌ কারিগরি ত্রুটি ঘটেছে।');
      } finally {
        setLoading(false);
      }
    };

    checkSchoolAndLoad();
  }, [domainSlug]);

  if (loading) {
    return React.createElement('div', { className: 'min-h-screen flex items-center justify-center bg-slate-50 font-sans text-sm text-slate-500' }, 
      '⏳ প্রতিষ্ঠানের ডাইনামিক লাইভ ডাটা লোড হচ্ছে...'
    );
  }

  if (errorMsg) {
    return React.createElement('div', { className: 'min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans p-4 text-center' },
      React.createElement('div', { className: 'bg-white p-6 rounded-xl shadow-sm border max-w-sm w-full' },
        React.createElement('p', { className: 'text-sm font-semibold text-red-600' }, errorMsg),
        React.createElement('p', { className: 'text-xs text-slate-400 mt-2 leading-relaxed' }, 'আপনি যদি এই ডোমেনের মালিক হন, তবে মূল প্ল্যাটফর্মে গিয়ে এই স্লাগ দিয়ে রেজিস্ট্রেশন সম্পূর্ণ করুন।')
      )
    );
  }

  // স্কুল খুঁজে পাওয়া গেলে আমাদের সেই শক্তিশালী মেইন ওয়েবসাইট কম্পোনেন্টটি ওপেন হবে
  return React.createElement(SchoolWebsite, {
    schoolId: schoolData.id,
    schoolName: schoolData.name,
    onBack: () => window.location.href = 'http://localhost:3000'
  });
}
