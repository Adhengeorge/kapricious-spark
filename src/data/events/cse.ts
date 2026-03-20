import { DepartmentEvent } from "./types";

export const cseEvents: DepartmentEvent[] = [
  {
    id: "prompt-wars",
    title: "Prompt Wars",
    teamSize: 1,
    registrationFee: "₹100 per participant",
    prizePool: "₹3,000",
    details:
      "Engineering creative prompts to generate the best AI output under specific constraints. Judges evaluate precision, clarity, and results.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "11:30 AM - 12:30 PM",
    venue: "CCF-1",
    coordinators: [
      {
        name: "Jalwa",
        phone: "+91 6282 029 545",
      },
      {
        name: "Sumayya M A",
        phone: "+91 73064 77547",
      },
    ],
    rules: [
      "Event is open to all registered tech fest participants",
      "Participants must participate individually",
      "Total event duration: 60 minutes",
      "The competition will have two rounds",
      "Prompts must be created using the provided AI tool and model only",
      "Round 1 - Image Generation: task/theme will be given",
      "Round 1 time: 30 minutes",
      "Top participants from Round 1 advance to Round 2",
      "Round 2 - Video Generation: new task/theme will be given",
      "Round 2 time: 30 minutes",
      "Prompts must be created during the competition",
      "Copying prompts or unfair practices are not allowed",
      "Participants must submit both the prompt and the AI-generated output",
      "Winners are selected based on prompt clarity, creativity, and quality of AI output",
      "Judges' decision is final"
    ],
    highlights: [
      "Master prompt engineering",
      "Work with generative AI",
      "Tight technical constraints",
      "Judged by AI experts"
    ]
  },
  {
    id: "bug-bounty",
    title: "Bug Bounty",
    teamSize: 1,
    registrationFee: "₹50 per participant",
    prizePool: "₹1,500",
    details:
      "Participants hunt and patch bugs in provided code. Speed, accuracy, and clean fixes determine the winners.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "2:00 PM - 3:30 PM",
    venue: "CCF-1",
    coordinators: [
      {
        name: "Fathima A A",
        phone: "+91 6282 139 252",
      },
      {
        name: "Fidha Nowrin E M",
        phone: "+91 94971 97808",
      },
    ],
    rules: [
      "Individual participation only",
      "College ID is mandatory",
      "Participants must register before the event begins",
      "Participants can choose Python, C, C++, or Java",
      "Buggy code will be provided during the event",
      "Participants must identify and fix the errors",
      "The event consists of one debugging round only",
      "Participants must correct the given program within the time limit",
      "Code must be submitted before time ends",
      "System with compiler/IDE will be provided",
      "Internet access is not allowed",
      "AI tools (ChatGPT, Copilot, Gemini, etc.) are strictly prohibited",
      "Use of AI assistance will result in disqualification",
      "The corrected program must compile and run successfully",
      "Late submissions will not be accepted",
      "Judging: accuracy of corrected code, number of bugs fixed, time taken",
      "Participants must work individually; discussion or copying is not allowed",
      "Participant who fixes the maximum bugs correctly in the shortest time wins"
    ],
    highlights: [
      "Real debugging experience",
      "Multiple languages",
      "Score by efficiency",
      "Platform-agnostic challenges"
    ]
  },
  {
    id: "css-royale",
    title: "CSS Royale",
    teamSize: 1,
    registrationFee: "₹50 per participant",
    prizePool: "₹1,500",
    details:
      "Design a visually striking layout using only HTML and CSS. Judges look for creativity, responsiveness, and mastery of modern CSS techniques.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "11:30 AM - 12:30 PM",
    venue: "CCF-3",
    coordinators: [
      {
        name: "Shamon",
        phone: "+91 85904 21852",
      },
      {
        name: "Hiba",
        phone: "+91 81388 61398",
      },
    ],
    rules: [
      "Only HTML and CSS are allowed",
      "JavaScript is strictly prohibited",
      "CSS frameworks like Bootstrap or Tailwind are not allowed",
      "You may use Flexbox, Grid, Animations, and Transitions",
      "Internet usage allowed only for documentation (optional)",
      "Code must be written during the event",
      "Plagiarism leads to disqualification",
      "Each participant must submit before the time limit",
      "Total time allowed: 90 minutes",
      "Students must carry their college ID",
      "Decision of the judge will be final",
      "Individual participation only"
    ],
    highlights: [
      "Pure CSS creativity",
      "Responsive design challenge",
      "Ideal for frontenders",
      "Showcase your design skills"
    ]
  },
  {
    id: "build-a-pc",
    title: "Build a PC",
    teamSize: 2,
    registrationFee: "₹100 per team",
    prizePool: "₹3,000",
    details:
      "Assemble a complete working PC from provided components. Points for speed, cable management, and performance tuning.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "team",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1591799265444-d66432b91588?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 12:30 PM",
    venue: "Project Lab",
    coordinators: [
      {
        name: "Nebhan",
        phone: "+91 80893 70247",
      },
      {
        name: "Yaseen",
        phone: "+91 95622 76865",
      },
    ],
    rules: [
      "Participation can be individual or a team of 2 members",
      "Each team will receive the same set of components",
      "Time limit: 25-30 minutes",
      "Components provided: motherboard, CPU, RAM, SMPS/power supply, storage (SSD/HDD), cabinet, required cables",
      "Participants must identify the faulty component through testing and troubleshooting",
      "Once identified, inform the event coordinator/judge for replacement",
      "Only one component will be faulty in the kit",
      "Teams must correctly identify the faulty component before requesting replacement",
      "Incorrect replacement requests may result in a time penalty",
      "Properly install all components and connect cables",
      "Assemble the system inside the cabinet",
      "PC must successfully power on; BIOS/POST screen should appear",
      "Mobile phones, internet, and external help are not allowed",
      "Handle components carefully; intentional damage leads to disqualification",
      "Team that identifies the faulty component and completes assembly in the least time wins"
    ],
    highlights: [
      "Hands-on hardware skill",
      "Build and tune PCs",
      "Judged on performance",
      "Great for engineering portfolios"
    ]
  },
  {
    id: "code-catastrophe",
    title: "Code Catastrophe",
    teamSize: 2,
    registrationFee: "₹50 per team",
    prizePool: "₹1,500",
    details:
      "Write chaotic yet functional code. Balance creativity and correctness while embracing unconventional solutions.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "team",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 11:30 AM",
    venue: "CCF-1",
    coordinators: [
      {
        name: "Althaf",
        phone: "+91 94973 13095",
      },
      {
        name: "Amaan",
        phone: "+91 62384 63869",
      },
    ],
    rules: [
      "Program must compile and run successfully",
      "Output should be correct according to the problem statement",
      "Any programming language allowed (C, C++, Java, Python, etc.)",
      "Participants may compete individually or in teams of up to 2 members",
      "Internet usage is strictly restricted",
      "Plagiarism or copying code from others leads to disqualification",
      "Code should intentionally use poor coding practices",
      "Make the code long, complex, and hard to read while producing correct output",
      "Avoid built-in shortcuts; use unnecessarily complicated logic",
      "Judges' decision will be final in selecting the worst (best) code"
    ],
    highlights: [
      "Fun coding format",
      "Break conventions intentionally",
      "Creative and functional",
      "Unique prize categories"
    ]
  },
  {
    id: "tech-escape-room",
    title: "Realm Of Secrets",
    teamSize: 4,
    registrationFee: "₹200 per team",
    prizePool: "₹5,000",
    details:
      "Enter a world where mystery meets technology. In the Realm of Secrets, hidden clues, encrypted codes, and digital puzzles challenge your logic and creativity. Use your mind to decode, hack, and uncover the truth. Will you escape... or become part of the secret?",
    prizes: ["🥇 ₹3,000", "🥈 ₹2,000"],
    type: "team",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "1:30 PM - 4:30 PM",
    venue: "Whole Campus",
    contact: {
      name: "Kadheeja Afnaan / Muhammed Jabir",
      phone: "8714494129 / 7902520118",
    },
    coordinators: [
      {
        name: "Jabir",
        phone: "+91 79025 20118",
      },
      {
        name: "Afnan",
        phone: "+91 87144 94129",
      },
    ],
    rules: [
      "Minimum 2 members required to register; up to 4 members per team",
      "Carry valid college ID and report 15 minutes early",
      "Teams must stay together and follow clues in order",
      "Phones are allowed only for QR scanning",
      "No skipping, cheating, copying, or entering restricted areas",
      "Follow campus rules, safety instructions, and coordinator directions",
      "First team to finish wins",
      "Judges' decision is final"
    ],
    highlights: [
      "Immersive treasure hunt experience",
      "Cryptic clues and hidden secrets",
      "Technical and logical challenges",
      "Team collaboration is key",
      "Thrilling timed format"
    ]
  },
  {
    id: "hackathon",
    title: "BuildX'26 - Hackathon",
    teamSize: 4,
    registrationFee: "₹400 per team",
    prizePool: "₹15,000",
    details:
      "An overnight 12-hour innovation sprint where teams build a working prototype addressing real-world problems.",
    prizes: ["🥇 ₹10,000", "🥈 ₹5,000"],
    type: "team",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop",
    date: "March 26-27, 2026",
    time: "7:00 PM (Mar 26) - 7:00 AM (Mar 27)",
    venue: "Hack Lab, KMEA Engineering College",
    contact: {
      name: "Adhen Sara / Adhil Salam / Akif Anvar",
      phone: "9188398779 / 9496672970 / 9744832367",
    },
    rules: [
      "Teams must have 2 to 4 members, and only registered participants can compete",
      "All participants must report by 5:00 PM and remain present throughout the 12-hour hackathon",
      "Problem statements will be released at the start, and each team may choose only one",
      "Any programming language, framework, platform, open-source library, API, or public tool may be used",
      "Plagiarism, copying existing solutions, misconduct, or unfair practices will lead to disqualification",
      "Final presentation and demo time is limited to 10 minutes per team",
      "All team members must participate in the final presentation",
      "Judges will evaluate only during the final stage, and their decision will be final"
    ],
    highlights: [
      "Overnight coding marathon",
      "Build real-world solutions",
      "Mentors on standby",
      "Biggest prizes of the fest"
    ]
  }
];
