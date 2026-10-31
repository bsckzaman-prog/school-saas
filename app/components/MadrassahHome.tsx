'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface MadrassahHomeProps {
  schoolName: string;
  schoolNameEn: string;
  schoolAddress: string;
  eiinNo: string;
  logoUrl: string;
  liveHeadPhoto: string;
  liveHeadMessage: string;
  notices: any;
  teachers: any;
  onNavigate: (tab: 'home' | 'admission' | 'admin') => void;
}

export default function MadrassahHome({ schoolName, schoolNameEn, schoolAddress, eiinNo, logoUrl, liveHeadPhoto, liveHeadMessage, notices, teachers, onNavigate }: MadrassahHomeProps) {
  const [liveChairmanMessage, setLiveChairmanMessage] = useState('');
  const [liveChairmanPhoto, setLiveChairmanPhoto] = useState('');

    const fetchChairmanOnHome = async () => {
    try {
      const { data, error } = await supabase.from('schools').select('chairman_text, chairman_img').eq('name', schoolName).single();
      if (!error && data) {
        setLiveChairmanMessage(data.chairman_text || '');
        setLiveChairmanPhoto(data.chairman_img || '');
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchChairmanOnHome(); }, [schoolName]);

  return React.createElement('div', { className: 'w-full bg-slate-900/10 min-h-screen py-6 px-4 md:px-8 flex flex-col justify-start items-center select-none overflow-x-hidden' },
    React.createElement('div', { className: 'w-full max-w-6xl bg-stone-50 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-scaleUp' },
      
      // মাঝখানে থাকা বিসমিল্লাহির রাহমানির রাহিম বার
      React.createElement('div', { className: 'bg-green-950 text-white text-xs font-black py-3 px-6 flex justify-center items-center border-b border-green-900 relative w-full' },
        React.createElement('span', { className: 'tracking-wide font-black text-center text-slate-100 text-sm' }, 'বিসমিল্লাহির রাহমানির রাহিম')
      ),
      // লোগো থাকবে বাম পাশে, এবং লেখার পুরো ব্লকটি ব্যানারের খালি জায়গায় মাঝখানে এলাইন থাকবে
      React.createElement('header', { className: 'bg-gradient-to-r from-emerald-950 via-green-900 to-emerald-950 py-10 px-8 flex flex-col sm:flex-row items-center gap-6 shadow-md w-full border-b border-green-800' },
        
        React.createElement('div', { className: 'w-24 h-24 bg-white/10 rounded-full border-2 border-white/30 p-1 flex items-center justify-center overflow-hidden backdrop-blur-md shadow-lg flex-shrink-0' },
          logoUrl ? React.createElement('img', { src: logoUrl, className: 'w-full h-full object-contain rounded-full', alt: 'logo' }) : React.createElement('span', { className: 'text-5xl' }, '🕌')
        ),
        
        React.createElement('div', { className: 'flex-1 text-center flex flex-col items-center justify-center space-y-2 w-full pr-0 sm:pr-24' },
          React.createElement('h1', { className: 'text-2xl md:text-3xl font-black text-white tracking-wider uppercase block leading-tight drop-shadow-sm font-serif text-center' }, schoolNameEn || 'NAGESWARI GIRLS DAKHIL MADRASAH'),
          React.createElement('h2', { className: 'text-xl md:text-2xl font-black text-white tracking-wide block drop-shadow-sm text-center font-extrabold' }, schoolName || 'নাগেশ্বরী বালিকা দাখিল মাদ্রাসা'),
          
          React.createElement('div', { className: 'flex flex-wrap items-center justify-center gap-4 text-xs pt-0.5 w-full text-emerald-300 font-bold text-center' },
            React.createElement('span', { className: 'block font-bold text-slate-200' }, '📍 ' + (schoolAddress || 'গ্রাম: সাঞ্জুয়ার ভিটা, ডাকঘর: নাগেশ্বরী, উপজেলা: নাগেশ্বরী, জেলা: কুড়িগ্রাম')),
            React.createElement('span', { className: 'font-mono font-black tracking-widest bg-emerald-900/80 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/40 text-xs shadow-md inline-block' }, 'EIIN : ' + (eiinNo || '122450'))
          )
        )
      ),
      // 🌟 বাগ ফিক্সড: মেইন ফাইলে হাত না দিয়ে সরাসরি ভর্তি ট্যাব অ্যাক্টিভেট করার মেকানিজম
      React.createElement('nav', { className: 'bg-green-950 text-white shadow-md flex flex-wrap border-b-4 border-orange-500 w-full' },
        React.createElement('button', {
          onClick: () => onNavigate('home'),
          className: 'px-8 py-4 text-xs font-black transition tracking-wide bg-orange-500 text-white shadow-lg flex items-center justify-center gap-2 border-r border-green-900/40 cursor-pointer hover:bg-orange-600 font-extrabold'
        }, '🏠 প্রচ্ছদ হোম'),
        
        // 🌟 মেইন ফাইলে হাত না দিয়ে সরাসরি রি-ডাইরেক্ট কুয়েরি পুশ লজিক ফিক্স করা হলো
        React.createElement('button', {
          onClick: () => {
            // উইন্ডোর ইন্টারনাল ট্যাব ডাইনামিকালি চেঞ্জ করার একশন ইভেন্ট ট্রিগার
            if (typeof window !== 'undefined') {
              onNavigate('admission');
            }
          },
          className: 'px-8 py-4 text-xs font-black transition tracking-wide hover:bg-green-900 flex items-center justify-center gap-2 border-r border-green-900/40 text-slate-100 cursor-pointer font-extrabold'
        }, '📝 অনলাইন ভর্তি ফরম'),
        
        React.createElement('button', {
          onClick: () => onNavigate('admin'),
          className: 'px-8 py-4 text-xs font-black transition tracking-wide hover:bg-green-900 flex items-center justify-center gap-2 text-slate-100 cursor-pointer font-extrabold'
        }, '🎛️ অ্যাডমিন ড্যাশবোর্ড')
      ),

      React.createElement('main', { className: 'flex-1 w-full p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6' },
        React.createElement('div', { className: 'lg:col-span-2 space-y-6 w-full' },
          
          React.createElement('div', { className: 'bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-4 w-full' },
            React.createElement('h3', { className: 'text-xs font-black text-orange-600 border-b pb-2 flex items-center gap-1.5 uppercase tracking-wide font-bold' }, '📢  প্রতিষ্ঠানের সর্বশেষ অফিশিয়াল নোটিশ বোর্ড'),
            (!notices || notices.length === 0) ?
              React.createElement('div', { className: 'space-y-4 divide-y divide-slate-200 text-slate-900' },
                React.createElement('div', { className: 'pt-2 space-y-2' },
                  React.createElement('div', { className: 'flex justify-between items-center' }, React.createElement('h4', { className: 'text-sm font-extrabold text-slate-900' }, 'সবাইকে স্বাগতম'), React.createElement('span', { className: 'text-[10px] font-mono font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded shadow-xs' }, '২৯/১০/২০২৬')),
                  React.createElement('p', { className: 'text-xs font-bold text-slate-800 leading-relaxed' }, 'সবাইকে স্বাগতম')
                ),
                React.createElement('div', { className: 'pt-5 space-y-2' },
                  React.createElement('div', { className: 'flex justify-between items-center' }, React.createElement('h4', { className: 'text-sm font-extrabold text-orange-700' }, 'আগামী ১ নভেম্বর থেকে বার্ষিক পরীক্ষা শুরু হবে।'), React.createElement('span', { className: 'text-[10px] font-mono font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded shadow-xs' }, '২৪/১০/২০২৬')),
                  React.createElement('p', { className: 'text-xs font-bold text-slate-800 leading-relaxed' }, 'সকল শিক্ষার্থীদের অবগতির জন্য জানানো যাচ্ছে যে আগামী ১ নভেম্বর থেকে বার্ষিক পরীক্ষা শুরু হবে। পরীক্ষার প্রবেশপত্র অফিস থেকে সংগ্রহ করার জন্য বলা হলো।')
                )
              ) :
              React.createElement('div', { className: 'space-y-5 divide-y divide-slate-200 text-slate-900' },
                notices.map((n: any) => React.createElement('div', { key: n.id, className: 'pt-4 first:pt-0 space-y-2' },
                  React.createElement('div', { className: 'flex justify-between items-center gap-4' },
                    React.createElement('h4', { className: 'text-sm font-extrabold text-slate-900 hover:text-green-700 cursor-pointer transition' }, n.title),
                    React.createElement('span', { className: 'text-[10px] font-mono font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded' }, new Date(n.published_at).toLocaleDateString('bn-BD'))
                  ),
                  React.createElement('p', { className: 'text-xs font-bold text-slate-800 leading-relaxed' }, n.content)
                ))
              )
          ),
          // সম্মানিত শিক্ষক তালিকা গ্রিড
          React.createElement('div', { className: 'bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-4 w-full' },
            React.createElement('h3', { className: 'text-xs font-black text-green-800 border-b pb-2 uppercase tracking-wide font-bold' }, '📋 আমাদের সম্মানিত শিক্ষকমণ্ডলী ও স্টাফ ডাটাবেজ'),
            (!teachers || teachers.length === 0) ?
              React.createElement('p', { className: 'text-slate-400 text-center text-xs py-4 font-bold' }, 'সম্মানিত শিক্ষকদের তালিকা লোড হচ্ছে...') :
              React.createElement('div', { className: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full' },
                teachers.map((t: any) => React.createElement('div', { key: t.id, className: 'border border-slate-200 p-4 rounded-2xl bg-stone-50/50 text-center space-y-2 hover:shadow-md hover:border-green-300 transition duration-300' },
                  React.createElement('div', { className: 'w-16 h-16 bg-white rounded-full border-2 border-slate-200 overflow-hidden shadow-inner mx-auto' },
                    t.teacher_photo ? React.createElement('img', { src: t.teacher_photo, className: 'w-full h-full object-cover', alt: 'teacher' }) : React.createElement('span', { className: 'text-slate-300 text-2xl block mt-3' }, '👤')
                  ),
                  React.createElement('h4', { className: 'text-[11px] font-black text-slate-900 leading-tight block pt-1 font-bold' }, t.name),
                  React.createElement('p', { className: 'text-[9px] font-bold text-green-700 bg-green-50 rounded-full px-2 py-0.5 inline-block' }, t.designation),
                  React.createElement('p', { className: 'text-[9px] font-mono font-bold text-slate-400 block pt-0.5' }, t.phone)
                ))
              )
          )
        ),

        // ডান কর্নারে গোল ফ্রেমে সাজানো প্রধান শিক্ষক ও সভাপতির বাণী জোন
        React.createElement('div', { className: 'space-y-6 lg:col-span-1 w-full text-slate-900' },
          React.createElement('div', { className: 'bg-white p-5 rounded-2xl shadow-sm border border-blue-100 bg-gradient-to-b from-white to-blue-50/10 space-y-4 text-center w-full' },
            React.createElement('h3', { className: 'text-xs font-black text-blue-900 border-b pb-2 flex items-center justify-center gap-1.5 uppercase tracking-wide font-bold' }, '👨‍💼 প্রধান শিক্ষকের বাণী'),
            React.createElement('div', { className: 'w-20 h-24 bg-white rounded-2xl border border-blue-200 overflow-hidden shadow-md mx-auto transform hover:scale-105 transition duration-300' },
              liveHeadPhoto ? React.createElement('img', { src: liveHeadPhoto, className: 'w-full h-full object-cover', alt: 'head' }) : React.createElement('span', { className: 'text-slate-300 text-3xl block mt-6' }, '👤')
            ),
            React.createElement('div', { className: 'text-left bg-stone-50/60 p-3 rounded-xl border border-dashed leading-relaxed text-xs font-bold text-slate-800 max-h-40 overflow-y-auto' },
              liveHeadMessage ? liveHeadMessage : 'প্রতিষ্ঠানের সার্বিক উন্নয়ন ও ডিজিটাল বাংলাদেশ গড়ার লক্ষ্যে আমাদের এই আধুনিক online ক্লাউড পোর্টাল ড্যাশবোর্ড।'
            )
          ),

          React.createElement('div', { className: 'bg-white p-5 rounded-2xl shadow-sm border border-emerald-100 bg-gradient-to-b from-white to-emerald-50/10 space-y-4 text-center w-full' },
            React.createElement('h3', { className: 'text-xs font-black text-emerald-900 border-b pb-2 flex items-center justify-center gap-1.5 uppercase tracking-wide font-bold' }, '🤵  সভাপতির বাণী'),
            React.createElement('div', { className: 'w-20 h-24 bg-white rounded-2xl border border-emerald-200 overflow-hidden shadow-md mx-auto transform hover:scale-105 transition duration-300' },
              liveChairmanPhoto ? React.createElement('img', { src: liveChairmanPhoto, className: 'w-full h-full object-cover', alt: 'chairman' }) : React.createElement('div', { className: 'w-full h-full flex items-center justify-center text-3xl bg-emerald-50 text-emerald-300 font-black' }, '👤')
            ),
            React.createElement('div', { className: 'text-left bg-stone-50/60 p-3 rounded-xl border border-dashed leading-relaxed text-xs font-bold text-slate-800 max-h-40 overflow-y-auto' },
              liveChairmanMessage ? liveChairmanMessage : 'শিক্ষা প্রতিষ্ঠানের সুষ্ঠু পরিচালনা, স্বচ্ছতা ও মানসম্মত শিক্ষা নিশ্চিত করতে আমাদের এই কমার্শিয়াল ক্লাউড অটোমেশন সিস্টেম অগ্রণী ভূমিকা পালন করবে।'
            )
          )
        )
      ),
      // পপআপ উইন্ডো ফুটার
      React.createElement('footer', { className: 'bg-slate-900 text-slate-400 text-center py-4 px-4 text-[10px] font-mono border-t border-slate-800 w-full' },
        React.createElement('p', { className: 'font-bold' }, '© ' + new Date().getFullYear() + ' ' + schoolName + ' | All Rights Reserved.'),
        React.createElement('p', { className: 'text-slate-600 mt-0.5 font-sans font-bold' }, '⚡ Powered & Secured by ADVSOFT Smart SaaS Enterprise Educational Cloud')
      )
    )
  );
}
