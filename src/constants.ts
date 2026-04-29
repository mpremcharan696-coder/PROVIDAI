/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scheme } from "./types";

export const MOCK_SCHEMES: Scheme[] = [
  {
    id: "scheme_1",
    name: "National Merit Scholarship",
    category: "Academic",
    shortDescription: "Merit-based financial aid for top performers.",
    description: "The National Merit Scholarship provides financial assistance of up to ₹75,000 annually to students who have secured over 90% in their board examinations and come from low-income families.",
    eligibility: [
      "Must be a student enrolled in a recognized board",
      "Annual household income below ₹3,00,000",
      "Must have secured 90%+ in the most recent qualifying exam"
    ],
    benefits: [
      "Annual grant of ₹75,000",
      "Free access to online research libraries",
      "Opportunity for government internship programs"
    ],
    documentation: [
      "Identity Proof (Aadhaar/Student ID)",
      "Educational Transcripts (10th/12th)",
      "Income Certificate",
      "Bank Account Details"
    ],
    procedures: [
      "Verify academic eligibility via StudentProvidAI",
      "Upload verified grade sheets and income proof",
      "Submit application to the State Education Department",
      "Document verification by institutional head",
      "Direct disbursement to student's verified bank account"
    ],
    deadline: "2026-08-31",
    estimatedProcessingTime: "20-40 working days",
    translations: {
      hi: {
        name: "राष्ट्रीय योग्यता छात्रवृत्ति",
        shortDescription: "शीर्ष प्रदर्शन करने वालों के लिए योग्यता आधारित वित्तीय सहायता।",
        description: "यह छात्रवृत्ति बोर्ड परीक्षाओं में 90% से अधिक अंक प्राप्त करने वाले छात्रों को ₹75,000 तक की सहायता प्रदान करती है।",
        procedures: [
          "StudentProvidAI के माध्यम से शैक्षणिक पात्रता सत्यापित करें",
          "सत्यापित ग्रेड शीट और आय प्रमाण अपलोड करें",
          "राज्य शिक्षा विभाग को आवेदन जमा करें",
          "संस्थागत प्रमुख द्वारा दस्तावेज़ सत्यापन",
          "छात्र के सत्यापित बैंक खाते में सीधा वितरण"
        ]
      }
    }
  },
  {
    id: "scheme_2",
    name: "STEM Innovation Grant for Women",
    category: "Science & Tech",
    shortDescription: "Empowering female students in STEM careers.",
    description: "A specialized grant designed to bridge the gender gap in science and technology by providing funding and mentorship to female students pursuing B.Tech, M.B.B.S, or data science programs.",
    eligibility: [
      "Female students enrolled in STEM degree programs",
      "Minimum 70% average across semester exams",
      "First-generation learners are prioritized"
    ],
    benefits: [
      "Full tuition fee coverage up to ₹2,00,000",
      "One-on-one mentorship with industry leaders",
      "Subsidized laptop and research software"
    ],
    documentation: [
      "College Admission Letter",
      "Semester Grade Cards",
      "Income Certificate",
      "Bonafide Student Certificate"
    ],
    procedures: [
      "Submit application with a 'My STEM Goal' essay",
      "Verification of student status by the college",
      "Selection interview with STEM board members",
      "Grant approval and scholarship card issuance"
    ],
    deadline: "2026-09-15",
    estimatedProcessingTime: "30-50 working days"
  },
  {
    id: "scheme_3",
    name: "Global Scholar Support Fund",
    category: "International",
    shortDescription: "Aid for pursuing higher studies in top-ranked global universities.",
    description: "Provides partial tuition support and travel grants for students who have secured admissions to top 500 global universities for postgraduate research.",
    eligibility: [
      "Must have an offer letter from a top 500 QS world university",
      "GRE/GMAT score in the top 10 percentile",
      "IELTS score above 7.5"
    ],
    benefits: [
      "One-time travel grant of ₹1,00,000",
      "Tuition assistance up to ₹5,00,000",
      "Visa counseling and support"
    ],
    documentation: [
      "Passport and Visa application proof",
      "Foreign University Offer Letter",
      "Scorecards (GRE/GMAT/IELTS)",
      "Loan Sanction Letter (if applicable)"
    ],
    procedures: [
      "Apply with admission proof and transcripts",
      "AI-driven validation of university ranking",
      "Verification of financial need",
      "Final approval and disbursement upon visa issuance"
    ],
    deadline: "2026-10-15",
    estimatedProcessingTime: "60 working days"
  },
  {
    id: "scheme_4",
    name: "Digital Literacy & Tech Grant",
    category: "Skill Development",
    shortDescription: "Subsidies for coding bootcamps and tech hardware.",
    description: "Aimed at secondary school students to help them acquire 21st-century skills like AI, Coding, and Cyber Security by funding certifications and hardware.",
    eligibility: [
      "Secondary school students (Class 9-12)",
      "Recommendation from the school principal",
      "Participation in at least one tech competition"
    ],
    benefits: [
      "100% voucher for recognized coding certifications",
      "50% discount on tablet/laptop for educational use",
      "Access to premium tech-learning platforms"
    ],
    documentation: [
      "School ID Card",
      "Recommendation Letter",
      "Competition participation certificate"
    ],
    procedures: [
      "Register via StudentProvidAI tech portal",
      "Submit school principal recommendation",
      "Choose desired certification or device",
      "Receive digital redemption voucher"
    ],
    deadline: "2026-11-30",
    estimatedProcessingTime: "15 working days"
  }
];

