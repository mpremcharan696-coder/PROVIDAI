/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = "en" | "hi" | "te" | "ta" | "bn";

export interface LocalizedScheme {
  name: string;
  description: string;
  shortDescription: string;
  procedures: string[];
}

export interface Scheme {
  id: string;
  name: string;
  category: "Academic" | "Science & Tech" | "International" | "Skill Development" | "Sports" | "Arts";
  description: string;
  shortDescription: string;
  eligibility: string[];
  benefits: string[];
  documentation: string[];
  procedures: string[];
  deadline?: string;
  estimatedProcessingTime: string;
  translations?: Partial<Record<Language, LocalizedScheme>>;
}

export interface UserProfile {
  name: string;
  age: number;
  income: number;
  occupation: string;
  location: string;
  demographics: {
    isHighSchool: boolean;
    isStudent: boolean;
    isMeritHolder: boolean;
    isDifferentlyAbled: boolean;
    familySize: number;
  };
}

export interface ApplicationStatus {
  id: string;
  schemeId: string;
  schemeName: string;
  status: "Pending" | "In Review" | "Action Required" | "Approved" | "Rejected";
  appliedDate: string;
  lastUpdated: string;
  nextStep?: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  language?: Language;
}
