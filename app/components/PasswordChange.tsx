'use client';
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function PasswordChange({ schoolId }: { schoolId: string }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passMessage, setPassMessage] = useState('');
  const [passLoading, setPassLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setPassMessage('❌ অনুগ্রহ করে বর্তমান এবং নতুন পাসওয়ার্ড দুটিই লিখুন।');
      return;
    }
    setPassLoading(true);
    setPassMessage('');

    try {
      const { data, error: fetchErr } = await supabase.from('schools').select('password').eq('id', schoolId).single();
      if (fetchErr || !data) {
        setPassMessage('❌ ডাটাবেজ ভেরিফিকেশন ব্যর্থ হয়েছে।');
        setPassLoading(false);
        return;
      }
      if (currentPassword.trim() !== data.password) {
        setPassMessage('❌ দুঃখিত, আপনার দেওয়া বর্তমান পাসওয়ার্ডটি সঠিক নয়!');
        setPassLoading(false);
        return;
      }
      const { error: updateErr } = await supabase.from('schools').update({ password: newPassword.trim() }).eq('id', schoolId);
      if (updateErr) {
        setPassMessage('❌ পাসওয়ার্ড পরিবর্তন ব্যর্থ: ' + updateErr.message);
      } else {
        setPassMessage('🎉 চমৎকার! আপনার অ্যাডমিন প্যানেলের পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে।');
        setCurrentPassword('');
        setNewPassword('');
      }
    } catch (err: any) {
      setPassMessage('❌ ত্রুটি: ' + err.message);
    } finally {
      setPassLoading(false);
    }
  };

  return React.createElement('div', { className: 'bg-white p-6 rounded-lg shadow-sm border border-neutral-200 bg-gradient-to-r from-slate-50 to-orange-50/20' },
    React.createElement('h2', { className: 'text-base font-bold text-slate-800 border-b pb-2 mb-4 flex items-center gap-1.5' }, '🔐 সিকিউরিটি সেটিংস (পাসওয়ার্ড পরিবর্তন করুন)'),
    React.createElement('form', { onSubmit: handleChangePassword, className: 'grid grid-cols-1 sm:grid-cols-3 gap-4 items-end' },
      React.createElement('div', null,
        React.createElement('label', { className: 'text-xs font-semibold text-slate-600 block mb-1' }, 'বর্তমান পাসওয়ার্ড (Old Pass)'),
        React.createElement('input', { type: 'password', className: 'w-full p-2 border rounded-lg text-xs bg-white font-mono', placeholder: '••••••••', value: currentPassword, onChange: (e) => setCurrentPassword(e.target.value) })
      ),
      React.createElement('div', null,
        React.createElement('label', { className: 'text-xs font-semibold text-slate-600 block mb-1' }, 'নতুন গোপন পাসওয়ার্ড (New Pass)'),
        React.createElement('input', { type: 'password', className: 'w-full p-2 border rounded-lg text-xs bg-white font-mono', placeholder: 'নতুন পাসওয়ার্ড লিখুন', value: newPassword, onChange: (e) => setNewPassword(e.target.value) })
      ),
      React.createElement('div', null,
        React.createElement('button', { type: 'submit', disabled: passLoading, className: 'w-full bg-slate-800 text-white py-2 rounded-lg text-xs font-bold hover:bg-slate-900 transition disabled:bg-slate-400' }, passLoading ? 'আপডেট হচ্ছে...' : 'পাসওয়ার্ড আপডেট করুন')
      )
    ),
    passMessage && React.createElement('p', { className: 'text-xs font-semibold mt-3 p-2 rounded bg-white border text-center ' + (passMessage.includes('🎉') ? 'text-green-700 bg-green-50 border-green-200' : 'text-red-700 bg-red-50 border-red-200') }, passMessage)
  );
}
