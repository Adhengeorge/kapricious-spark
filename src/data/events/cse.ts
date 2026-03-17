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
    rules: [
      "Individual participation",
      "60 minutes per round",
      "Pre-defined datasets and prompts provided",
      "Best output judged on relevance, creativity, and utility",
      "No internet access beyond the provided tools",
      "Multiple stages: creation, refinement, evaluation"
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
    time: "2:00 PM - 5:30 PM",
    venue: "CCF-1",
    rules: [
      "Individual participation",
      "90-minute timeframe",
      "Codebases in Python, JavaScript, or C++",
      "Each bug has predefined score",
      "Submissions must include fixed file and explanation",
      "More bugs fixed and cleaner patches score higher"
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
    rules: [
      "Individual participation",
      "Only HTML and CSS allowed",
      "No JavaScript or frameworks",
      "Two-hour time limit",
      "Responsive layout required",
      "Judging: aesthetics, structure, responsiveness"
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
    teamSize: 1,
    registrationFee: "₹100 per participant",
    prizePool: "₹3,000",
    details:
      "Assemble a complete working PC from provided components. Points for speed, cable management, and performance tuning.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1591799265444-d66432b91588?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "12:00 PM - 1:30 PM",
    venue: "CCF-2",
    rules: [
      "Individual participants",
      "Components provided on-site",
      "Time limit: 90 minutes",
      "Must boot into BIOS and run basic diagnostics",
      "Presentation on build choices encouraged",
      "Bonus points for cable management and cooling"
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
    teamSize: 1,
    registrationFee: "₹50 per participant",
    prizePool: "₹1,500",
    details:
      "Write chaotic yet functional code. Balance creativity and correctness while embracing unconventional solutions.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "12:00 PM - 12:30 PM",
    venue: "CCF-1",
    rules: [
      "Solo coding challenge",
      "Time limit: 90 minutes",
      "Any programming language allowed",
      "Code must be functional and pass provided tests",
      "Creativity bonus for unique solutions",
      "Judging: functionality, uniqueness, flair"
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
    time: "12:00 PM - 4:00 PM",
    venue: "B309, Whole Campus",
    rules: [
      "Teams of up to four members",
      "60-minute cumulative time limit",
      "No outside help allowed",
      "Solve all puzzles to escape",
      "QR clues will be distributed",
      "Fastest escape wins"
    ],
    highlights: [
      "Immersive puzzle room",
      "Technical and logical challenges",
      "Team collaboration vital",
      "Thrilling timed format"
    ]
  },
  {
    id: "hackathon",
    title: "Hackathon",
    teamSize: 4,
    registrationFee: "₹400 per team",
    prizePool: "₹15,000",
    details:
      "A 12-hour innovation sprint where teams build a working prototype addressing real-world problems.",
    prizes: ["🥇 ₹10,000", "🥈 ₹5,000"],
    type: "team",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop",
    date: "March 26, 2026",
    time: "7:00 AM - 7:00 PM",
    venue: "Hack Lab, KMEA Engineering College",
    rules: [
      "Teams of up to four members",
      "12-hour hack window",
      "Problem statement announced at kickoff",
      "Working prototype mandatory",
      "Any tech stack allowed",
      "Judge on innovation, implementation, presentation"
    ],
    highlights: [
      "Full-day coding marathon",
      "Build real-world solutions",
      "Mentors on standby",
      "Biggest prizes of the fest"
    ]
  }
];
