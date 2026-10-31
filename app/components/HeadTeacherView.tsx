'use client';
import React from 'react';

interface HeadViewProps {
  liveHeadPhoto: string;
  liveHeadMessage: string;
}

export default function HeadTeacherView({ liveHeadPhoto, liveHeadMessage }: HeadViewProps) {
  return React.createElement('div', { className: 'bg-white p-6 rounded-lg shadow-sm border border-neutral-200 grid grid-cols-1 md:grid-cols-4 gap-6 items-start animate-fadeIn' },
    React.createElement('div', { className: 'md:col-span-1 text-center' },
      React.createElement('div', { className: 'w-28 h-36 bg-slate-100 rounded-xl border border-slate-200 mx-auto overflow-hidden shadow-sm flex items-center justify-center' },
        liveHeadPhoto ? 
          React.createElement('img', { src: liveHeadPhoto, className: 'w-full h-full object-cover', alt: 'Head Teacher' }) :
          React.createElement('span', { className: 'text-3xl text-slate-300' }, '👤')
      ),
      React.createElement('span', { className: 'text-[11px] font-bold text-slate-700 block mt-2 bg-slate-100 py-1 px-2 rounded-full border' }, 'প্রধান শিক্ষক / সুপার')
    ),
    React.createElement('div', { className: 'md:col-span-3 space-y-2' },
      React.createElement('h3', { className: 'text-base font-black text-green-700 border-b pb-1.5' }, 'প্রতিষ্ঠানের প্রধানের বাণী'),
      React.createElement('p', { className: 'text-neutral-600 text-xs italic leading-relaxed pt-1' }, 
        liveHeadMessage ? `"${liveHeadMessage}"` : '"প্রতিষ্ঠানের বাণী এখনো যুক্ত করা হয়নি। অ্যাডমিন প্যানেল থেকে বাণী সেট করুন।"'
      )
    )
  );
}
