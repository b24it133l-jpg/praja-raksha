"use client";

import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { 
  Complaint, 
  ComplaintCategory, 
  ComplaintPriority 
} from "@/types";
import { generateComplaintId, getCurrentDateTime, getComplaints, findDuplicateComplaints } from "@/lib/helpers";
import { processGrievance } from "@/lib/orchestration";
import { Language, translations } from "@/lib/i18n";
import VoiceInput from "./VoiceInput";
import { 
  Camera, 
  MapPin, 
  ShieldCheck, 
  Upload, 
  X, 
  FileText, 
  AlertTriangle, 
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  FileSearch,
  Lock,
  UserCheck,
  Zap,
  Globe
} from "lucide-react";

interface ComplaintFormProps {
  initialCategory?: string;
}

export default function ComplaintForm({ initialCategory }: ComplaintFormProps) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<ComplaintCategory>((initialCategory as ComplaintCategory) || "Civic");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isCapturingGPS, setIsCapturingGPS] = useState(false);
  const [evidence, setEvidence] = useState<{ name: string; size: string; type: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<Complaint | null>(null);
  const [lang, setLang] = useState<Language>("en");
  
  const t = translations[lang];
  
  // New: Duplicate AI state
  const [duplicate, setDuplicate] = useState<Complaint | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // AI Duplicate Detection Effect
  useEffect(() => {
    if (title.length > 5) {
      setIsScanning(true);
      const timer = setTimeout(() => {
        const existing = getComplaints();
        const found = findDuplicateComplaints(title, category, existing);
        setDuplicate(found);
        setIsScanning(false);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setDuplicate(null);
    }
  }, [title, category]);

  const handleGPSCapture = () => {
    setIsCapturingGPS(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation(`${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`);
        setIsCapturingGPS(false);
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map(f => ({
        name: f.name,
        size: (f.size / 1024 / 1024).toFixed(2) + " MB",
        type: f.type
      }));
      setEvidence(prev => [...prev, ...newFiles]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 🚀 Using Orchestration Engine (The Platform Core)
      const complaint = await processGrievance({
        title,
        description,
        category,
        location,
        email,
        isAnonymous
      });

      setResult(complaint);
    } catch (err: any) {
      alert(err.message || "Submission failed. Please check your network.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const speakSuccess = useCallback(() => {
    if ("speechSynthesis" in window) {
      const msg = new SpeechSynthesisUtterance(`Grievance record ${result?.id} is now active in the state grid.`);
      msg.lang = lang === "en" ? "en-IN" : lang === "te" ? "te-IN" : "hi-IN";
      window.speechSynthesis.speak(msg);
    }
  }, [result, lang]);

  useEffect(() => {
    if (result) speakSuccess();
  }, [result, speakSuccess]);

  const downloadPDF = () => {
    const { jsPDF } = require("jspdf");
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Praja Raksha Central Acknowledgment", 20, 20);
    doc.setFontSize(12);
    doc.text(`Tracking ID: ${result?.id}`, 20, 40);
    doc.text(`Title: ${result?.title}`, 20, 50);
    doc.text(`Category: ${result?.category}`, 20, 60);
    doc.text(`Priority: ${result?.priority}`, 20, 70);
    doc.text(`Department: ${result?.department}`, 20, 80);
    doc.text(`Timestamp: ${new Date().toLocaleString()}`, 20, 90);
    doc.save(`PrajaRaksha_${result?.id}.pdf`);
  };

  if (result) {
    const { QRCodeSVG } = require("qrcode.react");
    return (
      <div className="glass-card animate-in zoom-in-95 rounded-[40px] p-10 text-center shadow-2xl border-emerald-900/10">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-xl shadow-emerald-900/5">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="text-3xl font-black tracking-tight text-[#0A1F17]">Forensic Intake Successful</h3>
        <p className="mt-3 text-body">Grievance record <span className="font-mono font-bold text-emerald-700">{result.id}</span> is now active in the Telangana state grid.</p>
        
        <div className="mt-10 flex flex-col md:flex-row gap-8">
           <div className="flex-1 space-y-4 text-left">
              <div className="rounded-2xl bg-slate-50 p-6">
                 <p className="text-[10px] font-black uppercase tracking-widest text-[#0A1F17]/40 mb-2">Automated Routing</p>
                 <h4 className="font-bold text-[#0A1F17]">{result.department}</h4>
              </div>
              <div className="flex gap-2">
                 <button 
                  onClick={downloadPDF}
                  className="flex-1 rounded-xl bg-white border border-[#0A1F17]/10 py-3 text-[10px] font-black uppercase tracking-widest text-[#0A1F17] hover:bg-slate-50 transition"
                 >
                   Download PDF Receipt
                 </button>
              </div>
           </div>
           
           <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-[#0A1F17]/5">
              <QRCodeSVG value={`https://prajaraksha.gov.in/track/${result.id}`} size={100} />
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#0A1F17]/30">Verify via QR</p>
           </div>
        </div>
        
        <p className="mt-8 text-xs text-[#3E4F45]/60 italic leading-relaxed">
           A formal email acknowledgment has been sent to your registered address. <br/> Resolution SLA tracking has commenced.
        </p>
        
        <button 
          onClick={() => window.location.reload()}
          className="mt-10 w-full rounded-2xl bg-[#0A1F17] py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all hover:bg-black active:scale-[0.98]"
        >
          New Submission
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden rounded-[40px] shadow-2xl border-white/40">
      {/* Progress Bar */}
      <div className="flex h-1.5 w-full bg-slate-100 overflow-hidden">
         {[1,2,3,4].map(i => (
           <div 
            key={i} 
            className={`h-full flex-1 transition-all duration-700 ${step >= i ? "bg-emerald-600" : "bg-transparent"}`} 
           />
         ))}
      </div>

      <div className="p-8 md:p-12">
        <header className="mb-10">
            <div className="flex items-center justify-between">
               <div className="flex flex-col gap-1">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0A1F17]/40">
                   {t.step} {step} {t.of} 4
                 </p>
                 <h2 className="text-2xl font-black text-[#0A1F17]">
                    {step === 1 && t.caseClassification}
                    {step === 2 && t.visualEvidence}
                    {step === 3 && t.forensicDescription}
                    {step === 4 && t.identityVerification}
                 </h2>
               </div>
               
               <div className="flex items-center gap-4">
                 {/* Language Switcher */}
                 <div className="flex items-center gap-2 rounded-2xl bg-white border border-[#0A1F17]/5 p-1">
                    {(["en", "te", "hi"] as const).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setLang(l)}
                        className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-xl transition-all ${lang === l ? "bg-[#0A1F17] text-white" : "text-[#0A1F17]/40 hover:text-[#0A1F17]"}`}
                      >
                        {l}
                      </button>
                    ))}
                 </div>
                 
                 <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-[#0A1F17] text-emerald-400 sm:flex">
                    {step === 1 && <FileSearch size={24} />}
                    {step === 2 && <Camera size={24} />}
                    {step === 3 && <FileText size={24} />}
                    {step === 4 && <Lock size={24} />}
                 </div>
               </div>
            </div>
         </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* STEP 1: CONTEXT */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#0A1F17]/40 pl-1">{t.primaryCategory}</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
                  className="w-full rounded-2xl border border-slate-200 bg-white/50 p-4 text-sm font-bold shadow-sm outline-none focus:border-emerald-600/30"
                >
                  <option>Civic</option>
                  <option>Women Safety</option>
                  <option>Narcotics</option>
                  <option>Sanitation</option>
                  <option>Water</option>
                  <option>Roads</option>
                  <option>Schemes</option>
                  <option>Locality Issues</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#0A1F17]/40 pl-1">{t.incidentHeadline}</label>
                <div className="relative">
                   <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Summarize the issue in 5-6 words..."
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white/50 p-4 text-sm shadow-sm outline-none transition-all focus:border-emerald-600/30"
                  />
                  {isScanning && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-tighter animate-pulse">
                       <Zap size={12} /> Scanning Duplicates
                    </div>
                  )}
                </div>

                {/* Duplicate AI Alert */}
                {duplicate && (
                   <div className="mt-3 flex items-start gap-4 rounded-2xl bg-amber-50 p-4 border border-amber-100 animate-in zoom-in-95">
                      <AlertTriangle className="text-amber-600 shrink-0" size={18} />
                      <div>
                         <h4 className="text-xs font-black text-amber-900 uppercase tracking-tighter">Similar Case Detected</h4>
                         <p className="mt-1 text-[10px] text-amber-700 font-medium">
                            An active report <span className="font-bold underline">#{duplicate.id}</span> exists with a similar description. 
                            Consolidating reports speeds up resolution.
                         </p>
                      </div>
                   </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#0A1F17]/40 pl-1">{t.locationTag}</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter landmark or door number..."
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white/50 py-4 pl-4 pr-32 text-sm shadow-sm outline-none transition-all focus:border-emerald-600/30"
                  />
                  <button 
                    type="button"
                    onClick={handleGPSCapture}
                    disabled={isCapturingGPS}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 rounded-xl bg-[#0A1F17] px-4 py-2 text-[10px] font-bold text-emerald-400 hover:bg-black transition disabled:opacity-50"
                  >
                    <MapPin size={14} className={isCapturingGPS ? "animate-bounce" : ""} />
                    {isCapturingGPS ? "Locating..." : t.autoTagGPS}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: EVIDENCE */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
               <div 
                onClick={() => fileInputRef.current?.click()}
                className="group flex cursor-pointer flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50/50 py-16 transition-all hover:border-emerald-600/30 hover:bg-emerald-50/30"
               >
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl shadow-slate-200/50 transition-transform group-hover:scale-110">
                     <Upload className="text-emerald-700" size={32} />
                  </div>
                  <h4 className="text-sm font-black text-[#0A1F17]">{t.dropEvidence}</h4>
                  <p className="mt-2 text-xs text-[#3E4F45]/40 font-medium">{t.capturePhotos}</p>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    multiple 
                    onChange={handleFileUpload}
                    className="hidden" 
                  />
               </div>

               {evidence.length > 0 && (
                 <div className="grid gap-4 sm:grid-cols-2">
                    {evidence.map((file, i) => (
                      <div key={i} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                         <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                               <Camera size={14} />
                            </div>
                            <div>
                               <p className="max-w-[120px] truncate text-xs font-bold text-[#0A1F17]">{file.name}</p>
                               <p className="text-[10px] text-[#3E4F45]/40">{file.size}</p>
                            </div>
                         </div>
                         <button 
                            type="button"
                            onClick={() => setEvidence(prev => prev.filter((_, idx) => idx !== i))}
                            className="text-rose-400 hover:text-rose-600 transition"
                          >
                            <X size={16} />
                         </button>
                      </div>
                    ))}
                 </div>
               )}

               <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 border border-amber-100">
                  <AlertTriangle size={18} className="text-amber-600 shrink-0" />
                  <p className="text-[10px] text-amber-800 leading-relaxed font-medium">
                     **Quality Assurance**: Evidence must be clear and unaltered. Compressed or blurry images may cause departmental rejection.
                  </p>
               </div>
            </div>
          )}

          {/* STEP 3: DESCRIPTION */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-end justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#0A1F17]/40 pl-1">{t.detailedNarrative}</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="..."
                    required
                    rows={8}
                    className="w-full rounded-[32px] border border-slate-200 bg-white/50 p-6 text-sm shadow-sm outline-none transition-all focus:border-emerald-600/30"
                  />
                </div>
                <div className="pb-2">
                  <VoiceInput 
                    lang={lang === "en" ? "en-IN" : lang === "te" ? "te-IN" : "hi-IN"}
                    onTranscript={(text) => setDescription(prev => prev ? prev + " " + text : text)} 
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-700 uppercase tracking-widest pl-1">
                 <ShieldCheck size={14} />
                 AI Sentiment Analysis Active
              </div>
            </div>
          )}

          {/* STEP 4: PRIVACY */}
          {step === 4 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="grid gap-6 sm:grid-cols-2">
                  <button 
                    type="button"
                    onClick={() => setIsAnonymous(false)}
                    className={`flex flex-col items-center gap-4 rounded-[32px] p-8 transition-all ${!isAnonymous ? "bg-emerald-700 text-white shadow-2xl" : "bg-white border border-[#0A1F17]/5 text-[#0A1F17]"}`}
                  >
                     <UserCheck size={32} />
                     <div className="text-center">
                        <p className="text-sm font-black">{t.loggedIdentity}</p>
                        <p className={`mt-1 text-[10px] ${!isAnonymous ? "text-emerald-100/60" : "text-[#3E4F45]/40"}`}>Faster Resolution Policy</p>
                     </div>
                  </button>

                  <button 
                    type="button"
                    onClick={() => setIsAnonymous(true)}
                    className={`flex flex-col items-center gap-4 rounded-[32px] p-8 transition-all ${isAnonymous ? "bg-[#0A1F17] text-white shadow-2xl" : "bg-white border border-[#0A1F17]/5 text-[#0A1F17]"}`}
                  >
                     <ShieldCheck size={32} />
                     <div className="text-center">
                        <p className="text-sm font-black">{t.fullAnonymity}</p>
                        <p className={`mt-1 text-[10px] ${isAnonymous ? "text-emerald-100/60" : "text-[#3E4F45]/40"}`}>Identity Scrambled</p>
                     </div>
                  </button>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#0A1F17]/40 pl-1">{t.notificationEmail}</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email for digital receipts..."
                      required={!isAnonymous}
                      className="w-full rounded-2xl border border-slate-200 bg-white/50 p-4 text-sm shadow-sm outline-none transition-all focus:border-emerald-600/30"
                    />
                    {!isAnonymous && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">
                         <Zap size={12} /> Live Updates Active
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-[#3E4F45]/40 pl-1 italic">
                    {isAnonymous 
                      ? "Optional: You can provide an email for updates even while anonymous." 
                      : "Required for receiving your digital tracking certificate and status alerts."}
                  </p>
               </div>

               <div className="rounded-[32px] border border-[#0A1F17]/5 p-8">
                  <h4 className="text-sm font-black text-[#0A1F17]">Final Attestation</h4>
                  <p className="mt-2 text-xs text-[#3E4F45]/60 leading-relaxed font-medium">
                     By clicking submit, I confirm that the provided information is true to the best of my knowledge. False reports are punishable under IT Act 2000.
                  </p>
               </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-[#0A1F17]/5">
            {step > 1 ? (
              <button 
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 text-sm font-bold text-[#3E4F45] hover:text-[#0A1F17]"
              >
                <ChevronLeft size={18} /> Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button 
                type="button"
                onClick={nextStep}
                className="flex items-center gap-3 rounded-full bg-[#0A1F17] px-8 py-3.5 text-sm font-black uppercase tracking-widest text-white shadow-lg transition-all hover:bg-black active:scale-95"
              >
                Continue
                <ChevronRight size={18} />
              </button>
            ) : (
              <button 
                type="submit"
                disabled={isSubmitting}
                className="group relative flex items-center justify-center gap-3 rounded-full bg-emerald-700 px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-2xl transition-all hover:bg-emerald-800 active:scale-95 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                ) : (
                  <>
                    {t.finalizeSubmission}
                    <ShieldCheck size={18} className="group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}