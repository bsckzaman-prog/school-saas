'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import SchoolWebsite from './SchoolWebsite';
import SuperAdmin from './components/SuperAdmin';

export default function MainPlatformPage() {
  const [schools, setSchools] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState<any | null>(null);
  
  const [showSuperAdmin, setShowSuperAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [masterEmail, setMasterEmail] = useState('');
  const [masterPassword, setMasterPassword] = useState('');
  const [masterError, setMasterError] = useState('');

  // 🌟 নতুন রেজিস্ট্রেশন ফরমের ভাসমান মডাল কন্ট্রোল স্টেট (আপনার রিকোয়েস্ট অনুযায়ী ফিক্সড)
  const [showRegModal, setShowRegModal] = useState(false);

  // রেজিস্ট্রেশনের ৭টি মাস্টার ফিল্ডের স্টেটসমূহ
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newSchoolNameEn, setNewSchoolNameEn] = useState('');
  const [newSchoolPhone, setNewSchoolPhone] = useState('');
  const [newSchoolEiin, setNewSchoolEiin] = useState('');
  const [newSchoolAddress, setNewSchoolAddress] = useState('');
  const [newSubdomain, setNewSubdomain] = useState('');
  const [newSchoolEmail, setNewSchoolEmail] = useState('');
  const [newSchoolPassword, setNewSchoolPassword] = useState('');
  
  const [regMessage, setRegMessage] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  const fetchSchools = async () => {
    try {
      const { data, error } = await supabase.from('schools').select('*').order('created_at', { ascending: false });
      if (!error && data) setSchools(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchSchools(); },);

  const handleRegisterSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchoolName || !newSchoolNameEn || !newSchoolPhone || !newSchoolEiin || !newSchoolAddress || !newSchoolEmail || !newSchoolPassword || !newSubdomain) {
      setRegMessage('❌ অনুগ্রহ করে ফরমের সব তথ্য সঠিকভাবে পূরণ করুন।');
      return;
    }
    setRegLoading(true);
    setRegMessage('');

    try {
      const finalSlug = newSubdomain.trim().toLowerCase().replace(/\s+/g, '-');
      const { error } = await supabase.from('schools').insert([{
        name: newSchoolName.trim(),
        school_name_en: newSchoolNameEn.trim().toUpperCase(),
        phone_no: newSchoolPhone.trim(),
        eiin_no: newSchoolEiin.trim(),
        address: newSchoolAddress.trim(),
        slug: finalSlug,
        subdomain_slug: finalSlug + '.advsoft.app',
        email: newSchoolEmail.trim(),
        password: newSchoolPassword.trim(),
        status: 'pending',
        head_message: 'প্রতিষ্ঠানের অফিশিয়াল ড্যাশবোর্ড থেকে প্রধান শিক্ষকের বাণী ও ছবি পরিবর্তন করুন।'
      }]);

      if (error) {
        setRegMessage('❌ রেজিস্ট্রেশন ব্যর্থ: ' + error.message);
      } else {
        setRegMessage('🎉 अभिनंदन! প্রতিষ্ঠানটি সফলভাবে নিবন্ধিত হয়েছে। মাস্টার প্যানেল থেকে অনুমোদন করুন।');
        setNewSchoolName(''); setNewSchoolNameEn(''); setNewSchoolPhone(''); setNewSchoolEiin(''); setNewSchoolAddress(''); setNewSubdomain(''); setNewSchoolEmail(''); setNewSchoolPassword('');
        fetchSchools();
        // ৩ সেকেন্ড পর মডালটি অটোমেটিক বন্ধ হবে সাকসেসের পর
        setTimeout(() => { setShowRegModal(false); setRegMessage(''); }, 3000);
      }
    } catch (err: any) { setRegMessage('❌ ত্রুটি: ' + err.message); }
    finally { setRegLoading(false); }
  };

  const handleMasterLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (masterEmail.trim() === 'advsoft@gmail.com' && masterPassword.trim() === 'master3579') {
      setShowSuperAdmin(true); setShowLoginModal(false); setMasterError('');
      setMasterEmail(''); setMasterPassword('');
    } else { setMasterError('❌ ভুল মাস্টার আইডি অথবা পাসওয়ার্ড!'); }
  };

  if (selectedSchool) {
    return React.createElement(SchoolWebsite, { schoolId: selectedSchool.id.toString(), schoolName: selectedSchool.name, onBack: () => { setSelectedSchool(null); fetchSchools(); } });
  }

  if (showSuperAdmin) {
    return React.createElement(SuperAdmin, { schools, fetchSchools, onClose: () => setShowSuperAdmin(false) });
  }

  return React.createElement('div', { className: 'min-h-screen bg-slate-100 font-sans text-slate-800' },
    // ল্যান্ডing টপ হেডার
    React.createElement('div', { className: 'bg-slate-900 text-white py-12 px-4 md:px-12 text-center border-b-4 border-blue-600 shadow relative select-none' },
      React.createElement('button', { onClick: () => { setShowLoginModal(true); setMasterError(''); }, className: 'absolute top-4 right-4 bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-bold border border-slate-700 shadow transition' }, '👑 MASTER PANEL'),
      React.createElement('h1', { className: 'text-3xl md:text-5xl font-black text-blue-500 tracking-tight' }, 'ADVSOFT SMART EDUSAAS'),
      React.createElement('p', { className: 'text-sm opacity-80 mt-2 font-medium max-w-xl mx-auto' }, 'এক ক্লিকেই তৈরি করুন আপনার স্কুল, college বা মাদ্রাসার জন্য সরকারি শিক্ষা বোর্ড স্ট্যান্ডার্ডের ডাইনামিক লাইভ পোর্টাল।')
    ),

    // মেইন ড্যাশবোর্ড বডি লেআউট (আল্ট্রা-ক্লিন ও কমার্শিয়াল ভিউ)
    React.createElement('main', { className: 'max-w-6xl mx-auto p-4 md:p-8 space-y-6 mt-4 font-sans' },
      
      // 🌟 আপনার রিকোয়েস্ট করা নতুন প্রিমিয়াম বাটন প্যানেল
      React.createElement('div', { className: 'flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-2xl border shadow-sm gap-4' },
        React.createElement('div', null,
          React.createElement('h2', { className: 'text-lg font-black text-slate-900' }, '🌐 নিবন্ধিত শিক্ষা প্রতিষ্ঠানের লাইভ তালিকা'),
          React.createElement('p', { className: 'text-xs text-slate-400 mt-0.5' }, 'আপনার এডু-SaaS প্ল্যাটফর্মে সচল ও অপেক্ষমাণ স্কুলগুলোর লাইভ ড্যাশবোর্ড স্ট্যাটাস।')
        ),
        React.createElement('button', { 
          onClick: () => { setShowRegModal(true); setRegMessage(''); },
          className: 'bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-5 py-3 rounded-xl shadow-md transition flex items-center gap-1.5 transform active:scale-95 animate-pulse'
        }, '🏢 নতুন প্রতিষ্ঠান নিবন্ধন করুন ➕')
      ),

      // লাইভ গ্রিড তালিকা সেকশন (সম্পূর্ণ ফুল-উইডথ ক্লিয়ার ভিউ)
      loading ? React.createElement('p', { className: 'text-xs text-slate-400 py-12 text-center font-medium' }, 'তালিকা লোড হচ্ছে...') :
      !schools || schools.length === 0 ? React.createElement('p', { className: 'text-xs text-slate-400 py-12 text-center font-medium bg-white rounded-2xl border border-dashed' }, 'বর্তমানে কোনো প্রতিষ্ঠান নিবন্ধিত নেই। উপরের বোতামে চাপ দিয়ে প্রথম অ্যাকাউন্টটি খুলুন।') :
      React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' },
        schools.map((school: any) => {
          const isPending = !school.status || school.status === 'pending';
          const isPaused = school.status === 'paused';

          return React.createElement('div', { key: school.id, className: 'p-5 border border-slate-100 rounded-2xl bg-white shadow-sm flex flex-col justify-between gap-4 hover:shadow-md transition relative' },
            React.createElement('div', { className: 'space-y-1 text-xs' },
              React.createElement('h4', { className: 'font-black text-slate-900 text-sm tracking-tight' }, school.name),
              React.createElement('p', { className: 'text-blue-600 font-mono font-bold text-[10px]' }, school.subdomain_slug || (school.slug + '.advsoft.app')),
              React.createElement('p', { className: 'text-slate-500 font-bold text-[10px] pt-0.5' }, '📞 ' + (school.phone_no || 'মোবাইল নাই')),

              React.createElement('div', { className: 'pt-1.5' },
                isPaused ? React.createElement('span', { className: 'text-[9px] font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full shadow-sm' }, '🛑 সাময়িক বন্ধ (Paused)') :
                isPending ? React.createElement('span', { className: 'text-[9px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full shadow-sm' }, '⏳ অপেক্ষমাণ অনুমোদন (Pending)') :
                React.createElement('span', { className: 'text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full shadow-sm' }, '🟢 সচল লাইভ (Active)')
              )
            ),
            React.createElement('button', {
              onClick: () => {
                if (isPending) return alert('⚠️ দুঃখিত! এই শিক্ষা প্রতিষ্ঠানের পোর্টালটি এখনও মেইন অ্যাডমিন দ্বারা অনুমোদিত (Approve) করা হয়নি।');
                if (isPaused) return alert('⚠️ দুঃখিত! এই শিক্ষা প্রতিষ্ঠানের সার্ভার পোর্টালটি সুপার-অ্যাডমিন দ্বারা সাময়িকভাবে স্থগিত (Paused) করা হয়েছে।');
                setSelectedSchool(school);
              },
              className: 'w-full bg-slate-900 text-white font-bold py-2 rounded-lg text-[11px] hover:bg-blue-600 shadow transition mt-1'
            }, isPaused ? '🔒 পোর্টাল ব্লকড' : isPending ? '⏳ অনুমোদনের অপেক্ষায়' : 'ওয়েবসাইট ভিজিট করুন ↗')
          );
        })
      )
    ),

    // 🌟 ব্র্যান্ড নিউ অটোমেটিক ভাসমান রেজিস্ট্রেশন মডাল পপ-আপ উইন্ডো (আপনার রিকোয়েস্ট ফিক্সড)
    showRegModal && React.createElement('div', { className: 'fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fadeIn' },
      React.createElement('div', { className: 'bg-white text-slate-800 p-6 rounded-2xl max-w-lg w-full shadow-2xl border flex flex-col max-h-[90vh] overflow-hidden animate-scaleUp' },
        React.createElement('div', { className: 'flex justify-between items-center border-b pb-3 flex-shrink-0' },
React.createElement('h3', { className: 'text-sm md:text-base font-black text-blue-600 tracking-tight flex items-center gap-1.5' }, '🏢 নতুন প্রতিষ্ঠান রেজিস্ট্রেশন উইন্ডো'),
React.createElement('button', { onClick: () => { setShowRegModal(false); setRegMessage(''); }, className: 'text-slate-400 hover:text-slate-900 text-base font-bold transition p-1' }, '✕')
),
// ফর্ম স্ক্রলিং এরিয়া
React.createElement('form', { onSubmit: handleRegisterSchool, className: 'space-y-3.5 text-xs py-4 overflow-y-auto flex-1 pr-1' },
React.createElement('div', null,
React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'প্রতিষ্ঠানের নাম (বাংলা)'),
React.createElement('input', { type: 'text', required: true, className: 'w-full p-2 border rounded-lg bg-slate-50 font-bold focus:bg-white outline-none focus:border-blue-500', placeholder: 'উদা: সাপখাওয়া উচ্চ বিদ্যালয়', value: newSchoolName, onChange: (e) => setNewSchoolName(e.target.value) })
),
React.createElement('div', null,
React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'Institution Name (English)'),
React.createElement('input', { type: 'text', required: true, className: 'w-full p-2 border rounded-lg bg-slate-50 uppercase font-sans font-black text-blue-800 focus:bg-white outline-none focus:border-blue-500', placeholder: 'Eg: SAPKHAWA HIGH SCHOOL', value: newSchoolNameEn, onChange: (e) => setNewSchoolNameEn(e.target.value) })
),
React.createElement('div', null,
React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'কাস্টম সাব-ডোমেন ইউআরএল (Subdomain)'),
React.createElement('div', { className: 'flex items-center bg-slate-50 border rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:bg-white' },
React.createElement('input', { type: 'text', required: true, className: 'w-full p-2 bg-transparent font-mono font-bold text-blue-600 outline-none', placeholder: 'sapkhawa', value: newSubdomain, onChange: (e) => setNewSubdomain(e.target.value) }),
React.createElement('span', { className: 'bg-slate-200 px-3 py-2 text-slate-500 font-mono font-bold border-l' }, '.advsoft.app')
)
),
React.createElement('div', null,
React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'যোগাযোগের মোবাইল নম্বর'),
React.createElement('input', { type: 'text', required: true, className: 'w-full p-2 border rounded-lg bg-slate-50 font-bold text-emerald-700 focus:bg-white outline-none focus:border-blue-500', placeholder: 'উদা: ০১৭xxxxxxxx', value: newSchoolPhone, onChange: (e) => setNewSchoolPhone(e.target.value) })
),
React.createElement('div', null,
React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'প্রতিষ্ঠানের EIIN নম্বর'),
React.createElement('input', { type: 'text', required: true, className: 'w-full p-2 border rounded-lg bg-slate-50 font-mono font-bold text-orange-600 focus:bg-white outline-none focus:border-blue-500', placeholder: 'উদা: ১২২৪৫০', value: newSchoolEiin, onChange: (e) => setNewSchoolEiin(e.target.value) })
),
React.createElement('div', null,
React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'প্রতিষ্ঠানের ঠিকানা (সংक्षिप्त)'),
React.createElement('input', { type: 'text', required: true, className: 'w-full p-2 border rounded-lg bg-slate-50 font-medium text-slate-700 focus:bg-white outline-none focus:border-blue-500', placeholder: 'উদা: উপজেলা: নাগেশ্বরী, জেলা: কুড়িগ্রাম', value: newSchoolAddress, onChange: (e) => setNewSchoolAddress(e.target.value) })
),
React.createElement('div', null,
React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'অফিশিয়াল ইমেইল এড্রেস'),
React.createElement('input', { type: 'email', required: true, className: 'w-full p-2 border rounded-lg bg-slate-50 font-mono focus:bg-white outline-none focus:border-blue-500', placeholder: 'school@email.com', value: newSchoolEmail, onChange: (e) => setNewSchoolEmail(e.target.value) })
),
React.createElement('div', null,
React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'গোপন পাসওয়ার্ড'),
React.createElement('input', { type: 'password', required: true, className: 'w-full p-2 border rounded-lg bg-slate-50 font-mono text-center focus:bg-white outline-none focus:border-blue-500', placeholder: '••••••••', value: newSchoolPassword, onChange: (e) => setNewSchoolPassword(e.target.value) })
),
React.createElement('button', { type: 'submit', disabled: regLoading, className: 'w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-2.5 rounded-xl transition shadow-md flex-shrink-0' }, regLoading ? 'পোর্টাল তৈরি হচ্ছে...' : 'নতুন লাইভ পোর্টাল তৈরি করুন 🚀')
),
regMessage && React.createElement('p', { className: 'text-[11px] font-bold mt-2 p-2 rounded border text-center text-blue-700 bg-blue-50 border-blue-100 flex-shrink-0' }, regMessage)
)
),
// মাস্টার সুপার-অ্যাডমিন সিকিউরিটি গেট মডাল
showLoginModal && React.createElement('div', { className: 'fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50' },
React.createElement('div', { className: 'bg-[#0f172a] border border-slate-800 text-slate-100 p-6 rounded-2xl max-w-md w-full shadow-2xl space-y-4 font-sans' },
React.createElement('div', { className: 'flex justify-between items-center border-b border-slate-800 pb-3' },
React.createElement('h3', { className: 'text-sm font-black text-blue-500 tracking-tight' }, '👑 SUPER-ADMIN SECURITY GATE'),
React.createElement('button', { onClick: () => setShowLoginModal(false), className: 'text-slate-400 hover:text-white text-sm' }, '✕')
),
React.createElement('form', { onSubmit: handleMasterLoginSubmit, className: 'space-y-3.5 text-xs' },
React.createElement('div', null,
React.createElement('label', { className: 'text-slate-400 font-bold block mb-1' }, 'মাস্টার অ্যাডমিন ইমেইল'),
React.createElement('input', { type: 'email', className: 'w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono outline-none focus:border-blue-500', placeholder: 'advsoft@gmail.com', value: masterEmail, onChange: (e) => setMasterEmail(e.target.value) })
),
React.createElement('div', null,
React.createElement('label', { className: 'text-slate-400 font-bold block mb-1' }, 'মাস্টার সিক্রেট পাসওয়ার্ড'),
React.createElement('input', { type: 'password', className: 'w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-center outline-none focus:border-blue-500', placeholder: '••••••••', value: masterPassword, onChange: (e) => setMasterPassword(e.target.value) })
),
React.createElement('button', { type: 'submit', className: 'w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg shadow-md transition' }, 'ড্যাশবোর্ড আনলক করুন 🔓')
),
masterError && React.createElement('p', { className: 'text-[11px] font-bold text-red-400 text-center pt-1' }, masterError)
)
),
React.createElement('footer', { className: 'bg-slate-900 text-slate-400 text-center py-6 border-t font-medium text-xs mt-12 select-none' },
'© ২০২৬ স্মার্ট এডু-SaaS ইঞ্জিন প্ল্যাটফর্ম পোর্টাল · সর্বস্বত্ব সংরক্ষিত: ADVSOFT Systems'
)
);
}