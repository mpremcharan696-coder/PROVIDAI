/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { LayoutDashboard, ClipboardList, ShieldCheck, MessageSquare, Info, AlertCircle, Loader2, Sparkles, Clock, UserCircle, GraduationCap } from "lucide-react";
import { Toaster } from "@/src/components/ui/sonner";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Button } from "@/src/components/ui/button";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { Badge } from "@/src/components/ui/badge";

import Dashboard from "./components/Dashboard";
import EligibilityForm from "./components/EligibilityForm";
import DocumentScanner from "./components/DocumentScanner";
import ChatAssistant from "./components/ChatAssistant";
import SchemeLibrary from "./components/SchemeLibrary";
import UserProfileForm from "./components/UserProfileForm";

import { UserProfile, ApplicationStatus, Language, Scheme } from "./types";
import { translations } from "./lib/i18n";
import { MOCK_SCHEMES } from "./constants";
import SchemeDetailsDialog from "./components/SchemeDetailsDialog";

export default function App() {
  const [language, setLanguage] = useState<Language>("en");
  const t = translations[language];

  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [isSchemeDialogOpen, setIsSchemeDialogOpen] = useState(false);

  const handleOpenSchemeDetails = (scheme: Scheme) => {
    setSelectedScheme(scheme);
    setIsSchemeDialogOpen(true);
  };

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeApplications, setActiveApplications] = useState<ApplicationStatus[]>([
    {
      id: "app_1",
      schemeId: "scheme_1",
      schemeName: "National Merit Scholarship",
      status: "In Review",
      appliedDate: "2026-04-15",
      lastUpdated: "2026-04-20",
      nextStep: "Academic Verification"
    },
    {
      id: "app_2",
      schemeId: "scheme_2",
      schemeName: "STEM Innovation Grant",
      status: "Approved",
      appliedDate: "2026-03-10",
      lastUpdated: "2026-04-25",
      nextStep: "Tuition Grant Disbursement"
    }
  ]);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleSaveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    setActiveTab("dashboard");
  };

  const navItems = [
    { id: "dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { id: "eligibility", label: t.nav.eligibility, icon: ClipboardList },
    { id: "scanner", label: t.nav.vault, icon: ShieldCheck },
    { id: "tracking", label: t.nav.tracking, icon: Clock },
    { id: "library", label: t.nav.library, icon: Info },
  ];

  const langs = [
    { code: "en", label: "EN" },
    { code: "hi", label: "हि" },
    { code: "te", label: "తె" },
    { code: "ta", label: "த" },
    { code: "bn", label: "ব" },
  ];

  return (
    <div className="flex h-screen w-full bg-white font-sans text-slate-900 overflow-hidden">
      <Toaster position="top-right" />
      
      {!userProfile && (
        <div className="fixed inset-0 z-[100] bg-slate-50 flex items-center justify-center p-4 overflow-auto">
          <div className="max-w-4xl w-full py-12">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <div className="size-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-2xl">
                  <GraduationCap className="size-8" />
                </div>
                <h1 className="text-4xl font-black text-indigo-950 tracking-tighter">StudentProvidAI</h1>
              </motion.div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">{t.profile.onboarding_title}</h2>
              <p className="text-slate-500 font-medium">{t.profile.onboarding_subtitle}</p>
              
              <div className="flex justify-center gap-2 mt-6">
                {langs.map((l) => (
                  <Button
                    key={l.code}
                    variant={language === l.code ? "default" : "outline"}
                    onClick={() => setLanguage(l.code as Language)}
                    className="rounded-full px-4 h-8 text-[10px] uppercase font-black tracking-widest"
                  >
                    {l.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <UserProfileForm 
              initialProfile={null} 
              onSave={handleSaveProfile} 
              language={language} 
            />
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-64 border-r border-slate-200 bg-slate-900 flex-col shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="size-6 bg-indigo-500 rounded-md flex items-center justify-center">
              <GraduationCap className="size-4 text-white" />
            </div>
            <h1 className="text-white font-bold text-xl tracking-tight">StudentProvidAI</h1>
          </div>
          <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-semibold opacity-60">{t.subtitle}</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full p-3 rounded-xl flex items-center gap-3 font-medium transition-all duration-200 ${
                activeTab === item.id 
                  ? "bg-indigo-600/10 text-indigo-400" 
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon className="size-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-indigo-900/40 border border-indigo-500/20 rounded-2xl p-4">
            <p className="text-white font-bold text-sm">Facing Issues?</p>
            <p className="text-indigo-300 text-[10px] mt-1 leading-relaxed">
              Our AI Student Counselor is online to help with applications.
            </p>
            <Button 
              onClick={() => setActiveTab("chat")}
              size="sm" 
              className="w-full mt-3 bg-white text-indigo-950 hover:bg-indigo-50 rounded-lg h-8 text-[11px] font-bold"
            >
              Start Counseling
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> 
              Live: {userProfile?.name || "Ramesh Kumar"}
            </span>
            <span className="text-slate-300">|</span>
            <span>Parent Income: ₹{userProfile?.income?.toLocaleString() || "4,50,000"}</span>
            <span className="text-slate-300">|</span>
            <span>Location: {userProfile?.location || "Haryana"}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex bg-slate-100 rounded-full p-1 text-[10px] font-bold">
              {langs.map((l) => (
                <button 
                  key={l.code}
                  onClick={() => setLanguage(l.code as Language)}
                  className={`px-3 py-1.5 transition-all rounded-full ${
                    language === l.code 
                      ? "bg-white shadow-sm text-indigo-600" 
                      : "text-slate-500 hover:text-indigo-600"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 border-l border-slate-100 pl-6">
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-slate-900 leading-none">Student Profile</p>
                <p className="text-[10px] text-slate-500 font-medium">Verified Account</p>
              </div>
              <div className="size-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 shadow-sm overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile?.name || 'Ramesh'}`} alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 pb-32 lg:pb-8 max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <TabsContent value="dashboard" className="mt-0">
                    <Dashboard 
                      userProfile={userProfile} 
                      applications={activeApplications} 
                      onCheckEligibility={() => setActiveTab("eligibility")}
                      onOpenChat={() => setActiveTab("chat")}
                      onScanNewDocument={() => setActiveTab("scanner")}
                      onViewSchemeDetails={handleOpenSchemeDetails}
                      language={language}
                    />
                  </TabsContent>

                  <TabsContent value="eligibility" className="mt-0">
                    <EligibilityForm 
                      onComplete={(profile) => {
                        setUserProfile(profile);
                        setActiveTab("dashboard");
                      }} 
                    />
                  </TabsContent>

                  <TabsContent value="scanner" className="mt-0">
                    <DocumentScanner language={language} />
                  </TabsContent>

                  <TabsContent value="tracking" className="mt-0">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-xl">
                          <Clock className="size-6 text-indigo-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-slate-900 leading-none">{t.nav.tracking}</h2>
                          <p className="text-slate-500 text-sm mt-1">Real-time status of your submitted requests</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                          <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-bold tracking-widest\">
                            <tr className="border-b border-slate-100">
                              <th className="px-8 py-5">Scheme Name</th>
                              <th className="px-8 py-5">Applied On</th>
                              <th className="px-8 py-5">Status</th>
                              <th className="px-8 py-5">Next Step</th>
                            </tr>
                          </thead>
                          <tbody className="text-sm">
                            {activeApplications.map((app) => (
                              <tr key={app.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-6 font-bold text-slate-800">{app.schemeName}</td>
                                <td className="px-8 py-6 text-slate-500 font-medium">{app.appliedDate}</td>
                                <td className="px-8 py-6">
                                  <Badge variant="outline" className={`${
                                    app.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                                    app.status === 'In Review' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                                    'bg-indigo-50 text-indigo-700 border-indigo-100'
                                  } px-3 py-1 rounded-full font-bold text-[10px]`}>
                                    {app.status}
                                  </Badge>
                                </td>
                                <td className="px-8 py-6 text-indigo-600 font-bold italic text-xs">{app.nextStep}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="chat" className="mt-0">
                    <ChatAssistant language={language} userId={userProfile?.name || "Ramesh"} />
                  </TabsContent>

                  <TabsContent value="library" className="mt-0">
                    <SchemeLibrary onViewDetails={handleOpenSchemeDetails} language={language} />
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </div>
        </div>

        {/* Floating Assistant Trigger for Mobile */}
        <div 
          onClick={() => setActiveTab("chat")}
          className="fixed bottom-24 right-8 lg:bottom-8 lg:right-8 size-14 lg:size-16 bg-indigo-600 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all border-4 border-white z-50 group"
        >
          <MessageSquare className="size-7 lg:size-8 text-white group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 size-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
        </div>

        {/* Bottom Mobile Nav (Labels removed for polish) */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:hidden w-[90%]">
          <div className="h-16 rounded-3xl bg-slate-900 backdrop-blur-xl border border-white/10 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex justify-around items-center">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`rounded-2xl p-3 transition-all ${
                  activeTab === item.id ? "bg-indigo-600 text-white" : "text-slate-400"
                }`}
              >
                <item.icon className="size-6" />
              </button>
            ))}
          </div>
        </div>

        <SchemeDetailsDialog 
          scheme={selectedScheme}
          isOpen={isSchemeDialogOpen}
          onClose={() => setIsSchemeDialogOpen(false)}
          language={language}
        />
      </main>
    </div>
  );
}


