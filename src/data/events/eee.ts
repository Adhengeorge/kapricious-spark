import { DepartmentEvent } from "./types";

export const eeeEvents: DepartmentEvent[] = [
  {
    id: "arduino-crafters",
    title: "Arduino Crafters",
    teamSize: 1,
    registrationFee: "₹50",
    prizePool: "₹1,500",
    details: "Participants design and demonstrate a basic Arduino-based circuit using provided components.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "EEE",
    departmentName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 12:00 PM",
    venue: "EEE Lab, KMEA Engineering College",
    rules: [
      "Individual participation only",
      "Components will be provided",
      "Time limit: 60 minutes",
      "Circuit must be functional",
      "Basic Arduino boards provided",
      "Judging: Creativity, Functionality, Efficiency"
    ],
    highlights: [
      "Hands-on Arduino experience",
      "Learn embedded programming",
      "Showcase your creativity",
      "Certificate for all"
    ]
  },
  {
    id: "zap-free-zone",
    title: "Zap Free Zone",
    teamSize: 1,
    registrationFee: "₹50",
    prizePool: "₹1,500",
    details: "A reaction-based fun game where participants must avoid zap zones and complete challenges early.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "EEE",
    departmentName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "EEE Department, KMEA Engineering College",
    rules: [
      "Individual participation",
      "Avoid touching zap zones",
      "Complete challenges within time",
      "Multiple rounds with elimination",
      "Fastest completion wins",
      "Safety is priority"
    ],
    highlights: [
      "Fun reaction game",
      "Test your reflexes",
      "Multiple rounds",
      "Exciting prizes"
    ]
  },
  {
    id: "defuse-x",
    title: "DEFUSE-X",
    teamSize: 3,
    registrationFee: "₹150 per team",
    prizePool: "₹4,000",
    details: "An intense logical and teamwork-based challenge where participants defuse a 'bomb' by solving technical clues under time pressure.",
    prizes: ["🥇 ₹2,500", "🥈 ₹1,500"],
    type: "team",
    department: "EEE",
    departmentName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "EEE Lab, KMEA Engineering College",
    rules: [
      "Teams of 3 members",
      "Solve technical puzzles to defuse",
      "Time limit: 30 minutes",
      "Communication only within team",
      "No external help allowed",
      "Fastest defusal wins"
    ],
    highlights: [
      "Exciting escape room format",
      "Team coordination required",
      "Technical puzzles",
      "Adrenaline-pumping experience"
    ]
  },
  {
    id: "seated-scooter",
    title: "Seated Scooter",
    teamSize: 1,
    registrationFee: "₹60",
    prizePool: "₹1,500",
    details: "A subsoccer table football game designed to be played while sitting down.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "EEE",
    departmentName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1461896836934- voices?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 2:00 PM",
    venue: "Common Area, KMEA Engineering College",
    rules: [
      "Individual participation",
      "Tournament format",
      "Standard table football rules",
      "Best of 3 games per match",
      "Winner advances to next round",
      "Finals: Best of 5"
    ],
    highlights: [
      "Fun table football",
      "Tournament format",
      "Exciting matches",
      "Great entertainment"
    ]
  },
  {
    id: "stacker-blocks",
    title: "Stacker Blocks",
    teamSize: 1,
    registrationFee: "₹30",
    prizePool: "₹800",
    details: "A classic fast-paced game that tests reflexes, concentration and control under increasing difficulty.",
    prizes: ["🥇 ₹500", "🥈 ₹300"],
    type: "individual",
    department: "EEE",
    departmentName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "EEE Department, KMEA Engineering College",
    rules: [
      "Individual participation",
      "Stack blocks as high as possible",
      "Increasing speed with each level",
      "Top score wins",
      "Multiple attempts allowed",
      "Best score counts"
    ],
    highlights: [
      "Classic arcade game",
      "Test your reflexes",
      "Addictive gameplay",
      "Quick rounds"
    ]
  },
  {
    id: "power-play-arena",
    title: "Power Play Arena",
    teamSize: 4,
    registrationFee: "₹80 per participant",
    prizePool: "TBD",
    details: "A competitive gaming arena where participants compete in popular console games for top score.",
    prizes: ["TBD"],
    type: "team",
    department: "EEE",
    departmentName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 6:00 PM",
    venue: "Gaming Zone, KMEA Engineering College",
    rules: [
      "Teams of up to 4 members",
      "Multiple game titles available",
      "Tournament bracket format",
      "Fair play rules apply",
      "Controllers provided",
      "Bring your own allowed"
    ],
    highlights: [
      "Multiple gaming titles",
      "Competitive gaming",
      "Console gaming experience",
      "Full day event"
    ]
  },
  {
    id: "find-the-suspect",
    title: "Find The Suspect",
    teamSize: 3,
    registrationFee: "₹90 per team",
    prizePool: "₹2,500",
    details: "A mystery-solving event where participants analyze clues, logic trails and evidence to identify the suspects.",
    prizes: ["🥇 ₹1,500", "🥈 ₹1,000"],
    type: "team",
    department: "EEE",
    departmentName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 4:00 PM",
    venue: "Campus Wide, KMEA Engineering College",
    rules: [
      "Teams of 3 members",
      "Analyze all given clues",
      "Follow logical trail",
      "First correct answer wins",
      "No external help",
      "Time limit: 90 minutes"
    ],
    highlights: [
      "Mystery solving format",
      "Team detective work",
      "Logical reasoning required",
      "Exciting finale"
    ]
  }
];
