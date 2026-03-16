import { DepartmentEvent } from "./types";

export const sfEvents: DepartmentEvent[] = [
  {
    id: "hazard-huzzle",
    title: "Hazard Huzzle – Safety Quiz",
    teamSize: 2,
    registrationFee: "₹100 per team",
    prizePool: "₹2,500",
    details:
      "A quiz focused on fire safety, industrial protocols, and hazard management. Teams compete across multiple rounds for accuracy and speed.",
    prizes: ["🥇 ₹2,000", "🥈 ₹500"],
    type: "team",
    department: "SF",
    departmentName: "Safety & Fire Engineering",
    image: "https://images.unsplash.com/photo-1581092921461-eab10380b1fb?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "9:00 AM - 11:00 AM",
    venue: "Fire Safety Lab, KMEA Engineering College",
    rules: [
      "Teams of two members",
      "Multiple rounds: written, buzzer, rapid fire",
      "Topics: fire codes, PPE, hazard mitigation",
      "No electronic devices allowed",
      "Negative marking for incorrect answers",
      "Final buzzer tie-breaker if needed"
    ],
    highlights: [
      "Technical safety focus",
      "Fast-paced buzzer rounds",
      "Team coordination",
      "Industry-relevant questions"
    ]
  },
  {
    id: "safety-verdict",
    title: "The Safety Verdict – Technical Debate",
    teamSize: 3,
    registrationFee: "₹100 per team",
    prizePool: "₹3,500",
    details:
      "Structured debate on fire safety policies, emergency preparedness, and compliance standards.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,500"],
    type: "team",
    department: "SF",
    departmentName: "Safety & Fire Engineering",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "11:30 AM - 1:30 PM",
    venue: "Seminar Hall, KMEA Engineering College",
    rules: [
      "Teams of three speakers",
      "Topics shared 30 minutes before debate",
      "Each speaker gets 5 minutes",
      "Rebuttal round of 3 minutes",
      "Maintain decorum throughout",
      "Judging: content, delivery, teamwork"
    ],
    highlights: [
      "Develop public speaking",
      "Debate industry topics",
      "Structured format",
      "Coach-supported practice"
    ]
  },
  {
    id: "insight",
    title: "Insight – Poster/Paper Presentation",
    teamSize: 4,
    registrationFee: "₹100 per team",
    prizePool: "₹3,500",
    details:
      "Present research or case studies in fire and safety through posters or papers evaluated by experts.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,500"],
    type: "team",
    department: "SF",
    departmentName: "Safety & Fire Engineering",
    image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "2:00 PM - 4:30 PM",
    venue: "Conference Hall, KMEA Engineering College",
    rules: [
      "Teams of up to four members",
      "Topic must relate to fire or safety",
      "Poster size: standard A1",
      "Presentation time: 10 minutes + 5 minutes Q&A",
      "Original work only",
      "Judging: content, presentation, innovation"
    ],
    highlights: [
      "Showcase research",
      "Expert panel feedback",
      "Networking opportunity",
      "Certificates for presenters"
    ]
  },
  {
    id: "rescue-raid",
    title: "Rescue Raid – Emergency Drill",
    teamSize: 4,
    registrationFee: "₹250 per team",
    prizePool: "₹7,000",
    details:
      "Simulated emergency drill where teams respond to hazards, evacuate victims, and demonstrate safety protocols.",
    prizes: ["🥇 ₹4,000", "🥈 ₹3,000"],
    type: "team",
    department: "SF",
    departmentName: "Safety & Fire Engineering",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "3:00 PM - 5:30 PM",
    venue: "Fire Safety Grounds, KMEA Engineering College",
    rules: [
      "Teams of four members",
      "Follow instructions from safety coordinators",
      "Complete rescue simulations under time pressure",
      "PPE must be worn",
      "Judging: coordination, timing, protocol adherence",
      "Safety violation leads to penalties"
    ],
    highlights: [
      "Realistic emergency drill",
      "Hands-on rescue",
      "Team coordination",
      "Industry-standard procedures"
    ]
  },
  {
    id: "hazard-hunt",
    title: "Hazard Hunt – Hazard Identification",
    teamSize: 4,
    registrationFee: "₹250 per team",
    prizePool: "₹4,500",
    details:
      "Scan a simulated workplace, spot hazards, and document control measures within the time limit.",
    prizes: ["🥇 ₹3,000", "🥈 ₹1,500"],
    type: "team",
    department: "SF",
    departmentName: "Safety & Fire Engineering",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 12:30 PM",
    venue: "Workshop Area, KMEA Engineering College",
    rules: [
      "Teams of four members",
      "Complete hazard walk-down",
      "Document hazards with proposed controls",
      "Time limit: 90 minutes",
      "No electronic devices during inspection",
      "Judging: accuracy, completeness, mitigation"
    ],
    highlights: [
      "Practical safety assessment",
      "Learn hazard identification",
      "Team-based field work",
      "Valuable for industry exposure"
    ]
  },
  {
    id: "gear-up-challenge",
    title: "Gear Up Challenge – PPE Race",
    teamSize: 2,
    registrationFee: "₹100 per team",
    prizePool: "₹1,750",
    details:
      "Teams race to correctly don full PPE kits while following safety checklists and time goals.",
    prizes: ["🥇 ₹1,000", "🥈 ₹750"],
    type: "team",
    department: "SF",
    departmentName: "Safety & Fire Engineering",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "1:00 PM - 2:30 PM",
    venue: "Fire Training Arena, KMEA Engineering College",
    rules: [
      "Teams of two members",
      "Don all PPE components correctly",
      "Time penalties for mistakes",
      "One attempt per round",
      "Judging: speed + accuracy",
      "Safety briefing mandatory"
    ],
    highlights: [
      "Speed meets safety",
      "Learn correct PPE usage",
      "Fun and educational",
      "Quick elimination rounds"
    ]
  }
];
