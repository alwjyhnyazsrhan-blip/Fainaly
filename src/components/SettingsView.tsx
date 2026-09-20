import React, { useState } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  Target, 
  Music, 
  Volume2, 
  Sliders, 
  Swords, 
  Package, 
  LayoutGrid, 
  Bell, 
  MessageSquareOff, 
  BatteryCharging, 
  AlertTriangle, 
  FlagOff, 
  Thermometer, 
  Settings, 
  Headphones, 
  Send, 
  Mail, 
  Lock, 
  KeyRound, 
  LogOut, 
  Plus, 
  ChevronDown,
  X,
  RefreshCw,
  Trash2
} from 'lucide-react';

interface SettingsViewProps {
  language: string;
  setLanguage: (lang: string) => void;
  userEmail?: string;
  handleSyncAccount: () => void;
  isMusicMuted: boolean;
  setIsMusicMuted: (val: boolean) => void;
  isSfxMuted: boolean;
  setIsSfxMuted: (val: boolean) => void;
  showSoundTones: boolean;
  setShowSoundTones: (val: boolean) => void;
  showAttackNotifications: boolean;
  setShowAttackNotifications: (val: boolean) => void;
  showChestNotifications: boolean;
  setShowChestNotifications: (val: boolean) => void;
  customizeIconFunctions: boolean;
  setCustomizeIconFunctions: (val: boolean) => void;
  showRelatedAlerts: boolean;
  setShowRelatedAlerts: (val: boolean) => void;
  disableQuickChat: boolean;
  setDisableQuickChat: (val: boolean) => void;
  powerSaverLogin: boolean;
  setPowerSaverLogin: (val: boolean) => void;
  setPowerSaver: (val: boolean) => void;
  showPopupAlerts: boolean;
  setShowPopupAlerts: (val: boolean) => void;
  stopRogueAlliances: boolean;
  setStopRogueAlliances: (val: boolean) => void;
  heatingEnergyIndex: boolean;
  setHeatingEnergyIndex: (val: boolean) => void;
  setActiveSettingsModal: (modal: 'email' | 'password' | 'ticket' | 'icons' | 'delete' | null) => void;
  handleSendPasswordReset: () => void;
  handleLogout: () => void;
  showToast: (msg: string, type: 'success' | 'error' | 'warning' | 'info') => void;
  onClose: () => void;
  handleUpdateGameVersion?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  language,
  setLanguage,
  userEmail,
  handleSyncAccount,
  isMusicMuted,
  setIsMusicMuted,
  isSfxMuted,
  setIsSfxMuted,
  showSoundTones,
  setShowSoundTones,
  showAttackNotifications,
  setShowAttackNotifications,
  showChestNotifications,
  setShowChestNotifications,
  customizeIconFunctions,
  setCustomizeIconFunctions,
  showRelatedAlerts,
  setShowRelatedAlerts,
  disableQuickChat,
  setDisableQuickChat,
  powerSaverLogin,
  setPowerSaverLogin,
  setPowerSaver,
  showPopupAlerts,
  setShowPopupAlerts,
  stopRogueAlliances,
  setStopRogueAlliances,
  heatingEnergyIndex,
  setHeatingEnergyIndex,
  setActiveSettingsModal,
  handleSendPasswordReset,
  handleLogout,
  showToast,
  onClose,
  handleUpdateGameVersion
}) => {
  const [dangerZoneOpen, setDangerZoneOpen] = useState(false);
  const displayEmail = userEmail || 'ttwk29818@gmail.com';

  // Toggle rows strictly matching the reference screenshot
  const toggleItems = [
    {
      id: 'music',
      label: 'الموسيقى الخلفية',
      icon: <Music size={17} className="text-sky-300" />,
      checked: !isMusicMuted,
      toggle: () => {
        setIsMusicMuted(!isMusicMuted);
        showToast(!isMusicMuted ? '🔇 تم كتم الموسيقى الخلفية' : '🎵 تم تشغيل الموسيقى الخلفية', 'success');
      }
    },
    {
      id: 'sfx',
      label: 'المؤثرات الصوتية',
      icon: <Volume2 size={17} className="text-sky-300" />,
      checked: !isSfxMuted,
      toggle: () => {
        setIsSfxMuted(!isSfxMuted);
        showToast(!isSfxMuted ? '🔇 تم كتم المؤثرات الصوتية' : '🔊 تم تشغيل المؤثرات الصوتية', 'success');
      }
    },
    {
      id: 'sound_tones',
      label: 'إظهار نقاط الصوت',
      icon: <Sliders size={17} className="text-sky-300" />,
      checked: showSoundTones,
      toggle: () => {
        setShowSoundTones(!showSoundTones);
        showToast(!showSoundTones ? '❌ تم إيقاف نقاط الصوت' : '🎛️ تم تفعيل نقاط الصوت', 'success');
      }
    },
    {
      id: 'attack_announcements',
      label: 'إظهار إعلانات الهجوم',
      icon: <Swords size={17} className="text-sky-300" />,
      checked: showAttackNotifications,
      toggle: () => {
        setShowAttackNotifications(!showAttackNotifications);
        showToast(!showAttackNotifications ? '❌ تم إيقاف إعلانات الهجوم' : '⚔️ تم تفعيل إعلانات الهجوم', 'success');
      }
    },
    {
      id: 'chest_announcements',
      label: 'إظهار إعلانات الصندوق',
      icon: <Package size={17} className="text-sky-300" />,
      checked: showChestNotifications,
      toggle: () => {
        setShowChestNotifications(!showChestNotifications);
        showToast(!showChestNotifications ? '❌ تم إيقاف إعلانات الصندوق' : '📦 تم تفعيل إعلانات الصندوق', 'success');
      }
    },
    {
      id: 'customize_functions',
      label: 'تخصيص وظائف الرفيقات',
      icon: <LayoutGrid size={17} className="text-sky-300" />,
      checked: customizeIconFunctions,
      toggle: () => {
        setCustomizeIconFunctions(!customizeIconFunctions);
        showToast(!customizeIconFunctions ? '❌ تم إيقاف تخصيص وظائف الرفيقات' : '🪟 تم تفعيل تخصيص وظائف الرفيقات', 'success');
      }
    },
    {
      id: 'popup_alerts',
      label: 'إظهار التنبيهات المنبثقة',
      icon: <Bell size={17} className="text-sky-300" />,
      checked: showRelatedAlerts,
      toggle: () => {
        setShowRelatedAlerts(!showRelatedAlerts);
        showToast(!showRelatedAlerts ? '❌ تم إيقاف التنبيهات المنبثقة' : '🔔 تم تفعيل التنبيهات المنبثقة', 'success');
      }
    },
    {
      id: 'disable_quick_chat',
      label: 'إيقاف الكتابة السريعة',
      icon: <MessageSquareOff size={17} className="text-sky-300" />,
      checked: disableQuickChat,
      toggle: () => {
        setDisableQuickChat(!disableQuickChat);
        showToast(!disableQuickChat ? '💬 تم تفعيل الكتابة السريعة' : '🔇 تم إيقاف الكتابة السريعة', 'success');
      }
    },
    {
      id: 'power_saver',
      label: 'مؤشر الطاقة أثناء التسجيل',
      icon: <BatteryCharging size={17} className="text-sky-300" />,
      checked: powerSaverLogin,
      toggle: () => {
        setPowerSaverLogin(!powerSaverLogin);
        setPowerSaver(!powerSaverLogin);
        showToast(!powerSaverLogin ? '🔋 تم تفعيل مؤشر الطاقة أثناء التسجيل' : '❌ تم إيقاف مؤشر الطاقة أثناء التسجيل', 'success');
      }
    },
    {
      id: 'exciting_alerts',
      label: 'إظهار التنبيهات الشائقة',
      icon: <AlertTriangle size={17} className="text-sky-300" />,
      checked: showPopupAlerts,
      toggle: () => {
        setShowPopupAlerts(!showPopupAlerts);
        showToast(!showPopupAlerts ? '❌ تم إيقاف التنبيهات الشائقة' : '⚠️ تم تفعيل التنبيهات الشائقة', 'success');
      }
    },
    {
      id: 'stop_annoying_ads',
      label: 'إيقاف الإعلانات المزعجة',
      icon: <FlagOff size={17} className="text-sky-300" />,
      checked: stopRogueAlliances,
      toggle: () => {
        setStopRogueAlliances(!stopRogueAlliances);
        showToast(!stopRogueAlliances ? '🏳️ تم إيقاف الإعلانات المزعجة' : '❌ تم تفعيل الإعلانات المزعجة', 'success');
      }
    },
    {
      id: 'thermal_index',
      label: 'مؤشر الطاقة أثناء التسجيل',
      icon: <Thermometer size={17} className="text-sky-300" />,
      checked: heatingEnergyIndex,
      toggle: () => {
        setHeatingEnergyIndex(!heatingEnergyIndex);
        showToast(!heatingEnergyIndex ? '🌡️ تم تفعيل مؤشر الطاقة الحراري' : '❌ تم إيقاف مؤشر الطاقة الحراري', 'success');
      }
    }
  ];

  return (
    <div 
      className="tab-overlay relative w-full min-h-screen text-slate-100 flex flex-col items-center select-none overflow-x-hidden"
      style={{
        backgroundImage: `radial-gradient(ellipse at top, rgba(14, 30, 56, 0.7), rgba(2, 6, 15, 0.96)), url('/settings_pirate_bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed',
        fontFamily: "'Cairo', system-ui, -apple-system, sans-serif",
        padding: '12px 8px 140px 8px'
      }}
    >
      {/* Top Close Floating Button */}
      <button 
        onClick={onClose}
        aria-label="Close"
        className="fixed top-3 left-3 z-50 w-9 h-9 rounded-full flex items-center justify-center bg-black/70 border border-amber-500/50 text-amber-300 hover:text-white hover:bg-amber-600/70 shadow-2xl backdrop-blur-md transition-all active:scale-90"
      >
        <X size={18} />
      </button>

      {/* Frame Container with Side Masts & Hanging Lanterns */}
      <div className="w-full max-w-[520px] relative px-3 sm:px-6">

        {/* LEFT PIRATE WOODEN MAST & GLOWING LANTERN */}
        <div className="absolute -left-1 sm:left-0 top-0 bottom-0 w-4 pointer-events-none z-20 flex flex-col items-center">
          {/* Wooden Mast texture */}
          <div className="w-2.5 sm:w-3.5 h-full rounded-full bg-gradient-to-r from-[#1c1208] via-[#3d2714] to-[#120a04] border-r border-[#6b4724]/40 shadow-[2px_0_10px_rgba(0,0,0,0.8)] relative">
            {/* Ropes wound around mast */}
            <div className="absolute top-20 left-0 right-0 h-4 border-y-2 border-dashed border-[#d97706]/40 opacity-70" />
            <div className="absolute top-96 left-0 right-0 h-4 border-y-2 border-dashed border-[#d97706]/40 opacity-70" />
            <div className="absolute bottom-32 left-0 right-0 h-4 border-y-2 border-dashed border-[#d97706]/40 opacity-70" />
          </div>

          {/* Glowing Hanging Lantern (Left) */}
          <div className="absolute top-14 -right-2 sm:-right-3 flex flex-col items-center animate-pulse">
            <div className="w-2 h-3 bg-neutral-900 border border-amber-600/60 rounded-t" />
            <div 
              className="w-5 h-7 rounded-md border border-amber-400 bg-gradient-to-b from-amber-300 via-amber-500 to-orange-600 flex items-center justify-center shadow-[0_0_25px_#f59e0b,0_0_50px_rgba(245,158,11,0.5)]"
            >
              <div className="w-2 h-3 bg-white/90 rounded-full blur-[1px]" />
            </div>
            <div className="w-2.5 h-1.5 bg-neutral-950 rounded-b border border-amber-700/60" />
          </div>

          {/* Bottom Anchor Decor (Left) */}
          <div className="absolute -bottom-2 -left-1 text-2xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] opacity-90">
            ⚓
          </div>
        </div>

        {/* RIGHT PIRATE WOODEN MAST & GLOWING LANTERN */}
        <div className="absolute -right-1 sm:right-0 top-0 bottom-0 w-4 pointer-events-none z-20 flex flex-col items-center">
          {/* Wooden Mast texture */}
          <div className="w-2.5 sm:w-3.5 h-full rounded-full bg-gradient-to-r from-[#120a04] via-[#3d2714] to-[#1c1208] border-l border-[#6b4724]/40 shadow-[-2px_0_10px_rgba(0,0,0,0.8)] relative">
            <div className="absolute top-20 left-0 right-0 h-4 border-y-2 border-dashed border-[#d97706]/40 opacity-70" />
            <div className="absolute top-96 left-0 right-0 h-4 border-y-2 border-dashed border-[#d97706]/40 opacity-70" />
            <div className="absolute bottom-32 left-0 right-0 h-4 border-y-2 border-dashed border-[#d97706]/40 opacity-70" />
          </div>

          {/* Glowing Hanging Lantern (Right) */}
          <div className="absolute top-14 -left-2 sm:-left-3 flex flex-col items-center animate-pulse">
            <div className="w-2 h-3 bg-neutral-900 border border-amber-600/60 rounded-t" />
            <div 
              className="w-5 h-7 rounded-md border border-amber-400 bg-gradient-to-b from-amber-300 via-amber-500 to-orange-600 flex items-center justify-center shadow-[0_0_25px_#f59e0b,0_0_50px_rgba(245,158,11,0.5)]"
            >
              <div className="w-2 h-3 bg-white/90 rounded-full blur-[1px]" />
            </div>
            <div className="w-2.5 h-1.5 bg-neutral-950 rounded-b border border-amber-700/60" />
          </div>

          {/* Bottom Compass Rose (Right) */}
          <div className="absolute -bottom-2 -right-1 text-2xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] opacity-90">
            🧭
          </div>
        </div>

        {/* Central Content Area between the masts */}
        <div className="w-full flex flex-col gap-2.5 relative z-10 px-1 sm:px-2">

          {/* 1. TOP HEADER PLAQUE: الإعدادات with pirate skull and wheel */}
          <div className="flex flex-col items-center justify-center pt-2 pb-0.5 relative">
            {/* Top Pirate Crown & Trident Flags */}
            <div className="relative flex items-center justify-center gap-3 -mb-2 z-10">
              <span className="text-base filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] opacity-90">🔱</span>
              <div className="flex items-center justify-center text-2xl filter drop-shadow-[0_0_12px_rgba(234,179,8,0.7)]">
                👑
              </div>
              <span className="text-base filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] opacity-90">🔱</span>
            </div>

            {/* Carved Gold & Dark Metal Plaque */}
            <div 
              className="w-full max-w-[340px] py-1.5 px-6 rounded-xl text-center relative border-[2.5px] border-[#a16207] shadow-[0_12px_30px_rgba(0,0,0,0.95),inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-4px_8px_rgba(0,0,0,0.85)]"
              style={{
                background: 'linear-gradient(180deg, #2b1f13 0%, #150f09 50%, #0c0805 100%)',
              }}
            >
              {/* Stud corner bolts */}
              <div className="absolute top-1.5 left-2 w-2 h-2 rounded-full bg-amber-500/80 border border-amber-200/50 shadow-inner" />
              <div className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-amber-500/80 border border-amber-200/50 shadow-inner" />
              <div className="absolute bottom-1.5 left-2 w-2 h-2 rounded-full bg-amber-500/80 border border-amber-200/50 shadow-inner" />
              <div className="absolute bottom-1.5 right-2 w-2 h-2 rounded-full bg-amber-500/80 border border-amber-200/50 shadow-inner" />

              <h1 
                className="text-3xl sm:text-4xl font-black tracking-wider leading-none m-0 py-0.5"
                style={{
                  background: 'linear-gradient(180deg, #fffbeb 0%, #fde047 35%, #d97706 75%, #78350f 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.95)) drop-shadow(0 0 14px rgba(234,179,8,0.45))'
                }}
              >
                الإعدادات
              </h1>
            </div>
          </div>

          {/* 2. LANGUAGE SELECTOR (English on left, Arabic with Saudi Flag on right!) */}
          <div className="grid grid-cols-2 gap-2 w-full pt-1">
            {/* Left Pill: English */}
            <button
              onClick={() => {
                setLanguage('en');
                showToast('Language set to English', 'success');
              }}
              className="flex items-center justify-between px-3 py-2 rounded-lg border text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95"
              style={{
                background: language === 'en' 
                  ? 'linear-gradient(180deg, #1e3a5f 0%, #0f1d30 100%)' 
                  : 'linear-gradient(180deg, #0b1a2e 0%, #060e1a 100%)',
                borderColor: language === 'en' ? '#38bdf8' : 'rgba(56, 189, 248, 0.25)',
                color: language === 'en' ? '#38bdf8' : '#cbd5e1'
              }}
            >
              <Globe size={16} className="text-sky-400 shrink-0" />
              <div className="flex items-center gap-1.5">
                <span>English</span>
                <span className="text-base leading-none">🇺🇸</span>
              </div>
              <ChevronDown size={14} className="text-slate-400 shrink-0" />
            </button>

            {/* Right Pill: العربية مع العلم السعودي 🇸🇦 كطلب المستخدم تماماً */}
            <button
              onClick={() => {
                setLanguage('ar');
                showToast('تم تعيين اللغة العربية بنجاح!', 'success');
              }}
              className="flex items-center justify-between px-3 py-2 rounded-lg border text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95"
              style={{
                background: language === 'ar' 
                  ? 'linear-gradient(180deg, #2e200c 0%, #170f05 100%)' 
                  : 'linear-gradient(180deg, #12100d 0%, #080705 100%)',
                borderColor: language === 'ar' ? '#eab308' : 'rgba(234, 179, 8, 0.3)',
                color: language === 'ar' ? '#fef08a' : '#cbd5e1',
                boxShadow: language === 'ar' ? 'inset 0 0 12px rgba(234, 179, 8, 0.22), 0 4px 10px rgba(0,0,0,0.6)' : 'none'
              }}
            >
              <ChevronDown size={14} className="text-amber-300/80 shrink-0" />
              <div className="flex items-center gap-1.5">
                <span>العربية</span>
                {/* العلم السعودي 🇸🇦 بدلاً من العلم المصري كما طُلب تماماً */}
                <span className="text-base leading-none">🇸🇦</span>
              </div>
              <span className="w-3" /> {/* Balance spacer */}
            </button>
          </div>

          {/* 3. ACCOUNT & CLOUD MESSAGING PANEL */}
          <div 
            className="w-full rounded-xl border border-sky-900/50 p-2.5 sm:p-3 flex items-center justify-between shadow-lg"
            style={{
              background: 'linear-gradient(180deg, rgba(6, 23, 44, 0.92) 0%, rgba(3, 13, 26, 0.96) 100%)',
              backdropFilter: 'blur(6px)'
            }}
          >
            {/* Left: Connected Badge (متصل ومؤكد) */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/70 text-emerald-400 text-xs font-black tracking-wide shadow-sm">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>متصل ومؤكد</span>
            </div>

            {/* Right: Email Info (RTL) */}
            <div className="flex flex-col items-end text-right gap-0.5 max-w-[65%]">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 font-bold">
                <span>تواصل الحساب والمراسلة السحابية</span>
                <span className="text-sky-400">✉️</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-sky-200/90 font-mono tracking-wide truncate max-w-full">
                <span className="truncate">{displayEmail}</span>
                <span className="text-sky-400">✉️</span>
              </div>
            </div>
          </div>

          {/* 4. VIBRANT GREEN ACCOUNT SYNC BAR */}
          <button
            onClick={handleSyncAccount}
            className="w-full py-2.5 px-4 rounded-xl border border-emerald-400/80 flex items-center justify-between text-white font-black text-xs sm:text-sm tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.35),inset_0_1px_2px_rgba(255,255,255,0.4)] transition-all hover:brightness-110 active:scale-[0.99]"
            style={{
              background: 'linear-gradient(90deg, #059669 0%, #10b981 50%, #059669 100%)'
            }}
          >
            <Target size={18} className="text-emerald-100 shrink-0" />
            <span className="mx-2 truncate">مزامنة وتحديث بيانات الحساب والبريد الإلكتروني الآن</span>
            <CheckCircle2 size={18} className="text-emerald-100 shrink-0" />
          </button>

          {/* 5. THE 12 TOGGLE CONTROLS CONTAINER */}
          <div 
            className="w-full rounded-xl border border-sky-900/40 overflow-hidden shadow-2xl flex flex-col"
            style={{
              background: 'linear-gradient(180deg, rgba(6, 19, 36, 0.94) 0%, rgba(3, 10, 20, 0.98) 100%)',
              backdropFilter: 'blur(8px)'
            }}
          >
            {toggleItems.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-center justify-between px-3.5 py-2 sm:py-2.5 transition-colors hover:bg-sky-950/30 ${
                  idx !== toggleItems.length - 1 ? 'border-b border-slate-800/60' : ''
                }`}
              >
                {/* Left: Custom Switch Toggle */}
                <div
                  onClick={item.toggle}
                  className="w-11 h-6 rounded-full cursor-pointer relative transition-all duration-200 ease-out shrink-0 border border-white/10 shadow-inner"
                  style={{
                    backgroundColor: item.checked ? '#22c55e' : '#1e293b',
                    boxShadow: item.checked ? '0 0 10px rgba(34,197,94,0.4)' : 'none'
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-200 ease-out shadow-md"
                    style={{
                      left: item.checked ? '24px' : '4px'
                    }}
                  />
                </div>

                {/* Right: Label & Icon (RTL) */}
                <div className="flex items-center gap-2.5 text-right cursor-pointer" onClick={item.toggle}>
                  <span className="text-xs sm:text-[13px] font-bold text-slate-200">
                    {item.label}
                  </span>
                  <span className="w-5 flex justify-center items-center text-sm">
                    {item.icon}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 6. THE 8 MAJESTIC ACTION BUTTONS */}
          <div className="flex flex-col gap-2 w-full pt-1">

            {/* Button 1: Navy/Slate - تخصيص موقع الرفيقات ⚙️ */}
            <button
              onClick={() => setActiveSettingsModal('icons')}
              className="group relative w-full py-2.5 px-4 rounded-xl border border-slate-600/70 flex items-center justify-between text-slate-100 font-black text-xs sm:text-sm tracking-wide shadow-lg transition-all hover:brightness-110 active:scale-[0.99] overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.6), inset 0 1px 1px rgba(255,255,255,0.15)'
              }}
            >
              <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-white transition-colors">
                <span className="text-xs opacity-60">⚙️</span>
              </div>
              <div className="flex items-center gap-2">
                <span>تخصيص موقع الرفيقات</span>
                <Settings size={17} className="text-slate-300" />
              </div>
              <LayoutGrid size={16} className="text-slate-400 group-hover:text-white" />
            </button>

            {/* Button 2: Bronze/Amber Wood - الدعم الفني - إنشاء تذكرة 🎧 */}
            <button
              onClick={() => setActiveSettingsModal('ticket')}
              className="group relative w-full py-2.5 px-4 rounded-xl border border-amber-600/70 flex items-center justify-between text-amber-100 font-black text-xs sm:text-sm tracking-wide shadow-lg transition-all hover:brightness-110 active:scale-[0.99] overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #854d0e 0%, #451a03 100%)',
                boxShadow: '0 4px 14px rgba(133, 77, 14, 0.4), inset 0 1px 1px rgba(255,255,255,0.2)'
              }}
            >
              <div className="w-5 opacity-70 text-xs">⚙️</div>
              <div className="flex items-center gap-2">
                <span>الدعم الفني - إنشاء تذكرة</span>
                <Headphones size={17} className="text-amber-200" />
              </div>
              <div className="w-5 text-right opacity-70 text-xs">⚓</div>
            </button>

            {/* Button 3: Ocean Blue - قناة اللعبة على تيليجرام ✈️ */}
            <button
              onClick={() => {
                window.open('https://t.me/hycsp', '_blank');
                showToast('جاري توجيهك إلى قناة تيليجرام اللعبة... 📢', 'success');
              }}
              className="group relative w-full py-2.5 px-4 rounded-xl border border-sky-400/70 flex items-center justify-between text-sky-100 font-black text-xs sm:text-sm tracking-wide shadow-lg transition-all hover:brightness-110 active:scale-[0.99] overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #0284c7 0%, #075985 100%)',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4), inset 0 1px 1px rgba(255,255,255,0.25)'
              }}
            >
              <Send size={15} className="text-sky-300 opacity-60" />
              <div className="flex items-center gap-2">
                <span>قناة اللعبة على تيليجرام</span>
                <Send size={17} className="text-white" />
              </div>
              <Send size={15} className="text-sky-300 opacity-60 -scale-x-100" />
            </button>

            {/* Button 4: Royal Purple - إنضمام إلى ديسكورد 👾 */}
            <button
              onClick={() => {
                window.open('https://discord.gg/kingsdeep', '_blank');
                showToast('جاري توجيهك إلى ديسكورد اللعبة الرسمي... 🎮', 'success');
              }}
              className="group relative w-full py-2.5 px-4 rounded-xl border border-purple-500/70 flex items-center justify-between text-purple-100 font-black text-xs sm:text-sm tracking-wide shadow-lg transition-all hover:brightness-110 active:scale-[0.99] overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #6b21a8 0%, #3b0764 100%)',
                boxShadow: '0 4px 14px rgba(107, 33, 168, 0.4), inset 0 1px 1px rgba(255,255,255,0.2)'
              }}
            >
              <span className="text-xs opacity-60">👾</span>
              <div className="flex items-center gap-2">
                <span>إنضمام إلى ديسكورد</span>
                <svg className="w-4 h-4 fill-current text-purple-200" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </div>
              <span className="text-xs opacity-60">⚓</span>
            </button>

            {/* Button 5: Ocean Teal/Cyan - تغيير البريد الإلكتروني ✉️ */}
            <button
              onClick={() => setActiveSettingsModal('email')}
              className="group relative w-full py-2.5 px-4 rounded-xl border border-cyan-500/70 flex items-center justify-between text-cyan-100 font-black text-xs sm:text-sm tracking-wide shadow-lg transition-all hover:brightness-110 active:scale-[0.99] overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #0891b2 0%, #164e63 100%)',
                boxShadow: '0 4px 14px rgba(8, 145, 178, 0.4), inset 0 1px 1px rgba(255,255,255,0.2)'
              }}
            >
              <Mail size={15} className="text-cyan-300 opacity-60" />
              <div className="flex items-center gap-2">
                <span>تغيير البريد الإلكتروني</span>
                <Mail size={17} className="text-white" />
              </div>
              <span className="text-xs opacity-60">⚙️</span>
            </button>

            {/* Button 6: Forest Green - تغيير كلمة المرور 🔒 */}
            <button
              onClick={() => handleSendPasswordReset()}
              className="group relative w-full py-2.5 px-4 rounded-xl border border-emerald-500/70 flex items-center justify-between text-emerald-100 font-black text-xs sm:text-sm tracking-wide shadow-lg transition-all hover:brightness-110 active:scale-[0.99] overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #15803d 0%, #14532d 100%)',
                boxShadow: '0 4px 14px rgba(21, 128, 61, 0.4), inset 0 1px 1px rgba(255,255,255,0.2)'
              }}
            >
              <ShieldCheck size={15} className="text-emerald-300 opacity-60" />
              <div className="flex items-center gap-2">
                <span>تغيير كلمة المرور</span>
                <Lock size={17} className="text-white" />
              </div>
              <ShieldCheck size={15} className="text-emerald-300 opacity-60" />
            </button>

            {/* Button 7: Warm Brown / Amber - استعادة كلمة المرور عبر البريد 🔑 */}
            <button
              onClick={() => handleSendPasswordReset()}
              className="group relative w-full py-2.5 px-4 rounded-xl border border-amber-600/70 flex items-center justify-between text-amber-100 font-black text-xs sm:text-sm tracking-wide shadow-lg transition-all hover:brightness-110 active:scale-[0.99] overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #9a3412 0%, #431407 100%)',
                boxShadow: '0 4px 14px rgba(154, 52, 18, 0.4), inset 0 1px 1px rgba(255,255,255,0.2)'
              }}
            >
              <Mail size={15} className="text-amber-300 opacity-60" />
              <div className="flex items-center gap-2">
                <span>استعادة كلمة المرور عبر البريد</span>
                <KeyRound size={17} className="text-amber-200" />
              </div>
              <Mail size={15} className="text-amber-300 opacity-60" />
            </button>

            {/* Button 8: Crimson Red - تسجيل الخروج 🚪 */}
            <button
              onClick={() => {
                if (window.confirm('هل تريد حقاً تسجيل الخروج والعودة لشاشة البدء؟')) {
                  handleLogout();
                }
              }}
              className="group relative w-full py-2.5 px-4 rounded-xl border border-rose-600/70 flex items-center justify-between text-rose-100 font-black text-xs sm:text-sm tracking-wide shadow-lg transition-all hover:brightness-110 active:scale-[0.99] overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #9f1239 0%, #4c0519 100%)',
                boxShadow: '0 4px 14px rgba(159, 18, 57, 0.45), inset 0 1px 1px rgba(255,255,255,0.2)'
              }}
            >
              <span className="text-xs opacity-60">💀</span>
              <div className="flex items-center gap-2">
                <span>تسجيل الخروج</span>
                <LogOut size={17} className="text-white" />
              </div>
              <span className="text-xs opacity-60">🚪</span>
            </button>

          </div>

          {/* 7. DANGER ZONE BAR: ⚠️ منطقة الخطر ➕ */}
          <div className="w-full flex flex-col gap-2 pt-1">
            <button
              onClick={() => setDangerZoneOpen(!dangerZoneOpen)}
              className="w-full py-2 px-4 rounded-xl border border-rose-800/60 flex items-center justify-center gap-2 text-rose-300 font-black text-xs sm:text-sm tracking-wider shadow-md transition-all hover:bg-rose-950/40"
              style={{
                background: 'linear-gradient(180deg, #1a080c 0%, #0d0406 100%)'
              }}
            >
              <AlertTriangle size={15} className="text-amber-400" />
              <span>منطقة الخطر</span>
              <Plus size={15} className={`text-amber-400 transition-transform ${dangerZoneOpen ? 'rotate-45' : ''}`} />
            </button>

            {dangerZoneOpen && (
              <div className="w-full p-4 rounded-xl bg-rose-950/50 border border-rose-500/40 flex flex-col items-center gap-3 animate-fadeIn text-center">
                <p className="text-xs text-rose-200 leading-relaxed m-0">
                  حذف الحساب نهائياً يمسح جميع بياناتك وسفنك وأرصدتك بدون رجعة!
                </p>
                <button
                  onClick={() => setActiveSettingsModal('delete')}
                  className="w-full py-2 px-4 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Trash2 size={15} />
                  <span>حذف الحساب نهائياً</span>
                </button>
              </div>
            )}
          </div>

          {/* 8. UPDATE GAME & CLOSE BUTTON */}
          <div className="w-full flex flex-col gap-2 pt-2">
            {handleUpdateGameVersion && (
              <button
                onClick={handleUpdateGameVersion}
                className="w-full py-2.5 px-4 rounded-xl border border-sky-500/50 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <RefreshCw size={16} />
                <span>تحديث اللعبة لآخر إصدار</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl border border-amber-500/60 bg-gradient-to-b from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white font-black text-sm sm:text-base tracking-wider shadow-lg transition-all active:scale-[0.99]"
            >
              العودة للميناء ⚓
            </button>

            <div className="text-center text-[11px] font-bold text-amber-500/80 pt-1 pb-4">
              الإصدار 1.0 — أساطيل البحار السبعة
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
