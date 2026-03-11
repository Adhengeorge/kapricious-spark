import { DepartmentEvent } from "./types";

export const culturalEvents: DepartmentEvent[] = [
  {
    id: "fashion-show",
    title: "Fashion Show",
    teamSize: 10,
    registrationFee: "₹250 per head",
    prizePool: "₹75,000",
    details: "Showcase your creativity and style on the grand runway. Teams present themed fashion collections with coordinated choreography, music, and stunning outfits.",
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
      "Theme must be disclosed during registration",
      "Performance duration: 8-12 minutes",
      "Costumes and props are team's responsibility",
      "No vulgarity or offensive content",
      "Music tracks to be submitted 2 days before",
      "Judging: Theme (25%), Costumes (25%), Choreography (25%), Overall Impact (25%)"
    ],
    highlights: [
      "Grand runway setup",
      "Professional lighting & sound",
      "Showcase your creativity",
      "Massive prize pool"
    ]
  },
  {
    id: "group-dance",
    title: "Group Dance",
    teamSize: 8,
    registrationFee: "₹250 per head",
    prizePool: "₹75,000",
    details: "Bring the stage alive with synchronized moves and electrifying performances. Any dance form welcome - classical, western, fusion, or folk.",
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
      "Any dance form allowed",
      "Props allowed but setup time limited",
      "Music track to be submitted beforehand",
      "No fire, water, or hazardous materials",
      "Judging: Choreography (30%), Synchronization (30%), Expression (20%), Costumes (20%)"
    ],
    highlights: [
      "All dance forms welcome",
      "Professional sound system",
      "Stage lighting effects",
      "Exciting performances"
    ]
  },
  {
    id: "step-in-synchro",
    title: "Step in Synchro",
    teamSize: 4,
    registrationFee: "₹200",
    prizePool: "₹8,000",
    details: "A unique synchronization challenge where teams perform choreographed steps in perfect unison. Precision and timing are key to victory.",
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
      "All members must perform identical steps",
      "Background music will be provided",
      "No props allowed",
      "Judging: Synchronization (50%), Creativity (25%), Energy (25%)"
    ],
    highlights: [
      "Test your coordination",
      "Fun team challenge",
      "Quick rounds",
      "Exciting format"
    ]
  },
  {
    id: "spot-photography",
    title: "Spot Photography",
    teamSize: 1,
    registrationFee: "₹100",
    prizePool: "₹3,000",
    details: "Capture the essence of the fest through your lens. A theme will be announced on spot, and you have limited time to click the best shots.",
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
      "Bring your own camera/smartphone",
      "Theme announced at start",
      "Time limit: 2 hours for shooting",
      "Submit best 3 photos",
      "Basic editing allowed, no heavy manipulation",
      "Judging: Creativity (40%), Theme relevance (30%), Technical quality (30%)"
    ],
    highlights: [
      "Explore your creativity",
      "Capture fest moments",
      "Any camera allowed",
      "On-spot theme"
    ]
  },
  {
    id: "star-of-kapricious",
    title: "Star of Kapricious",
    teamSize: 1,
    registrationFee: "₹350",
    prizePool: "₹15,000",
    details: "The ultimate talent showcase! Sing, dance, perform standup, play instruments, or showcase any unique talent. The stage is yours to shine.",
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
      "Bring your own instruments/props if needed",
      "Pre-recorded music allowed for singers",
      "Preliminary round may be held if entries exceed limit",
      "Judging: Talent (40%), Stage presence (30%), Audience engagement (30%)"
    ],
    highlights: [
      "Showcase ANY talent",
      "Grand stage",
      "Celebrity judges",
      "Biggest individual prize"
    ]
  }
];

