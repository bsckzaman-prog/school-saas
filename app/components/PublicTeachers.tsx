'use client';
import React from 'react';

interface PublicTeachersProps {
  teachers: any;
  onClose: () => void;
}

export default function PublicTeachers({ teachers, onClose }: PublicTeachersProps) {
  return React.createElement('div', { className: 'fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 z-50 animate-fadeIn font-sans' },
    React.createElement('div', { className: 'bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-5xl w-full max-h-[85vh] flex flex-col overflow-hidden text-neutral-800' },
      // হেডার পার্ট
      React.createElement('div', { className: 'p-5 border-b-2 border-emerald-100 bg-slate-50 flex items-center justify-between' },
        React.createElement('h2', { className: 'text-sm md:text-base font-black text-emerald-800 flex items-center gap-2' }, '👨‍🏫 আমাদের সম্মানিত শিক্ষকমণ্ডলী ও স্টাফ ডিরেক্টরি'),
        React.createElement('button', { onClick: onClose, className: 'bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold px-4 py-1.5 rounded-lg transition shadow' }, '✕ বন্ধ করুন')
      ),

      // শিক্ষকের লিস্ট গ্রিড কন্টেন্ট এরিয়া
      React.createElement('div', { className: 'p-6 overflow-y-auto flex-1' },
        (!teachers || teachers.length === 0) ?
          React.createElement('p', { className: 'text-xs text-neutral-400 py-12 text-center border border-dashed rounded-xl font-medium' }, '⏳ বর্তমানে কোনো শিক্ষকের প্রোফাইল ডাটাবেজে যুক্ত করা নেই।') :
          React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6' },
            teachers.map((teacher: any) =>
              React.createElement('div', { key: teacher.id, className: 'bg-slate-50 border border-slate-200/60 p-5 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col items-center text-center relative overflow-hidden group' },
                React.createElement('div', { className: 'absolute top-0 inset-x-0 h-1.5 bg-emerald-700' }),
                // বৃত্তাকার ছবি ফ্রেম
                React.createElement('div', { className: 'w-16 h-16 bg-white rounded-full border-2 border-slate-100 overflow-hidden flex items-center justify-center shadow-inner mb-3 mt-2' },
                  teacher.teacher_photo ?
                    React.createElement('img', { src: teacher.teacher_photo, className: 'w-full h-full object-cover group-hover:scale-105 transition duration-300', alt: 'teacher' }) :
                    React.createElement('span', { className: 'text-3xl text-slate-300 select-none' }, '👤')
                ),
                React.createElement('div', { className: 'space-y-0.5 text-xs' },
                  React.createElement('h4', { className: 'text-xs font-black text-slate-900 tracking-tight' }, teacher.name),
                  React.createElement('p', { className: 'text-blue-600 font-bold text-[10px]' }, teacher.designation),
                  React.createElement('p', { className: 'text-slate-500 font-medium text-[10px] pt-1' }, '🎓 যোগ্যতা: ' + (teacher.qualification || 'N/A')),
                  React.createElement('div', { className: 'mt-2.5 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full px-3 py-0.5 text-[10px] font-black inline-block font-mono' }, '📞 ' + teacher.phone)
                )
              )
            )
          )
      )
    )
  );
}
