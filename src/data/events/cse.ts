import { DepartmentEvent } from "./types";

export const cseEvents: DepartmentEvent[] = [
  {
    id: "prompt-wars",
    title: "Prompt Wars",
    teamSize: 1,
    registrationFee: "₹50",
    prizePool: "₹3,000",
    details: "Participants craft optimized prompts to generate the best AI output under given constraints.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 12:00 PM",
    venue: "Computer Lab, KMEA Engineering College",
    rules: [
      "Individual participation",
      "Time limit: 60 minutes",
      "Multiple AI tasks will be given",
      "Best prompt engineering wins",
      "ChatGPT/Gemini will be used",
      "Judging: Accuracy, Creativity, Efficiency"
    ],
    highlights: [
      "Learn AI prompting",
      "Latest AI technology",
      "Industry-relevant skill",
      "Exciting challenges"
    ]
  },
  {
    id: "bug-bounty",
    title: "Bug Bounty",
    teamSize: 1,
    registrationFee: "₹50",
    prizePool: "₹3,000",
    details: "Participants fix buggy code within a time limit.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "Computer Lab, KMEA Engineering College",
    rules: [
      "Individual participation",
      "Time limit: 90 minutes",
      "Code in Python/Java/C++",
      "Fix all bugs to score",
      "More bugs fixed = More points",
      "Fastest correct solution wins"
    ],
    highlights: [
      "Real-world debugging",
      "Multiple languages",
      "Test your skills",
      "Great practice"
    ]
  },
  {
    id: "css-royale",
    title: "CSS Royale",
    teamSize: 1,
    registrationFee: "₹50",
    prizePool: "₹3,000",
    details: "Design a visually appealing webpage using only HTML & CSS.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 4:00 PM",
    venue: "Computer Lab, KMEA Engineering College",
    rules: [
      "Individual participation",
      "Only HTML & CSS allowed",
      "No JavaScript",
      "Time limit: 2 hours",
      "Design given at start",
      "Judging: Visual accuracy, Creativity, Code quality"
    ],
    highlights: [
      "Pure CSS challenge",
      "No frameworks",
      "Test frontend skills",
      "Portfolio material"
    ]
  },
  {
    id: "no-run-ninja",
    title: "NO-Run Ninja",
    teamSize: 1,
    registrationFee: "₹50",
    prizePool: "₹3,000",
    details: "Participants write code without compiling or running it.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 11:30 AM",
    venue: "Computer Lab, KMEA Engineering College",
    rules: [
      "Individual participation",
      "No running/compiling allowed",
      "Paper-based submission",
      "Code must be logically correct",
      "Time limit: 60 minutes",
      "Judging by expert panel"
    ],
    highlights: [
      "Test logical thinking",
      "Pure coding skill",
      "No debugging allowed",
      "Mental challenge"
    ]
  },
  {
    id: "code-catastrophe",
    title: "Code Catastrophe",
    teamSize: 1,
    registrationFee: "₹50",
    prizePool: "₹3,000",
    details: "Write the most chaotic but functional code. Creativity in confusion wins.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "3:00 PM - 4:30 PM",
    venue: "Computer Lab, KMEA Engineering College",
    rules: [
      "Individual participation",
      "Code must work correctly",
      "More chaotic = More points",
      "Time limit: 90 minutes",
      "Any language allowed",
      "Judging: Chaos level, Creativity, Functionality"
    ],
    highlights: [
      "Fun coding challenge",
      "Break all conventions",
      "Creative coding",
      "Unique competition"
    ]
  },
  {
    id: "tech-escape-room",
    title: "TECH ESCAPE ROOM",
    teamSize: 4,
    registrationFee: "₹200 per team",
    prizePool: "₹6,000",
    details: "A QR-based interactive technical escape challenge where teams solve encryption, debugging, and logic puzzles to regain system control within 60 minutes.",
    prizes: ["🥇 ₹4,000", "🥈 ₹2,000"],
    type: "team",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "CSE Department, KMEA Engineering College",
    rules: [
      "Teams of up to 4 members",
      "60 minutes time limit",
      "Solve all puzzles to escape",
      "QR codes for clues",
      "No external help",
      "Fastest escape wins"
    ],
    highlights: [
      "Immersive experience",
      "Technical puzzles",
      "Team collaboration",
      "Thrilling challenge"
    ]
  },
  {
    id: "hackathon",
    title: "Hackathon",
    teamSize: 4,
    registrationFee: "₹200",
    prizePool: "₹15,000",
    details: "A team-based innovation challenge where participants build a working prototype within a fixed duration.",
    prizes: ["🥇 ₹10,000", "🥈 ₹5,000"],
    type: "team",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "9:00 AM - 9:00 PM",
    venue: "Computer Lab Complex, KMEA Engineering College",
    rules: [
      "Teams of up to 4 members",
      "12-hour coding marathon",
      "Problem statement at start",
      "Working prototype required",
      "Any tech stack allowed",
      "Judging: Innovation, Implementation, Presentation"
    ],
    highlights: [
      "Full-day hackathon",
      "Build real projects",
      "Mentorship available",
      "Biggest prize pool"
    ]
  }
];
