'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

import PasswordChange from './components/PasswordChange';
import HeadTeacherControl from './components/HeadTeacherControl';
import StudentManager from './components/StudentManager';
import TeacherManager from './components/TeacherManager';
import MadrassahHome from './components/MadrassahHome';
import StudentEntryForm from './components/StudentEntryForm';
import PublicAdmissionForm from './components/PublicAdmissionForm';
import TeacherEntryForm from './components/TeacherEntryForm';

interface SchoolWebsiteProps {
  schoolId: string;
  schoolName: string;
  onBack: () => void;
}

export default function SchoolWebsite({ schoolId, schoolName, onBack }: SchoolWebsiteProps) {
  const [notices, setNotices] = useState<any>();
  const [loadingNotices, setLoadingNotices] = useState(true);
  const [currentTab, setCurrentTab] = useState<'home' | 'admission' | 'admin'>('home');
  const [schoolData, setSchoolData] = useState<any>(null);
  const [adminActiveSubMenu, setAdminActiveSubMenu] = useState<'profile' | 'password' | 'head_teacher' | 'notice' | 'teacher_entry' | 'teacher_list' | 'student_entry'>('profile');

  const [officeSName, setOfficeSName] = useState(''); const [officeSNameEn, setOfficeSNameEn] = useState('');
  const [officeRoll, setOfficeRoll] = useState(''); const [officeClass, setOfficeClass] = useState('৬ষ্ঠ');
  const [officeGroup, setOfficeGroup] = useState('ক'); const [officePhone, setOfficePhone] = useState('');
  const [officeFatherName, setOfficeFatherName] = useState(''); const [officeFatherNameEn, setOfficeFatherNameEn] = useState('');
  const [officeMotherName, setOfficeMotherName] = useState(''); const [officeMotherNameEn, setOfficeMotherNameEn] = useState('');
  const [officeDob, setOfficeDob] = useState(''); const [officeGender, setOfficeGender] = useState('ছাত্রী');
  const [officeReligion, setOfficeReligion] = useState('islam'); const [officeNid, setOfficeNid] = useState('');
  const [officeDivision, setOfficeDivision] = useState('রংপুর'); const [officeDistrict, setOfficeDistrict] = useState('');
  const [officeUpazila, setOfficeUpazila] = useState(''); const [officePostOffice, setOfficePostOffice] = useState('');
  const [officeVillage, setOfficeVillage] = useState('');
  const [officePhotoFile, setOfficePhotoFile] = useState<any>(null);
  const [officeStudentMessage, setOfficeStudentMessage] = useState('');

  const [tName, setTName] = useState(''); const [tNameEn, setTNameEn] = useState('');
  const [tDesignation, setTDesignation] = useState(''); const [tPhone, setTPhone] = useState('');
  const [tNid, setTNid] = useState(''); const [tIndex, setTIndex] = useState('');
  const [tFather, setTFather] = useState(''); const [tMother, setTMother] = useState('');
  const [tDob, setTDob] = useState(''); const [tMpoDate, setTMpoDate] = useState('');
  const [tEmail, setTEmail] = useState(''); const [tQualification, setTQualification] = useState('');
  const [tAddress, setTAddress] = useState(''); const [tPhotoFile, setTPhotoFile] = useState<any>(null);
  const [teacherMessage, setTeacherMessage] = useState('');

  const [studentName, setStudentName] = useState(''); const [phoneNumber, setPhoneNumber] = useState('');
  const [desiredClass, setDesiredClass] = useState('৬ষ্ঠ'); const [formMessage, setFormMessage] = useState('');

  const [emailInput, setEmailInput] = useState(''); const [passwordInput, setPasswordInput] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); const [loginError, setLoginError] = useState('');

  const [editSchoolName, setEditSchoolName] = useState(''); const [editSchoolNameEn, setEditSchoolNameEn] = useState('');
  const [editPhone, setEditSchoolPhone] = useState(''); const [editEiin, setEditSchoolEiin] = useState('');
  const [editAddress, setEditSchoolAddress] = useState(''); const [editSubdomain, setEditSubdomain] = useState('');
  const [editSchoolEmail, setEditSchoolEmail] = useState(''); const [logoFile, setLogoFile] = useState<any>(null);
  const [currentLogoUrl, setCurrentLogoUrl] = useState('');

  const [liveHeadMessage, setLiveHeadMessage] = useState(''); const [liveHeadPhoto, setLiveHeadPhoto] = useState('');
  const [infoFeedback, setInfoFeedback] = useState(''); const [infoLoading, setInfoLoading] = useState(false);

  const [teachers, setTeachers] = useState<any>(); const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [applicants, setApplicants] = useState<any>(); const [loadingApplicants, setLoadingApplicants] = useState(false);

  const [noticeTitle, setNoticeTitle] = useState(''); const [noticeContent, setNoticeContent] = useState('');
  const [noticeMessage, setNoticeMessage] = useState('');

  const handleOfficeClassChange = (v: string) => { setOfficeClass(v); if (['৬ষ্ঠ','৭ম','৮ম'].includes(v)) setOfficeGroup('ক'); else setOfficeGroup('বিজ্ঞান'); };
  const fetchSchoolDataCore = async () => { try { const { data, error } = await supabase.from('schools').select('*').eq('id', schoolId).single(); if (!error && data) { setSchoolData(data); setEditSchoolName(data.name || schoolName); setEditSchoolNameEn(data.school_name_en || ''); setEditSchoolPhone(data.phone_no || ''); setEditSchoolEiin(data.eiin_no || ''); setEditSchoolAddress(data.address || ''); setEditSubdomain(data.slug || ''); setEditSchoolEmail(data.email || ''); setCurrentLogoUrl(data.logo_url || ''); setLiveHeadMessage(data.head_message || ''); setLiveHeadPhoto(data.head_photo || ''); } } catch (err) { console.error(err); } };
  const fetchNotices = async () => { try { const { data, error } = await supabase.from('notices').select('*').eq('school_id', schoolId).order('published_at', { ascending: false }); if (!error && data) setNotices(data); } catch (err) { console.error(err); } finally { setLoadingNotices(false); } };
  const fetchTeachers = async () => { setLoadingTeachers(true); try { const { data, error } = await supabase.from('teachers').select('*').eq('school_id', schoolId).order('created_at', { ascending: true }); if (!error && data) setTeachers(data); } catch (err) { console.error(err); } finally { setLoadingTeachers(false); } };
  const fetchApplicantsList = async () => { setLoadingApplicants(true); try { const { data, error } = await supabase.from('admissions').select('*').eq('school_id', schoolId).order('applied_at', { ascending: false }); if (!error && data) setApplicants(data); } catch (err) { console.error(err); } finally { setLoadingApplicants(false); } };

  useEffect(() => { fetchSchoolDataCore(); fetchNotices(); fetchTeachers(); fetchApplicantsList(); }, [schoolId]);

  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoginError('');
    try {
      const { data, error } = await supabase.from('schools').select('*').eq('id', schoolId).single();
      const isDatabaseMatch = !error && data && emailInput.trim() === data.email && passwordInput.trim() === data.password;
      const isMasterMatch = emailInput.trim() === 'admin@gmail.com' && passwordInput.trim() === 'admin123';
      if (isDatabaseMatch || isMasterMatch) { setIsAdminLoggedIn(true); } 
      else { setLoginError('❌ ভুল ইমেইল বা পাসওয়ার্ড!'); }
    } catch (err) { setLoginError('❌ লগইন ব্যর্থ!'); }
  };

  const handleUpdateSchoolCoreInfo = async (e: React.FormEvent) => { e.preventDefault(); setInfoLoading(true); try { let finalLogoUrl = currentLogoUrl; if (logoFile && logoFile.length > 0) { const filePath = schoolId + '/logo-' + Date.now(); const { error: uploadError } = await supabase.storage.from('student-images').upload(filePath, logoFile); if (!uploadError) { const { data: { publicUrl } } = supabase.storage.from('student-images').getPublicUrl(filePath); finalLogoUrl = publicUrl; } } const { error } = await supabase.from('schools').update({ name: editSchoolName.trim(), school_name_en: editSchoolNameEn.trim().toUpperCase(), phone_no: editPhone.trim(), eiin_no: editEiin.trim(), address: editAddress.trim(), slug: editSubdomain.trim(), email: editSchoolEmail.trim(), logo_url: finalLogoUrl }).eq('id', schoolId); if (!error) { setInfoFeedback('🎉 প্রোফাইল হালনাগাদ সফল!'); fetchSchoolDataCore(); } } catch (err: any) { setInfoFeedback(err.message); } finally { setInfoLoading(false); } };
  const handleNoticeSubmit = async (e: React.FormEvent) => { e.preventDefault(); if (!noticeTitle || !noticeContent) return; try { const { error } = await supabase.from('notices').insert([{ school_id: schoolId, title: noticeTitle, content: noticeContent, published_at: new Date().toISOString() }]); if (!error) { setNoticeMessage('🎉 নোটিশ সফলভাবে প্রকাশ হয়েছে।'); setNoticeTitle(''); setNoticeContent(''); fetchNotices(); } } catch (err) { console.error(err); } };

  const handleTeacherSubmit = async (e: React.FormEvent) => { e.preventDefault(); if (!tName || !tDesignation || !tPhone) return alert('আবশ্যিক ঘরগুলো পূরণ করুন!'); try { let tPhotoUrl = ''; if (tPhotoFile && tPhotoFile.length > 0) { const filePath = schoolId + '/teacher-' + Date.now(); const { error: uploadError } = await supabase.storage.from('student-images').upload(filePath, tPhotoFile); if (!uploadError) { const { data } = supabase.storage.from('student-images').getPublicUrl(filePath);
tPhotoUrl = data.publicUrl; } } const formattedDob = tDob && tDob.trim() !== '' ? tDob : null; const formattedMpoDate = tMpoDate && tMpoDate.trim() !== '' ? tMpoDate : null; const { error } = await supabase.from('teachers').insert([{ school_id: schoolId, name: tName.trim(), teacher_name_en: tNameEn.trim().toUpperCase(), designation: tDesignation.trim(), phone: tPhone.trim(), nid_no: tNid.trim(), index_no: tIndex.trim(), father_name: tFather.trim(), mother_name: tMother.trim(), dob: formattedDob, mpo_date: formattedMpoDate, email: tEmail.trim(), qualification: tQualification.trim(), address: tAddress.trim(), teacher_photo: tPhotoUrl }]); if (!error) { setTeacherMessage('🎉 শিক্ষক সফলভাবে যুক্ত হয়েছেন।'); setTName(''); setTNameEn(''); setTDesignation(''); setTPhone(''); setTNid(''); setTIndex(''); setTFather(''); setTMother(''); setTDob(''); setTMpoDate(''); setTEmail(''); setTQualification(''); setTAddress(''); fetchTeachers(); } else { setTeacherMessage('❌ এন্ট্রি ব্যর্থ: ' + error.message); } } catch (err: any) { setTeacherMessage(err.message); } };
  const handleOfficeStudentSubmit = async (e: React.FormEvent) => { e.preventDefault(); if (!officeSName || !officeClass || !officePhone || !officeRoll) return alert('আবশ্যিক ফিল্ড দিন!'); try { let sPhotoUrl = ''; if (officePhotoFile && officePhotoFile.length > 0) { const filePath = schoolId + '/student-' + Date.now(); const { error: uploadError } = await supabase.storage.from('student-images').upload(filePath, officePhotoFile); if (!uploadError) { const { data: { publicUrl } } = supabase.storage.from('student-images').getPublicUrl(filePath); sPhotoUrl = publicUrl; } } const formattedDob = officeDob && officeDob.trim() !== '' ? officeDob : null; const { error } = await supabase.from('admissions').insert([{ school_id: schoolId, student_name: officeSName.trim(), student_name_en: officeSNameEn.trim(), birth_reg_no: officeRoll.trim(), phone_number: officePhone.trim(), desired_class: officeClass, group_name: officeGroup, father_name: officeFatherName.trim(), father_name_en: officeFatherNameEn.trim(), mother_name: officeMotherName.trim(), mother_name_en: officeMotherNameEn.trim(), dob: formattedDob, gender: officeGender, religion: officeReligion.trim(), birth_reg_no: officeNid.trim(), division: officeDivision.trim(), district: officeDistrict.trim(), upazila: officeUpazila.trim(), post_office: officePostOffice.trim(), village: officeVillage.trim(), student_photo: sPhotoUrl }]); if (!error) { setOfficeStudentMessage('🎉 শিক্ষার্থীর ডাটা সফলভাবে এন্ট্রি করা হয়েছে।'); setOfficeSName(''); setOfficeSNameEn(''); setOfficeRoll(''); setOfficePhone(''); setOfficeFatherName(''); setOfficeFatherNameEn(''); setOfficeMotherName(''); setOfficeMotherNameEn(''); setOfficeDob(''); setOfficeNid(''); setOfficeDistrict(''); setOfficeUpazila(''); setOfficePostOffice(''); setOfficeVillage(''); fetchApplicantsList(); } else { setOfficeStudentMessage('❌ এন্ট্রি ব্যর্থ: ' + error.message); } } catch (err: any) { setOfficeStudentMessage(err.message); } };
  const handleUpdateStudentSubmit = async (studentId: string, updatedData: any, newPhotoFile: any) => { try { let finalStudentPhotoUrl = updatedData.student_photo || ''; if (newPhotoFile) { const filePath = schoolId + '/student-update-' + Date.now(); const { error: uploadError } = await supabase.storage.from('student-images').upload(filePath, newPhotoFile); if (!uploadError) { const { data: { publicUrl } } = supabase.storage.from('student-images').getPublicUrl(filePath); finalStudentPhotoUrl = publicUrl; } } const formattedDob = updatedData.dob && updatedData.dob.trim() !== '' ? updatedData.dob : null; const { error } = await supabase.from('admissions').update({ student_name: updatedData.student_name, student_name_en: updatedData.student_name_en, birth_reg_no: updatedData.birth_reg_no, desired_class: updatedData.desired_class, group_name: updatedData.group_name, phone_number: updatedData.phone_number, father_name: updatedData.father_name, father_name_en: updatedData.father_name_en, mother_name: updatedData.mother_name, mother_name_en: updatedData.mother_name_en, dob: formattedDob, gender: updatedData.gender, religion: updatedData.religion, division: updatedData.division, district: updatedData.district, upazila: updatedData.upazila, post_office: updatedData.post_office, village: updatedData.village, student_photo: finalStudentPhotoUrl }).eq('id', studentId); if (error) alert('❌ ডাটা আপডেট ব্যর্থ: ' + error.message); else { alert('🎉 শিক্ষার্থীর সম্পূর্ণ প্রোফাইল সফলভাবে লাইভ আপডেট হয়েছে!'); fetchApplicantsList(); } } catch (err: any) { alert(err.message); } };
  const handlePublicAdmissionSubmit = async (e: React.FormEvent) => { e.preventDefault(); if (!studentName || !phoneNumber || !desiredClass) return; setFormMessage('প্রсеসিং...'); try { const { error } = await supabase.from('admissions').insert([{ school_id: schoolId, student_name: studentName.trim(), phone_number: phoneNumber.trim(), desired_class: desiredClass }]); if (!error) { setFormMessage('🎉 আবেদন সফলভাবে জমা পড়েছে।'); setStudentName(''); setPhoneNumber(''); } } catch (err: any) { setFormMessage(err.message); } };
  if (currentTab === 'home') return <MadrassahHome schoolName={schoolData?.name || schoolName} schoolNameEn={editSchoolNameEn || 'EDUCATIONAL INSTITUTION'} schoolAddress={editAddress || 'কুড়িগ্রাম'} eiinNo={editEiin || '১২২৪৫০'} logoUrl={currentLogoUrl} liveHeadPhoto={liveHeadPhoto} liveHeadMessage={liveHeadMessage} notices={notices} teachers={teachers} onNavigate={(tab: any) => setCurrentTab(tab)} />;
  if (currentTab === 'admission') return <PublicAdmissionForm studentName={studentName} setStudentName={setStudentName} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} desiredClass={desiredClass} setDesiredClass={setDesiredClass} handlePublicAdmissionSubmit={handlePublicAdmissionSubmit} formMessage={formMessage} setCurrentTab={setCurrentTab} />;

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold">{schoolData?.name || schoolName}</h1>
            <p className="text-[10px] text-slate-400 font-mono">🔥 Administrative Cloud SaaS ControlCenter v2.6</p>
          </div>
          <button onClick={() => { setCurrentTab('home'); setIsAdminLoggedIn(false); }} className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-[10px] font-black shadow border border-slate-700">🔙 মূল পোর্টালে ফিরুন</button>
        </div>

        {!isAdminLoggedIn ? (
          <div className="max-w-md mx-auto my-12 p-6 bg-slate-50 rounded-xl border shadow-sm">
            <h3 className="text-center font-bold text-slate-700 mb-4">🔐 অফিশিয়াল অ্যাডমিন লগইন গেট</h3>
            <form onSubmit={handleAdminLoginSubmit} className="space-y-3">
              <input type="email" required className="w-full p-2.5 border rounded-lg bg-white text-center font-mono outline-none" placeholder="school@email.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
              <input type="password" required className="w-full p-2.5 border rounded-lg bg-white text-center tracking-widest font-mono outline-none" placeholder="••••••••" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
              <button type="submit" className="w-full bg-slate-900 text-white p-2.5 rounded-lg font-bold">🔓 ড্যাশবোর্ড আনলক করুন</button>
            </form>
            {loginError && <p className="mt-3 text-red-600 font-bold text-center text-sm">{loginError}</p>}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 min-h-[600px]">
            <div className="bg-slate-50 p-4 border-r border-slate-200 flex flex-col justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">🎛️ CONTROL CENTER</p>
                {[
                  { id: 'profile', label: '⚙️ Profile Master Update' },
                  { id: 'password', label: '🔑 গোপন পাসওয়ার্ড পরিবর্তন' },
                  { id: 'head_teacher', label: '👨‍💼 প্রধান শিক্ষকের বাণী ও ছবি' },
                  { id: 'notice', label: '📢 নতুন নোটিশ বোর্ড কন্ট্রোল' },
                  { id: 'teacher_entry', label: '➕ শিক্ষক ও কর্মচারীর এন্ট্রি' },
                  { id: 'teacher_list', label: '📋 শিক্ষক ও কর্মচারীর তালিকা' },
                  { id: 'student_entry', label: '📝 স্টুডেন্ট ডাটা এন্ট্রি ও এডিট প্যানেল' }
                ].map((item) => {
                  const isActive = adminActiveSubMenu === item.id;
                  return (
                    <button key={item.id} onClick={() => setAdminActiveSubMenu(item.id as any)} className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center text-xs transition-all ${isActive ? 'bg-blue-600 text-white shadow-md' : 'text-slate-700 hover:bg-slate-200'}`}>
                      {item.label}
                    </button>
                  );
                })}
              </div>
              <p className="text-[9px] text-slate-400 text-center font-mono mt-4">ADVSOFT SaaS Console v2.6</p>
            </div>
            <div className="col-span-1 md:col-span-3 p-6 bg-white overflow-y-auto">
              {adminActiveSubMenu === 'profile' && (
                <form onSubmit={handleUpdateSchoolCoreInfo} className="space-y-4 max-w-2xl">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">প্রতিষ্ঠানের নাম (বাংলা) *</label>
                    <input type="text" required className="w-full p-2 border rounded-lg bg-slate-50 font-bold outline-none" value={editSchoolName} onChange={(e) => setEditSchoolName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Institution Name (English) *</label>
                    <input type="text" required className="w-full p-2 border rounded-lg bg-slate-50 uppercase font-black outline-none text-blue-800" value={editSchoolNameEn} onChange={(e) => setEditSchoolNameEn(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">কাস্টম ডোমেন *</label>
                    <div className="flex items-center border rounded-lg bg-slate-50 px-2">
                      <input type="text" required className="bg-transparent p-2 font-mono font-bold text-blue-600 outline-none flex-1" value={editSubdomain} onChange={(e) => setEditSubdomain(e.target.value)} />
                      <span className="text-slate-400 font-mono text-sm">.advsoft.app</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">মোবাইল নম্বর *</label>
                    <input type="text" required className="w-full p-2 border rounded-lg bg-slate-50 font-bold text-emerald-700 outline-none" value={editPhone} onChange={(e) => setEditSchoolPhone(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">EIIN নম্বর *</label>
                    <input type="text" required className="w-full p-2 border rounded-lg bg-slate-50 font-mono font-bold text-orange-600 outline-none" value={editEiin} onChange={(e) => setEditSchoolEiin(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">ইমেইল এড্রেস *</label>
                    <input type="email" required className="w-full p-2 border rounded-lg bg-slate-50 font-mono outline-none" value={editSchoolEmail} onChange={(e) => setEditSchoolEmail(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">প্রতিষ্ঠানের ঠিকানা</label>
                    <input type="text" required className="w-full p-2 border rounded-lg bg-slate-50 font-medium text-slate-700 outline-none" value={editAddress} onChange={(e) => setEditSchoolAddress(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">🕌 প্রতিষ্ঠানের লোগো</label>
                    <div className="flex items-center gap-4 mb-2">
                      {logoFile && logoFile.length > 0 ? <span className="p-2 bg-emerald-100 text-emerald-700 rounded text-xs font-bold">Selected</span> : currentLogoUrl ? <img src={currentLogoUrl} alt="Logo" className="w-10 h-10 object-contain rounded" /> : <span className="text-xl">🕌</span>}
                    </div>
                    <input type="file" accept="image/*" className="text-[10px] w-full bg-white p-1 border rounded cursor-pointer font-bold" onChange={(e: any) => setLogoFile(e.target.files)} />
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 text-white p-2.5 rounded-lg font-bold shadow hover:bg-emerald-700 transition">লাইভ আপডেট করুন 💾</button>
                  {infoFeedback && <p className="p-2 bg-emerald-50 text-emerald-700 text-center rounded font-bold text-sm border border-emerald-200 mt-2">{infoFeedback}</p>}
                </form>
              )}

              {adminActiveSubMenu === 'password' && <PasswordChange schoolId={schoolId} />}
              {adminActiveSubMenu === 'head_teacher' && <HeadTeacherControl schoolId={schoolId} liveHeadPhoto={liveHeadPhoto} liveHeadMessage={liveHeadMessage} onUpdateSuccess={(msg, photo) => { setLiveHeadMessage(msg); setLiveHeadPhoto(photo); }} />}

              {adminActiveSubMenu === 'notice' && (
                <form onSubmit={handleNoticeSubmit} className="space-y-4 max-w-xl">
                  <input type="text" required className="w-full p-2 border rounded-lg outline-none" placeholder="শিরোনাম" value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} />
                  <textarea required className="w-full p-2 border rounded-lg outline-none h-32" placeholder="বিবরণ" value={noticeContent} onChange={(e) => setNoticeContent(e.target.value)} />
                  <button type="submit" className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700">প্রকাশ করুন</button>
                  {noticeMessage && <p className="p-2 bg-blue-50 text-blue-700 rounded font-bold text-sm mt-2">{noticeMessage}</p>}
                </form>
              )}

              {adminActiveSubMenu === 'teacher_entry' && (
                <TeacherEntryForm
                  tName={tName} setTName={setTName} tNameEn={tNameEn} setTNameEn={setTNameEn}
                  tDesignation={tDesignation} setTDesignation={setTDesignation} tPhone={tPhone} setTPhone={setTPhone}
                  tNid={tNid} setTNid={setTNid} tIndex={tIndex} setTIndex={setTIndex}
                  tFather={tFather} setTFather={setTFather} tMother={tMother} setTMother={setTMother}
                  tDob={tDob} setTDob={setTDob} tMpoDate={tMpoDate} setTMpoDate={setTMpoDate}
                  tEmail={tEmail} setTEmail={setTEmail} tQualification={tQualification} setTQualification={setTQualification}
                  tAddress={tAddress} setTAddress={setTAddress} setTPhotoFile={setTPhotoFile}
                  handleTeacherSubmit={handleTeacherSubmit} teacherMessage={teacherMessage}
                />
              )}

              {adminActiveSubMenu === 'teacher_list' && <TeacherManager schoolId={schoolId} teachers={teachers} fetchTeachers={fetchTeachers} />}

              {adminActiveSubMenu === 'student_entry' && (
                <div className="space-y-6">
                  <StudentEntryForm
                    officeSName={officeSName} setOfficeSName={setOfficeSName}
                    officeSNameEn={officeSNameEn} setOfficeSNameEn={setOfficeSNameEn}
                    officeRoll={officeRoll} setOfficeRoll={setOfficeRoll}
                    officeClass={officeClass} setOfficeClass={setOfficeClass}
                    officeGroup={officeGroup} setOfficeGroup={setOfficeGroup}
                    officePhone={officePhone} setOfficePhone={setOfficePhone}
                    officeFatherName={officeFatherName} setOfficeFatherName={setOfficeFatherName}
                    officeFatherNameEn={officeFatherNameEn} setOfficeFatherNameEn={setOfficeFatherNameEn}
                    officeMotherName={officeMotherName} setOfficeMotherName={setOfficeMotherName}
                    officeMotherNameEn={officeMotherNameEn} setOfficeMotherNameEn={setOfficeMotherNameEn}
                    officeDob={officeDob} setOfficeDob={setOfficeDob}
                    officeGender={officeGender} setOfficeGender={setOfficeGender}
                    officeReligion={officeReligion} setOfficeReligion={setOfficeReligion}
                    officeNid={officeNid} setOfficeNid={setOfficeNid}
                    officeDivision={officeDivision} setOfficeDivision={setOfficeDivision}
                    officeDistrict={officeDistrict} setOfficeDistrict={setOfficeDistrict}
                    officeUpazila={officeUpazila} setOfficeUpazila={setOfficeUpazila}
                    officePostOffice={officePostOffice} setOfficePostOffice={setOfficePostOffice}
                    officeVillage={officeVillage} setOfficeVillage={setOfficeVillage}
                    setOfficePhotoFile={setOfficePhotoFile}
                    handleOfficeStudentSubmit={handleOfficeStudentSubmit}
                    officeStudentMessage={officeStudentMessage}
                    handleOfficeClassChange={handleOfficeClassChange}
                  />
                  <div className="border-t pt-6">
                    <StudentManager applicants={applicants} fetchApplicants={fetchApplicantsList} schoolName={schoolData?.name || schoolName} schoolAddress={editAddress} handleUpdateStudentSubmit={handleUpdateStudentSubmit} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

