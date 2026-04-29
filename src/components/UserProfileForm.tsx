import { useState } from "react";
import { UserProfile, Language } from "../types";
import { translations } from "../lib/i18n";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { User, MapPin, Briefcase, Wallet, Calendar, Users, Save } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface UserProfileFormProps {
  initialProfile: UserProfile | null;
  onSave: (profile: UserProfile) => void;
  language: Language;
}

export default function UserProfileForm({ initialProfile, onSave, language }: UserProfileFormProps) {
  const t = translations[language];
  const p = t.profile;

  const [formData, setFormData] = useState<UserProfile>(initialProfile || {
    name: "",
    age: 0,
    income: 0,
    occupation: "",
    location: "",
    demographics: {
      isHighSchool: false,
      isStudent: false,
      isMeritHolder: false,
      isDifferentlyAbled: false,
      familySize: 1
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleFamilySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setFormData(prev => ({
      ...prev,
      demographics: {
        ...prev.demographics,
        familySize: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto py-8"
    >
      <form onSubmit={handleSubmit}>
        <Card className="border-slate-200 shadow-xl rounded-3xl overflow-hidden bg-white">
          <CardHeader className="p-8 bg-indigo-600 text-white">
            <CardTitle className="text-2xl font-black flex items-center gap-3">
              <User className="size-8" /> {p.title}
            </CardTitle>
            <CardDescription className="text-indigo-100">
              {p.onboarding_subtitle}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <User className="size-3" /> {p.name}
                </Label>
                <Input 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="rounded-xl border-slate-200 h-12 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <Calendar className="size-3" /> {p.age}
                </Label>
                <Input 
                  name="age"
                  type="number"
                  value={formData.age || ""}
                  onChange={handleChange}
                  placeholder="25"
                  className="rounded-xl border-slate-200 h-12 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <Wallet className="size-3" /> {p.income}
                </Label>
                <Input 
                  name="income"
                  type="number"
                  value={formData.income || ""}
                  onChange={handleChange}
                  placeholder="7,00,000"
                  className="rounded-xl border-slate-200 h-12 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <Briefcase className="size-3" /> {p.occupation}
                </Label>
                <Input 
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="e.g. Teacher, Farmer"
                  className="rounded-xl border-slate-200 h-12 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <MapPin className="size-3" /> {p.location}
                </Label>
                <Input 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Telangana, Hyderabad"
                  className="rounded-xl border-slate-200 h-12 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <Users className="size-3" /> {p.family_size}
                </Label>
                <Input 
                  name="familySize"
                  type="number"
                  value={formData.demographics.familySize}
                  onChange={handleFamilySizeChange}
                  className="rounded-xl border-slate-200 h-12 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-12 py-6 font-bold text-lg h-auto shadow-lg shadow-indigo-100">
              <Save className="mr-2 size-5" /> {initialProfile ? p.save : p.get_started}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </motion.div>
  );
}
