import { DepartmentEvent } from "./types";

export const sfEvents: DepartmentEvent[] = [
  {
    id: "emergency-drill",
    title: "Emergency Drill",
    teamSize: 4,
    registrationFee: "₹250 per team",
    prizePool: "₹7,000",
    details: "A practical emergency response simulation testing team coordination, quick thinking, and safety protocols.",
    prizes: ["🥇 ₹4,000", "🥈 ₹3,000"],
    type: "team",
    department: "SF",
    departmentName: "Fire & Safety",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "9:00 AM - 12:00 PM",
    venue: "Fire Safety Lab, KMEA Engineering College",
    rules: [
      "Teams of up to 4 members",
      "Follow all safety instructions",
      "Complete emergency response within time limit",
      "Proper PPE must be worn throughout",
      "Judging based on response time and accuracy",
      "Decision of judges is final"
    ],
    highlights: [
      "Real emergency simulation",
      "Hands-on safety training",
      "Industry-standard equipment",
      "Certificates for all participants"
    ]
  },
  {
    id: "hazard-hunt",
    title: "Hazard Hunt",
    teamSize: 4,
    registrationFee: "₹250 per team",
    prizePool: "₹4,500",
    details: "Identify and assess workplace hazards in a simulated environment to demonstrate safety awareness.",
    prizes: ["🥇 ₹2,500", "🥈 ₹2,000"],
    type: "team",
    department: "SF",
    departmentName: "Fire & Safety",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 4:00 PM",
    venue: "Workshop Area, KMEA Engineering College",
    rules: [
      "Teams of up to 4 members",
      "Identify all hazards in the given area",
      "Document hazards with proper assessment",
      "Time limit: 45 minutes",
      "Most accurate assessment wins",
      "No electronic devices during hunt"
    ],
    highlights: [
      "Real workplace simulation",
      "Learn hazard identification",
      "Practical safety training",
      "Great team building exercise"
    ]
  },
  {
    id: "ppe-race",
    title: "PPE Race",
    teamSize: 2,
    registrationFee: "₹100 per team",
    prizePool: "₹1,750",
    details: "A fast-paced competition to correctly don personal protective equipment in record time.",
    prizes: ["🥇 ₹1,000", "🥈 ₹750"],
    type: "team",
    department: "SF",
    departmentName: "Fire & Safety",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 11:30 AM",
    venue: "Fire Safety Lab, KMEA Engineering College",
    rules: [
      "Teams of 2 members",
      "Don complete PPE kit correctly",
      "Fastest team with correct donning wins",
      "Incorrect donning results in penalty",
      "Multiple rounds with elimination",
      "All PPE will be provided"
    ],
    highlights: [
      "Speed-based competition",
      "Learn correct PPE usage",
      "Fun and educational",
      "Exciting finals"
    ]
  },
  {
    id: "safety-quiz",
    title: "Safety Quiz",
    teamSize: 2,
    registrationFee: "₹100 per team",
    prizePool: "₹2,500",
    details: "Test your knowledge of fire safety, industrial safety, and emergency protocols.",
    prizes: ["🥇 ₹1,500", "🥈 ₹1,000"],
    type: "team",
    department: "SF",
    departmentName: "Fire & Safety",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "Seminar Hall, KMEA Engineering College",
    rules: [
      "Teams of 2 members",
      "Multiple rounds: written, rapid fire, and buzzer",
      "Questions on fire safety, industrial safety, and protocols",
      "No electronic devices allowed",
      "Highest cumulative score wins",
      "Tie-breaker round if needed"
    ],
    highlights: [
      "Multi-round quiz format",
      "Comprehensive safety topics",
      "Exciting buzzer round",
      "Learn while competing"
    ]
  },
  {
    id: "poster-paper-presentation",
    title: "Poster/Paper Presentation Competition",
    teamSize: 4,
    registrationFee: "₹100 per team",
    prizePool: "₹3,500",
    details: "Present innovative ideas and research in fire and safety through posters or papers.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,500"],
    type: "team",
    department: "SF",
    departmentName: "Fire & Safety",
    image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "Conference Hall, KMEA Engineering College",
    rules: [
      "Teams of up to 4 members",
      "Topic must be related to fire and safety",
      "Poster size: A1 standard",
      "Presentation time: 10 minutes + 5 minutes Q&A",
      "Original work only, plagiarism will disqualify",
      "Judging: Content (40%), Presentation (30%), Innovation (30%)"
    ],
    highlights: [
      "Showcase your research",
      "Expert panel evaluation",
      "Networking opportunity",
      "Certificate of presentation"
    ]
  },
  {
    id: "technical-debate",
    title: "Technical Debate",
    teamSize: 3,
    registrationFee: "₹150 per team",
    prizePool: "₹3,500",
    details: "Engage in structured debates on fire safety, regulations, and industry practices.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,500"],
    type: "team",
    department: "SF",
    departmentName: "Fire & Safety",
    image: "https://images.unsplash.com/photo-1475721027785-f74ec9c0bc26?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "3:00 PM - 6:00 PM",
    venue: "Seminar Hall, KMEA Engineering College",
    rules: [
      "Teams of 3 members",
      "Topics will be given 30 minutes before debate",
      "Each speaker gets 5 minutes",
      "Rebuttal round of 3 minutes per team",
      "Judging: Content, Delivery, Rebuttals, Teamwork",
      "Maintain decorum throughout"
    ],
    highlights: [
      "Structured debate format",
      "Develop public speaking skills",
      "Learn industry perspectives",
      "Exciting knockout rounds"
    ]
  }
];
