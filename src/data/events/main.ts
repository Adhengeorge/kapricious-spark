import { DepartmentEvent } from "./types";

export const mainEvents: DepartmentEvent[] = [
  {
    id: "fashion-show",
    title: "Fashion Show",
    teamSize: 10,
    registrationFee: "₹250 per head",
    prizePool: "₹75,000",
    details:
      "Showcase themed fashion collections with choreography, music, and styling on the main stage runway.",
    prizes: ["🥇 ₹50,000", "🥈 ₹25,000"],
    type: "team",
    department: "CULTURAL",
    departmentName: "Cultural Events",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "6:00 PM - 8:00 PM",
    venue: "Main Auditorium, KMEA Engineering College",
    rules: [
      "Teams of 8-12 members",
      "Theme must be declared during registration",
      "Performance duration: 8-12 minutes",
      "Costumes and props are team responsibility",
      "No vulgar or offensive content",
      "Judging: theme, costumes, choreography, overall impact"
    ],
    highlights: [
      "Grand runway setup",
      "Professional light and sound",
      "High-visibility main stage slot",
      "Largest stage prize pool"
    ]
  },
  {
    id: "group-dance",
    title: "Group Dance",
    teamSize: 8,
    registrationFee: "₹250 per head",
    prizePool: "₹75,000",
    details:
      "Bring the stage alive with synchronized choreography across classical, western, fusion, or folk formats.",
    prizes: ["🥇 ₹50,000", "🥈 ₹25,000"],
    type: "team",
    department: "CULTURAL",
    departmentName: "Cultural Events",
    image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "4:00 PM - 6:00 PM",
    venue: "Main Auditorium, KMEA Engineering College",
    rules: [
      "Teams of 6-10 members",
      "Performance duration: 5-8 minutes",
      "Any dance style allowed",
      "Props allowed with limited setup time",
      "No fire, water, or hazardous materials",
      "Judging: choreography, synchronization, expression, costumes"
    ],
    highlights: [
      "All dance styles welcome",
      "Pro-stage audio setup",
      "High-energy audience slot",
      "Top-tier team prizes"
    ]
  },
  {
    id: "step-in-synchro",
    title: "Step in Synchro",
    teamSize: 4,
    registrationFee: "₹200",
    prizePool: "₹8,000",
    details:
      "A synchronization challenge where teams perform in perfect unison and timing under fixed music cues.",
    prizes: ["🥇 ₹5,000", "🥈 ₹3,000"],
    type: "team",
    department: "CULTURAL",
    departmentName: "Cultural Events",
    image: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 4:00 PM",
    venue: "Open Air Stage, KMEA Engineering College",
    rules: [
      "Teams of 4 members",
      "Performance duration: 3-5 minutes",
      "All members must maintain synchronized movement",
      "Background track will be provided",
      "No props allowed",
      "Judging: synchronization, creativity, energy"
    ],
    highlights: [
      "Precision choreography format",
      "Fast, high-intensity rounds",
      "Strong crowd engagement",
      "Dedicated sync-scoring panel"
    ]
  },
  {
    id: "spot-photography",
    title: "Spot Photography",
    teamSize: 1,
    registrationFee: "₹100",
    prizePool: "₹3,000",
    details:
      "Capture the fest through your lens after an on-spot theme reveal and submit your best framed shots.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "CULTURAL",
    departmentName: "Cultural Events",
    image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 1:00 PM",
    venue: "Campus Wide, KMEA Engineering College",
    rules: [
      "Individual participation",
      "Theme announced at event start",
      "Bring your own camera or smartphone",
      "Submit best 3 photos only",
      "Basic color correction allowed",
      "Judging: creativity, theme relevance, technical quality"
    ],
    highlights: [
      "On-spot theme challenge",
      "Open format camera participation",
      "Campus photo trails",
      "Curated jury review"
    ]
  },
  {
    id: "star-of-kapricious",
    title: "Star of Kapricious",
    teamSize: 1,
    registrationFee: "₹250",
    prizePool: "₹15,000",
    details:
      "A grand talent showcase where individuals perform singing, dancing, standup, instrumental, or any unique act on the main stage.",
    prizes: ["🥇 ₹10,000", "🥈 ₹5,000"],
    type: "individual",
    department: "CULTURAL",
    departmentName: "Cultural Events",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "5:00 PM - 8:00 PM",
    venue: "Main Auditorium, KMEA Engineering College",
    rules: [
      "Individual participation only",
      "Any talent welcome: singing, dancing, comedy, instruments, etc.",
      "Performance duration: 3-5 minutes",
      "Bring your own instruments or props",
      "Pre-recorded tracks allowed for singers",
      "Judging: talent (40%), stage presence (30%), audience engagement (30%)"
    ],
    highlights: [
      "Grand stage with pro lighting",
      "Celebrity judges",
      "Showcase any talent",
      "Biggest individual prize"
    ]
  }
];
