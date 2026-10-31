'use client';
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface SuperAdminProps {
  schools: any;
  fetchSchools: () => void;
  onClose: () => void;
}

export default function SuperAdmin({ schools, fetchSchools, onClose }: SuperAdminProps) {
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // ১. প্রতিষ্ঠান লাইভ/অ্যাপ্রুভ করার ফাংশন
  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      const { error } = await supabase
        .from('schools')
        .update({ status: 'live' })
        .eq('id', id);

      if (error) alert('অ্যাপ্রুভ করতে সমস্যা: ' + error.message);
      else {
        alert('✓ প্রতিষ্ঠানটি সফলভাবে লাইভ করা হয়েছে!');
        fetchSchools();
      }
    } catch (err) { console.error(err); }
    finally { setActionLoading(null); }
  };

  // ২. প্রতিষ্ঠান সাময়িক বন্ধ/Pause করার ফাংশন
  const handlePause = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'paused' ? 'live' : 'paused';
    setActionLoading(id);
    try {
      const { error } = await supabase
        .from('schools')
        .update({ status: nextStatus })
        .eq('id', id);

      if (error) alert('স্ট্যাটাস পরিবর্তনে সমস্যা: ' + error.message);
      else {
        alert(nextStatus === 'paused' ? '⏸ প্রতিষ্ঠানটি সাময়িকভাবে স্থগিত করা হয়েছে।' : '▶ প্রতিষ্ঠানটি পুনরায় লাইভ করা হয়েছে।');
        fetchSchools();
      }
    } catch (err) { console.error(err); }
    finally { setActionLoading(null); }
  };

  // ৩. প্রতিষ্ঠান চিরতরে ডিলিট করার ফাংশন
  const handleDeleteSchool = async (id: string, name: string) => {
    if (!window.confirm(`⚠️ আপনি কি নিশ্চিত যে [${name}] প্রতিষ্ঠানটি চিরতরে ডিলিট করতে চান? এর সমস্ত ডাটা মুছে যাবে!`)) return;
    setActionLoading(id);
    try {
      const { error } = await supabase.from('schools').delete().eq('id', id);
      if (error) alert('ডিলিট ব্যর্থ: ' + error.message);
      else {
        alert('🗑️ প্রতিষ্ঠানটি সফলভাবে প্ল্যাটফর্ম থেকে মুছে ফেলা হয়েছে।');
        fetchSchools();
      }
    } catch (err) { console.error(err); }
    finally { setActionLoading(null); }
  };

  return React.createElement('div', { className: 'bg-[#0f172a] min-h-screen text-slate-100 p-4 md:p-6 font-sans select-none' },
    // ড্যাশবোর্ড রাজকীয় হেডার সেকশন
    React.createElement('div', { className: 'flex items-center justify-between border-b border-slate-800 pb-4 mb-6' },
      React.createElement('h1', { className: 'text-base md:text-lg font-black tracking-tight text-emerald-400 flex items-center gap-2' }, '📊 প্ল্যাটফর্ম মাস্টার কন্ট্রোল ড্যাশবোর্ড'),
      React.createElement('button', { onClick: onClose, className: 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-4 py-1.5 rounded-lg text-xs font-bold transition border border-slate-700' }, 'বন্ধ করুন ✕')
    ),

    // ডাটা টেবিল কন্টেইনার
    React.createElement('div', { className: 'bg-[#1e293b]/40 border border-slate-800/80 rounded-xl overflow-hidden shadow-2xl' },
      React.createElement('div', { className: 'overflow-x-auto' },
        React.createElement('table', { className: 'w-full text-left text-xs border-collapse' },
          React.createElement('thead', { className: 'text-slate-400 font-bold bg-[#1e293b]/80 border-b border-slate-800 uppercase tracking-wider text-[11px]' },
            React.createElement('tr', null,
              React.createElement('th', { className: 'p-4' }, 'প্রতিষ্ঠানের নাম'),
              React.createElement('th', { className: 'p-4' }, 'সাব-ডোমেন স্লাগ'),
              React.createElement('th', { className: 'p-4 text-center' }, 'স্ট্যাটাস'),
              React.createElement('th', { className: 'p-4 text-center' }, 'অ্যাকশন')
            )
          ),
          React.createElement('tbody', { className: 'divide-y divide-slate-800/60 font-medium' },
            schools?.map((school: any) => {
              const isPending = !school.status || school.status === 'pending';
              const isPaused = school.status === 'paused';
              
              // ডাইনামিক সাব-ডোমেন স্লাগ জেনারেটর (যদি ডাটাবেজে না থাকে)
              const slug = school.subdomain_slug || `${school.email.split('@')[0]}.advsoft`;

              return React.createElement('tr', { key: school.id, className: 'hover:bg-slate-800/20 transition text-[11px]' },
                // কলাম ১: নাম ও ডিটেইলস
                React.createElement('td', { className: 'p-4 space-y-1' },
                  React.createElement('div', { className: 'font-black text-white text-xs md:text-sm tracking-tight' }, school.name),
                  React.createElement('div', { className: 'text-slate-400 font-mono text-[10px] flex flex-wrap gap-x-3 gap-y-0.5 items-center' },
                    React.createElement('span', null, `🆔 ID: ${school.email}`),
                    React.createElement('span', { className: 'text-amber-500/80 font-sans' }, `🔑 Pass: ${school.password || 'admin1357'}`)
                  )
                ),
                
                // কলাম ২: সাব-ডোমেন স্লাগ
                React.createElement('td', { className: 'p-4 font-mono font-bold text-blue-400/90 tracking-wide text-xs' }, slug),
                
                // কলাম ৩: লাইভ স্ট্যাটাস ব্যাজ উইজেট
                React.createElement('td', { className: 'p-4 text-center' },
                  isPending ? React.createElement('span', { className: 'bg-amber-950/50 text-amber-400 border border-amber-900/60 px-3 py-1 rounded-full text-[10px] font-bold shadow-sm inline-block' }, '⏳ অপেক্ষমাণ') :
                  isPaused ? React.createElement('span', { className: 'bg-red-950/50 text-red-400 border border-red-900/60 px-3 py-1 rounded-full text-[10px] font-bold shadow-sm inline-block' }, '🛑 স্থগিত') :
                  React.createElement('span', { className: 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/60 px-3 py-1 rounded-full text-[10px] font-bold shadow-sm inline-block' }, '🟢 লাইভ')
                ),
                
                // কলাম ৪: কন্ট্রোল বাটন লেয়ার
                React.createElement('td', { className: 'p-4 flex gap-2 items-center justify-center' },
                  isPending ? 
                    React.createElement('button', { 
                      onClick: () => handleApprove(school.id),
                      disabled: actionLoading === school.id,
                      className: 'bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 py-1.5 rounded-lg transition shadow-sm border border-emerald-500'
                    }, '✓ Approve') :
                    React.createElement('button', { 
                      onClick: () => handlePause(school.id, school.status),
                      disabled: actionLoading === school.id,
                      className: isPaused ? 'bg-blue-600 hover:bg-blue-700 text-white font-black px-4 py-1.5 rounded-lg transition shadow-sm border border-blue-500' : 'bg-amber-600 hover:bg-amber-700 text-white font-black px-4 py-1.5 rounded-lg transition shadow-sm border border-amber-500'
                    }, isPaused ? '▶ Resume' : '⏸ Pause'),

                  React.createElement('button', { 
                    onClick: () => handleDeleteSchool(school.id, school.name),
                    disabled: actionLoading === school.id,
                    className: 'bg-red-950/40 text-red-400 border border-red-900/60 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-lg font-bold transition'
                  }, '🗑️ ডিলিট')
                )
              );
            })
          )
        )
      )
    )
  );
}
