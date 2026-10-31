'use client';

import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface StudentManagerProps {
  applicants: any;
  fetchApplicants: () => Promise<void>;
  schoolName: string;
  schoolAddress: string;
  handleUpdateStudentSubmit: (studentId: string, updatedData: any, newPhotoFile: any) => Promise<void>;
}

export default function StudentManager({ applicants, fetchApplicants, schoolName, schoolAddress, handleUpdateStudentSubmit }: StudentManagerProps) {
  const [searchTerm, setSearchTarget] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('সব শ্রেণী');
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [editStudentName, setEditStudentName] = useState('');
  const [editStudentNameEn, setEditStudentNameEn] = useState('');
  const [editRoll, setEditRoll] = useState('');
  const [editClass, setEditClass] = useState('৬ষ্ঠ');
  const [editGroup, setEditGroup] = useState('ক');
  const [editPhone, setEditPhone] = useState('');
  const [editFatherName, setEditFatherName] = useState('');
  const [editFatherNameEn, setEditFatherNameEn] = useState('');
  const [editMotherName, setEditMotherName] = useState('');
  const [editMotherNameEn, setEditMotherNameEn] = useState('');
  const [editDob, setEditDob] = useState('');
  const [editGender, setEditGender] = useState('ছাত্রী');
  const [editReligion, setEditReligion] = useState('ইসলাম');
  const [editNid, setEditNid] = useState('');
  const [editDivision, setEditDivision] = useState('রংপুর');
  const [editDistrict, setEditDistrict] = useState('');
  const [editUpazila, setEditUpazila] = useState('');
  const [editPostOffice, setEditPostOffice] = useState('');
  const [editVillage, setEditVillage] = useState('');
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState('');
  const [editPhotoFile, setEditPhotoFile] = useState<any>(null);

  const filteredApplicants = (applicants || []).filter((app: any) => {
    const matchesSearch = app.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) || app.phone_number?.includes(searchTerm);
    const matchesClass = selectedClassFilter === 'সব শ্রেণী' || app.desired_class === selectedClassFilter;
    return matchesSearch && matchesClass;
  });

  const openEditModalWindow = (student: any) => {
    setSelectedStudentId(student.id);
    setEditStudentName(student.student_name || ''); setEditStudentNameEn(student.student_name_en || '');
    setEditRoll(student.birth_reg_no || ''); setEditClass(student.desired_class || '৬ষ্ঠ');
    setEditGroup(student.group_name || 'ক'); setEditPhone(student.phone_number || '');
    setEditFatherName(student.father_name || ''); setEditFatherNameEn(student.father_name_en || '');
    setEditMotherName(student.mother_name || ''); setEditMotherNameEn(student.mother_name_en || '');
    setEditDob(student.dob || ''); setEditGender(student.gender || 'ছাত্রী');
    setEditReligion(student.religion || 'ইসলাম'); setEditNid(student.nid_no || '');
    setEditDivision(student.division || 'রংপুর'); setEditDistrict(student.district || '');
    setEditUpazila(student.upazila || ''); setEditPostOffice(student.post_office || '');
    setEditVillage(student.village || ''); setCurrentPhotoUrl(student.student_photo || '');
    setEditPhotoFile(null); setIsEditModalOpen(true);
  };

  const handleOfficeStudentDelete = async (id: string) => {
    if (!window.confirm('⚠️ আপনি কি নিশ্চিত যে এই শিক্ষার্থীর রেকর্ড চিরতরে ডিলিট করবেন?')) return;
    try {
      const { error } = await supabase.from('admissions').delete().eq('id', id);
      if (error) alert('❌ ডিলিট ব্যর্থ: ' + error.message);
      else { alert('🗑️ রেকর্ড ডিলিট হয়েছে।'); fetchApplicants(); }
    } catch (err: any) { alert('❌ ত্রুটি: ' + err.message); }
  };

  const handlePrintAction = () => {
    const printContent = document.getElementById('printable-student-area');
    const originalContent = document.body.innerHTML;
    if (printContent) {
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  return React.createElement('div', { className: 'space-y-4 w-full text-neutral-800 font-sans' },
    React.createElement('div', { id: 'printable-student-area', className: 'space-y-4 w-full' },
      React.createElement('div', { className: 'bg-gradient-to-r from-green-900 to-emerald-950 p-6 rounded-2xl shadow-md text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-b-4 border-orange-500' },
        React.createElement('div', { className: 'text-center sm:text-left space-y-1' },
          React.createElement('h2', { className: 'text-base font-black tracking-wide text-orange-400 uppercase font-bold' }, schoolName),
          React.createElement('p', { className: 'text-[11px] text-slate-200 font-medium' }, '📍 ' + schoolAddress + ' | অনলাইন নিবন্ধিত শিক্ষার্থীদের মূল ডাটাবেজ রেজিস্টার মাস্টার শিট')
        ),
        React.createElement('button', { onClick: handlePrintAction, className: 'bg-orange-50 hover:bg-orange-600 text-white font-black px-5 py-2.5 rounded-xl text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer font-bold' }, '🖨️ কপি প্রিন্ট করুন')
      ),

      React.createElement('div', { className: 'flex flex-col sm:flex-row gap-3 items-center justify-between bg-stone-50 p-4 rounded-2xl border' },
        React.createElement('input', { type: 'text', className: 'w-full sm:max-w-xs p-2 border rounded-xl bg-white outline-none font-bold text-xs', placeholder: '🔍 নাম বা মোবাইল নম্বর দিয়ে খুঁজুন...', value: searchTerm, onChange: (e) => setSearchTarget(e.target.value) }),
        React.createElement('select', { className: 'w-full sm:w-40 p-2 border rounded-xl bg-white font-bold text-xs text-blue-700 outline-none', value: selectedClassFilter, onChange: (e) => setSelectedClassFilter(e.target.value) }, ['সব শ্রেণী', '৬ষ্ঠ', '৭ম', '৮ম', '৯ম', '১০ম'].map(cls => React.createElement('option', { key: cls, value: cls }, cls)))
      ),

      React.createElement('div', { className: 'overflow-x-auto border border-slate-200 rounded-2xl shadow-sm bg-white w-full' },
        React.createElement('table', { className: 'w-full text-left border-collapse text-[11px]' },
          React.createElement('thead', { className: 'bg-slate-900 text-slate-100 font-black' },
            React.createElement('tr', null,
              React.createElement('th', { className: 'p-3 text-center border-b border-slate-800 w-12' }, 'ছবি'),
              React.createElement('th', { className: 'p-3 border-b border-slate-800' }, 'Ref শিক্ষার্থীর নাম'),
              React.createElement('th', { className: 'p-3 text-center border-b border-slate-800 w-24' }, 'শ্রেণী ও রোল'),
              React.createElement('th', { className: 'p-3 border-b border-slate-800' }, 'অভিভাবক ও ফোন'),
              React.createElement('th', { className: 'p-3 text-center border-b border-slate-800 w-36' }, 'অ্যাকশন অপশন')
            )
          ),
          React.createElement('tbody', { className: 'divide-y font-medium text-slate-700' },
            filteredApplicants.length === 0 ?
              React.createElement('tr', null, React.createElement('td', { colSpan: 5, className: 'p-8 text-center text-slate-400 font-bold' }, 'কোনো শিক্ষার্থীর রেকর্ড ডাটাবেজে খুঁজে পাওয়া যায়নি!')) :
              filteredApplicants.map((student: any) => React.createElement('tr', { key: student.id, className: 'hover:bg-slate-50/80 transition' },
                React.createElement('td', { className: 'p-2 text-center' }, React.createElement('div', { className: 'w-10 h-10 rounded-full border bg-slate-100 mx-auto overflow-hidden shadow-inner flex items-center justify-center' }, student.student_photo ? React.createElement('img', { src: student.student_photo, className: 'w-full h-full object-cover', alt: 'student' }) : React.createElement('span', { className: 'text-lg text-slate-300' }, '👤') )),
                React.createElement('td', { className: 'p-3' }, React.createElement('span', { className: 'block font-black text-slate-900 text-xs font-bold' }, student.student_name), React.createElement('span', { className: 'block font-mono text-[9px] text-slate-400 uppercase tracking-tight' }, student.student_name_en)),
                React.createElement('td', { className: 'p-3 text-center' }, React.createElement('span', { className: 'bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full inline-block text-[10px] mb-0.5' }, student.desired_class + ' (' + (student.group_name || 'ক') + ')'), React.createElement('span', { className: 'block font-mono font-bold text-slate-500' }, 'ID/Roll: ' + (student.birth_reg_no || 'N/A'))),
                React.createElement('td', { className: 'p-3' }, React.createElement('span', { className: 'block text-slate-600 font-semibold' }, '👨‍👦 ' + (student.father_name || 'N/A')), React.createElement('span', { className: 'block font-mono text-emerald-700 font-bold text-[10px] pt-0.5' }, '📞 ' + student.phone_number)),
                React.createElement('td', { className: 'p-3 text-center space-x-1.5' },
                  React.createElement('button', { onClick: () => openEditModalWindow(student), className: 'bg-blue-600 hover:bg-blue-700 text-white font-black px-2.5 py-1.5 rounded-lg text-[10px] shadow-xs cursor-pointer transition font-bold' }, '📝 এডিট'),
                  React.createElement('button', { onClick: () => handleOfficeStudentDelete(student.id), className: 'bg-red-600 hover:bg-red-700 text-white font-black px-2.5 py-1.5 rounded-lg text-[10px] shadow-xs cursor-pointer transition font-bold' }, '🗑️ ডিলিট')
                )
              ))
          )
        )
      )
    ),

    isEditModalOpen && React.createElement('div', { className: 'fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn' },
React.createElement('div', { className: 'bg-white rounded-3xl shadow-2xl p-6 w-full max-w-2xl border text-xs space-y-4 relative flex flex-col max-h-[90vh]' },
React.createElement('div', { className: 'flex justify-between items-center border-b pb-2' },
React.createElement('h3', { className: 'text-sm font-black text-blue-900 font-bold' }, '📝  শিক্ষার্থীর তথ্য ও ছবি লাইভ আপডেট প্যানেল'),
React.createElement('button', { type: 'button', onClick: () => setIsEditModalOpen(false), className: 'bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-3 py-1 rounded-lg text-[10px] cursor-pointer' }, '❌  বন্ধ করুন')
),
React.createElement('form', {
onSubmit: async (e) => {
e.preventDefault(); if (!selectedStudentId) return;
const updatedPayload = {
student_name: editStudentName, student_name_en: editStudentNameEn, birth_reg_no: editRoll, desired_class: editClass,
group_name: editGroup, phone_number: editPhone, father_name: editFatherName, father_name_en: editFatherNameEn,
mother_name: editMotherName, mother_name_en: editMotherNameEn, dob: editDob, gender: editGender, religion: editReligion,
nid_no: editNid, division: editDivision, district: editDistrict, upazila: editUpazila, post_office: editPostOffice, village: editVillage, student_photo: currentPhotoUrl
};
const fileToSend = (editPhotoFile && editPhotoFile.length > 0) ? editPhotoFile[0] : null;
await handleUpdateStudentSubmit(selectedStudentId, updatedPayload, fileToSend);
setIsEditModalOpen(false);
},
className: 'flex-1 flex flex-col justify-between overflow-hidden space-y-4'
},
React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto p-1 text-xs' },
React.createElement('div', null, React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, '  **শিক্ষার্থীর নাম (বাংলা) ***'), React.createElement('input', { type: 'text', required: true, className: 'w-full p-2 border rounded-lg bg-slate-50 font-bold outline-none', value: editStudentName, onChange: (e) => setEditStudentName(e.target.value) })),
React.createElement('div', null, React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'Student Name (English)'), React.createElement('input', { type: 'text', className: 'w-full p-2 border rounded-lg bg-slate-50 uppercase font-black text-blue-800 outline-none', value: editStudentNameEn, onChange: (e) => setEditStudentNameEn(e.target.value) })),
React.createElement('div', null, React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'রোল / নিবন্ধন নম্বর *'), React.createElement('input', { type: 'text', required: true, className: 'w-full p-2 border rounded-lg bg-slate-50 font-mono font-bold text-center outline-none', value: editRoll, onChange: (e) => setEditRoll(e.target.value) })),
React.createElement('div', null, React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'শ্রেণী *'), React.createElement('select', { className: 'w-full p-2 border rounded-lg bg-white font-bold outline-none text-blue-700', value: editClass, onChange: (e) => setEditClass(e.target.value) }, ['৬ষ্ঠ','৭ম','৮ম','৯ম','১০ম'].map(c => React.createElement('option', { key: c, value: c }, c)))),
React.createElement('div', null, React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'শাখা / বিভাগ'), React.createElement('input', { type: 'text', className: 'w-full p-2 border rounded-lg bg-slate-50 outline-none font-bold', value: editGroup, onChange: (e) => setEditGroup(e.target.value) })),
React.createElement('div', null, React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'মোবাইল নম্বর '), React.createElement('input', { type: 'text', required: true, className: 'w-full p-2 border rounded-lg bg-slate-50 font-mono text-emerald-700 font-bold outline-none', value: editPhone, onChange: (e) => setEditPhone(e.target.value) })),
React.createElement('div', null, React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'পিতার নাম (বাংলা)'), React.createElement('input', { type: 'text', className: 'w-full p-2 border rounded-lg bg-slate-50 outline-none', value: editFatherName, onChange: (e) => setEditFatherName(e.target.value) })),
React.createElement('div', null, React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'Father Name (En)'), React.createElement('input', { type: 'text', className: 'w-full p-2 border rounded-lg bg-slate-50 uppercase outline-none', value: editFatherNameEn, onChange: (e) => setEditFatherNameEn(e.target.value) })),
React.createElement('div', null, React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'মাতার নাম (বাংলা)'), React.createElement('input', { type: 'text', className: 'w-full p-2 border rounded-lg bg-slate-50 outline-none', value: editMotherName, onChange: (e) => setEditMotherName(e.target.value) })),
React.createElement('div', null, React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'Mother Name (En)'), React.createElement('input', { type: 'text', className: 'w-full p-2 border rounded-lg bg-slate-50 uppercase outline-none', value: editMotherNameEn, onChange: (e) => setEditMotherNameEn(e.target.value) })),
React.createElement('div', null, React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'জন্ম তারিখ'), React.createElement('input', { type: 'date', className: 'w-full p-2 border rounded-lg bg-slate-50 outline-none font-mono', value: editDob, onChange: (e) => setEditDob(e.target.value) })),
React.createElement('div', null, React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'লিঙ্গ'), React.createElement('select', { className: 'w-full p-2 border rounded-lg bg-white font-bold outline-none', value: editGender, onChange: (e) => setEditGender(e.target.value) }, React.createElement('option', { value: 'ছাত্রী' }, 'ছাত্রী'), React.createElement('option', { value: 'ছাত্র' }, 'ছাত্র'))),
React.createElement('div', null, React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'ধর্ম'), React.createElement('input', { type: 'text', className: 'w-full p-2 border rounded-lg bg-slate-50 outline-none', value: editReligion, onChange: (e) => setEditReligion(e.target.value) })),
React.createElement('div', null, React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'জন্ম নিবন্ধন নম্বর'), React.createElement('input', { type: 'text', className: 'w-full p-2 border rounded-lg bg-slate-50 font-mono outline-none', value: editNid, onChange: (e) => setEditNid(e.target.value) })),
React.createElement('div', null, React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'বিভাগ (Division)'), React.createElement('input', { type: 'text', className: 'w-full p-2 border rounded-lg bg-slate-50 outline-none', value: editDivision, onChange: (e) => setEditDivision(e.target.value) })),
React.createElement('div', null, React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'जिला / উপজেলা'), React.createElement('input', { type: 'text', className: 'w-full p-2 border rounded-lg bg-slate-50 outline-none', value: editDistrict, onChange: (e) => setEditDistrict(e.target.value) })),
React.createElement('div', { className: 'sm:col-span-2' }, React.createElement('label', { className: 'font-bold text-slate-600 block mb-1' }, 'গ্রাম / ঠিকানা'), React.createElement('input', { type: 'text', className: 'w-full p-2 border rounded-lg bg-slate-50 font-medium outline-none', value: editVillage, onChange: (e) => setEditVillage(e.target.value) })),
React.createElement('div', { className: 'sm:col-span-2 md:col-span-3 flex flex-col items-center border p-3 bg-slate-50 rounded-xl' },
React.createElement('span', { className: 'font-bold text-slate-700 mb-2 block text-center text-[10px]' }, '📷  নতুন ছবি সিলেক্ট করুন (ঐচ্ছিক)'),
React.createElement('div', { className: 'w-16 h-16 bg-white border rounded-lg overflow-hidden shadow-inner mb-2 flex items-center justify-center' }, editPhotoFile && editPhotoFile.length > 0 ? React.createElement('img', { src: URL.createObjectURL(editPhotoFile[0]), className: 'w-full h-full object-cover', alt: 'preview' }) : currentPhotoUrl ? React.createElement('img', { src: currentPhotoUrl, className: 'w-full h-full object-cover', alt: 'current' }) : React.createElement('span', { className: 'text-slate-300 text-xl' }, '👤') ),
React.createElement('input', { type: 'file', accept: 'image/', className: 'text-[9px] w-full bg-white p-1 border rounded cursor-pointer font-bold', onChange: (e: any) => { if (e.target.files && e.target.files.length > 0) setEditPhotoFile(e.target.files); } })
)
),
React.createElement('button', {
type: 'submit',
className: 'w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-2.5 rounded-xl shadow-md transition text-center text-xs cursor-pointer font-bold mt-2'
}, '  শিক্ষার্থীর তথ্য ও ছবি লাইভ আপডেট করুন 💾')
)
)
)
);
}