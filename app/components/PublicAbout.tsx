'use client';
import React from 'react';

interface PublicAboutProps {
  schoolName: string;
  onClose: () => void;
}

export default function PublicAbout({ schoolName, onClose }: PublicAboutProps) {
  return React.createElement('div', { className: 'fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn font-sans text-neutral-800' },
    React.createElement('div', { className: 'bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full space-y-4' },
      React.createElement('div', { className: 'flex items-center justify-between border-b-2 border-emerald-100 pb-4 mb-2' },
        React.createElement('h2', { className: 'text-sm md:text-base font-black text-emerald-800 flex items-center gap-2' }, '🕌 প্রতিষ্ঠানের সংক্ষিপ্ত পরিচিতি ও ইতিহাস'),
        React.createElement('button', { onClick: onClose, className: 'bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold px-4 py-1.5 rounded-lg transition shadow' }, '✕ বন্ধ করুন')
      ),
      React.createElement('p', { className: 'text-slate-600 leading-relaxed text-xs md:text-sm font-medium pt-2' }, 
        schoolName + ' গণপ্রজাতন্ত্রী বাংলাদেশ সরকার ও শিক্ষা বোর্ড অনুমোদিত একটি ঐতিহ্যবাহী প্রাচীন ও স্বনামধন্য আদর্শ শিক্ষা প্রতিষ্ঠান। প্রতিষ্ঠার পর থেকেই এই প্রতিষ্ঠানটি অত্যন্ত সুনামের সাথে অत्र অঞ্চলের অবহেলিত ও অনগ্রসর জনগোষ্ঠীর মাঝে শিক্ষার আলো ছড়িয়ে দিয়ে আসছে।'
      ),
      React.createElement('p', { className: 'text-slate-600 leading-relaxed text-xs md:text-sm font-medium' }, 
        ' can আধুনিক বিজ্ঞান ও তথ্য-প্রযুক্তির সাথে ধর্মীয় ও নৈতিক শিক্ষার সমন্বয় ঘটিয়ে প্রতিটি শিক্ষার্থীকে সুযোগ্য, সৎ, দেশপ্রেমিক এবং আন্তর্জাতিক মানসম্পন্ন আদর্শ নাগরিক হিসেবে গড়ে তোলাই আমাদের মূল লক্ষ্য ও উদ্দেশ্য।'
      )
    )
  );
}
