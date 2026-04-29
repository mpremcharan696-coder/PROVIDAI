/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plus, Search, ExternalLink, Clock, CheckCircle2, AlertCircle, FileText, ArrowRight, Sparkles, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { UserProfile, ApplicationStatus, Language, Scheme } from "../types";
import { MOCK_SCHEMES } from "../constants";
import { translations } from "../lib/i18n";

interface DashboardProps {
  userProfile: UserProfile | null;
  applications: ApplicationStatus[];
  onCheckEligibility: () => void;
  onOpenChat: () => void;
  onScanNewDocument: () => void;
  onViewSchemeDetails: (scheme: Scheme) => void;
  language: Language;
}

export default function Dashboard({ userProfile, applications, onCheckEligibility, onOpenChat, onScanNewDocument, onViewSchemeDetails, language }: DashboardProps) {
  const t = translations[language];

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Left Column: Recommendations & Tracking */}
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
        {/* Main Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-indigo-950 p-8 text-white shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-3xl font-bold">{t.dashboard.welcome_back.replace('{name}', userProfile?.name || "Ramesh")}</h2>
              <p className="text-indigo-200 text-lg max-w-md">
                {t.dashboard.tagline} {t.dashboard.found_matches.replace('{count}', '3')}
              </p>
              <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                <Button onClick={onCheckEligibility} className="bg-white text-indigo-950 hover:bg-indigo-50 rounded-xl px-6 py-6 h-auto font-bold border-none shadow-xl transition-transform hover:-translate-y-1">
                  {t.dashboard.check_new} <Plus className="ml-2 size-5" />
                </Button>
                <Button onClick={onOpenChat} variant="outline" className="text-white border-white/20 hover:bg-white/10 rounded-xl px-6 py-6 h-auto font-bold backdrop-blur-md">
                  {t.dashboard.talk_assistant} <ArrowRight className="ml-2 size-5" />
                </Button>
              </div>
            </div>
            <div className="hidden xl:block">
              <div className="size-44 bg-white/10 rounded-3xl p-4 backdrop-blur-xl border border-white/20 rotate-3">
                <div className="size-full bg-indigo-500/20 rounded-2xl flex items-center justify-center animate-pulse">
                  <CheckCircle2 className="size-20 text-indigo-400" />
                </div>
              </div>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-12 -right-12 size-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-12 -left-12 size-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </section>

        {/* Recommended Schemes */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="size-5 text-indigo-600" /> {t.dashboard.recommended}
            </h3>
            <Button variant="link" className="text-indigo-600 font-bold p-0">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_SCHEMES.slice(0, 2).map((scheme, idx) => {
              const localized = (scheme.translations?.[language] as any) || {
                name: scheme.name,
                shortDescription: scheme.shortDescription,
              };

              return (
                <Card key={scheme.id} className="relative overflow-hidden border-indigo-100/50 shadow-sm transition-all hover:shadow-md hover:border-indigo-200 group">
                  <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold rounded-bl-xl ${idx === 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {idx === 0 ? '98% Match' : '82% Match'}
                  </div>
                  <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-lg font-bold group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{localized.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 py-2">
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{localized.shortDescription}</p>
                  </CardContent>
                  <CardFooter className="px-6 py-6 pt-2 flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-indigo-600 hover:bg-indigo-700 text-xs font-bold rounded-lg px-4 h-9"
                      onClick={() => onViewSchemeDetails(scheme)}
                    >
                      Apply Now
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs font-bold rounded-lg px-4 h-9 border-slate-200"
                      onClick={() => onViewSchemeDetails(scheme)}
                    >
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Tracking Summary (Table) */}
        <section>
          <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Clock className="size-5 text-indigo-600" /> {t.dashboard.activity}
          </h3>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-4">Scholarship Name</th>
                  <th className="px-6 py-4">Applied</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {applications.slice(0, 2).map(app => (
                  <tr key={app.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5 font-bold text-slate-800">{app.schemeName}</td>
                    <td className="px-6 py-5 text-slate-500 font-medium">{app.appliedDate}</td>
                    <td className="px-6 py-5">
                      <Badge variant="outline" className={`${
                        app.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                      } px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-tighter`}>
                        {app.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Right Column: Vault & Guide */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
        <Card className="border-slate-200 shadow-sm flex flex-col h-full min-h-[400px]">
          <CardHeader className="flex flex-row items-center justify-between p-6 bg-slate-50/50 border-b border-slate-100">
            <div>
              <CardTitle className="text-lg">{t.vault.title}</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase text-indigo-500 tracking-widest mt-1">{t.vault.verified.replace('{count}', '3')}</CardDescription>
            </div>
            <FileText className="size-6 text-slate-300" />
          </CardHeader>
          <CardContent className="p-6 flex-1 space-y-3 overflow-auto">
            <div className="flex items-center p-3 border border-slate-100 rounded-2xl bg-slate-50 hover:border-indigo-200 transition-colors cursor-pointer group">
              <div className="size-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mr-3 font-bold text-[10px] uppercase group-hover:bg-indigo-600 group-hover:text-white transition-all">PDF</div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-700">Aadhar_Card.pdf</p>
                <p className="font-semibold text-emerald-500 text-[9px] uppercase tracking-widest flex items-center gap-1">
                  <CheckCircle2 className="size-2.5" /> OCR Verified
                </p>
              </div>
            </div>
            <div className="flex items-center p-3 border border-slate-100 rounded-2xl bg-slate-50 hover:border-indigo-200 transition-colors cursor-pointer group">
              <div className="size-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mr-3 font-bold text-[10px] uppercase group-hover:bg-indigo-600 group-hover:text-white transition-all">JPG</div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-700">Income_Cert.jpg</p>
                <p className="font-semibold text-blue-500 text-[9px] uppercase tracking-widest animate-pulse">Extracting Data...</p>
              </div>
              <div className="w-3 h-3 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin shrink-0"></div>
            </div>
            <div 
              onClick={onScanNewDocument}
              className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group mt-4"
            >
              <Plus className="size-5 text-slate-300 mx-auto group-hover:text-indigo-500 transition-colors" />
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">{t.vault.scan_new}</p>
            </div>
          </CardContent>
        </Card>

        <section className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100">
          <h2 className="font-bold flex items-center gap-2 mb-4">
            <Info className="size-5 text-indigo-300" /> Quick Step Guide
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="size-6 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center text-[10px] font-bold border border-indigo-400">1</div>
              <p className="text-xs leading-relaxed font-medium">Verify your student ID & academic transcripts in Digital Locker.</p>
            </div>
            <div className="flex gap-4 opacity-70">
              <div className="size-6 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center text-[10px] font-bold border border-indigo-400">2</div>
              <p className="text-xs leading-relaxed font-medium">AI cross-checks eligibility with national scholarship databases.</p>
            </div>
            <div className="flex gap-4 opacity-70">
              <div className="size-6 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center text-[10px] font-bold border border-indigo-400">3</div>
              <p className="text-xs leading-relaxed font-medium">Submit application directly to the educational board/institution.</p>
            </div>
          </div>
          <Button className="w-full mt-6 py-6 bg-white text-indigo-600 text-xs font-bold rounded-xl hover:bg-indigo-50">
            View Full Procedure
          </Button>
        </section>
      </div>
    </div>
  );
}

