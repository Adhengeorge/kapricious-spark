import { DepartmentEvent } from "./types";

export const eceEvents: DepartmentEvent[] = [
  {
    id: "e-solder",
    title: "SolderMaster",
    teamSize: 1,
    registrationFee: "₹50 per head",
    prizePool: "₹1,500",
    details:
      "Participants must replicate the given structure within the allotted time using the provided components.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "ECE",
    departmentName: "Electronics & Communication Engineering",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "11:30 AM - 4:00 PM",
    venue: "B308",
    contact: {
      name: "Anjana K P",
      phone: "+91 70128 30512",
    },
    rules: [
      "Participants must replicate the given circuit design",
      "Components will be provided",
      "Judged based on accuracy, soldering quality, and neatness"
    ],
    highlights: [
      "Structure replication challenge",
      "Components provided on site",
      "Judged on soldering quality",
      "Accuracy and neatness matter"
    ]
  },
  {
    id: "lazer-heist",
    title: "Laser Heist",
    teamSize: 1,
    registrationFee: "₹50 per head",
    prizePool: "₹2,000",
    details:
      "Participants must move through the laser maze without breaking beams while racing for the best completion time.",
    prizes: ["🥇 ₹1,500", "🥈 ₹500"],
    type: "individual",
    department: "ECE",
    departmentName: "Electronics & Communication Engineering",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "11:30 AM - 4:00 PM",
    venue: "B214",
    contact: {
      name: "B Nandhakishor",
      phone: "+91 85907 67010",
    },
    rules: [
      "Participants must move through the laser maze without breaking beams",
      "Each beam break adds penalty time",
      "Fastest completion time wins"
    ],
    highlights: [
      "Laser maze challenge",
      "Penalty-based timing",
      "Fastest completion wins",
      "Precision movement test"
    ]
  },
  {
    id: "electrodex",
    title: "ElectroDex Challenge",
    teamSize: 1,
    registrationFee: "₹50 per head",
    prizePool: "₹1,500",
    details:
      "Participants identify electronic components and state their name, value when applicable, and function to score the highest.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "ECE",
    departmentName: "Electronics & Communication Engineering",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "11:30 AM - 4:00 PM",
    venue: "B307",
    contact: {
      name: "Nasih O A",
      phone: "+91 90374 71665",
    },
    rules: [
      "Participants identify electronic components",
      "Must mention component name, value and application",
      "Highest score wins"
    ],
    highlights: [
      "Component identification challenge",
      "Name, value, and function based scoring",
      "Highest score wins",
      "Practical electronics knowledge test"
    ]
  },
  {
    id: "electro-hunt",
    title: "ElectroHunt",
    teamSize: 4,
    registrationFee: "₹200 per team",
    prizePool: "₹3,000",
    details:
      "Teams follow a clue trail where each solved clue leads to the next stage, and the fastest team to finish wins.",
    prizes: ["🥇 ₹3,000"],
    type: "team",
    department: "ECE",
    departmentName: "Electronics & Communication Engineering",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "2:00 PM - 4:00 PM",
    venue: "Green Block",
    contact: {
      name: "Nabeel",
      phone: "+91 99472 68474",
    },
    rules: [
      "Teams of 4 members",
      "Each clue leads to the next checkpoint",
      "Use of mobile phones is not allowed",
      "Team completing all stages fastest wins"
    ],
    highlights: [
      "4-member team event",
      "Sequential clue-based format",
      "Fastest full completion wins",
      "Decode and discover challenge"
    ]
  },
  {
    id: "code-red",
    title: "Code Red: Bomb Defusal",
    teamSize: 1,
    registrationFee: "₹50 per head",
    prizePool: "₹1,500",
    details:
      "Participants must identify the correct wire connections and complete a successful bomb defusal in the shortest time possible.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "ECE",
    departmentName: "Electronics & Communication Engineering",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "11:30 AM - 4:00 PM",
    venue: "B303",
    contact: {
      name: "Afshan Khan",
      phone: "+91 97782 40531",
    },
    rules: [
      "Participants must identify the correct wire connections",
      "Incorrect wire selection may lead to penalties or disqualification",
      "Fastest successful defusal wins"
    ],
    highlights: [
      "Bomb defusal challenge",
      "Penalty-based wire selection",
      "Fastest successful attempt wins",
      "Logic and speed event"
    ]
  }
];
