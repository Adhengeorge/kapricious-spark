import { DepartmentEvent } from "./types";

export const mainEvents: DepartmentEvent[] = [
  {
    id: "fashion-show",
    title: "Fashion Show",
    teamSize: 14,
    registrationFee: "₹250 per head (College teams) / ₹350 per head (Other teams)",
    prizePool: "₹75,000",
    details:
      "Showcase themed fashion collections with choreography, music, and styling on the main stage runway.",
    prizes: ["🥇 ₹50,000", "🥈 ₹25,000"],
    type: "team",
    department: "CULTURAL",
    departmentName: "Cultural Events",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "5:30 PM - 7:30 PM",
    venue: "Auditorium",
    rules: [
      "Open-theme show; no specific theme requirements",
      "Team event with 8-14 members",
      "Time limit: 15 minutes total (including setup and performance)",
      "Negative marking for exceeding the time limit",
      "Tracks must be in pen drive and submitted in advance",
      "Vulgarity/obscenity will lead to disqualification",
      "Props allowed if safe, non-obstructive, and easily portable",
      "Sharp, heavy, or hazardous props are strictly prohibited",
      "Judging: Costume & Creativity, Ramp Walk & Confidence, Overall Presentation",
      "Judges' decision is final and binding",
      "Use of cigarettes, alcohol, or any unfair means is prohibited"
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
    teamSize: 15,
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
    time: "3:30 PM - 5:30 PM",
    venue: "Auditorium",
    rules: [
      "Team size: Minimum 8 members, maximum 20 members",
      "Performance time limit: 5-10 minutes (exceeding may lead to disqualification)",
      "One minute will be allotted for stage arrangement before performance",
      "Only one team per participating college is allowed",
      "Mixed groups from different colleges are not permitted",
      "Soundtrack must be in MP3 format",
      "Props that may make the dance floor untidy are prohibited",
      "Team must restore the stage to its original condition within the given time limit",
      "Any vulgarity or inappropriate content leads to immediate disqualification",
      "Judging criteria: synchronization, choreography, creativity, rhythm, stage presence, overall presentation",
      "Judges' decision is final and binding"
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
    title: "Spot Choreo",
    teamSize: 1,
    registrationFee: "₹200",
    prizePool: "₹8,000",
    details:
      "A synchronization challenge where teams perform in perfect unison and timing under fixed music cues.",
    prizes: ["🥇 ₹5,000", "🥈 ₹3,000"],
    type: "individual",
    department: "CULTURAL",
    departmentName: "Cultural Events",
    image: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 3:30 PM",
    venue: "Auditorium",
    rules: [
      "Individual event",
      "Random songs will be played for contestants",
      "Songs will cover multiple languages",
      "All dance forms are allowed",
      "Each performance is limited to 2 minutes",
      "No dangerous props (fire, swords, knives)",
      "Bring a valid ID card on event day",
      "Report at least 30 minutes prior to the schedule",
      "Judges' decision is final and binding"
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
      "General Rules: Competition is open to all registered participants of the tech fest",
      "General Rules: Each participant must carry their own camera or smartphone for photography",
      "General Rules: Theme will be given on the spot and images must be based on that theme",
      "General Rules: 24-hour time limit to capture and submit via the drive link shared on event day",
      "Camera Specs: DSLR camera or high-end smartphone with a good camera",
      "Camera Specs: Lenses (wide-angle, prime, or zoom)",
      "Camera Specs: Tripod (optional)",
      "Camera Specs: Extra batteries and memory cards",
      "General Rules: Only one final image can be submitted per participant",
      "Ethics & Restrictions: Photos must be original and taken after the theme announcement",
      "Ethics & Restrictions: Plagiarism or use of stock images leads to immediate disqualification",
      "Ethics & Restrictions: Do not disturb or harm people, animals, or the environment",
      "Ethics & Restrictions: Avoid restricted or prohibited areas",
      "Judging Criteria: Creativity and originality (perspective, composition, storytelling)",
      "Judging Criteria: Technical quality (sharpness, exposure, lighting, overall quality)",
      "Judging Criteria: Relevance to theme/event (representation of theme or tech fest spirit)",
      "Submission Guidelines: JPEG format only",
      "Submission Guidelines: Minimum size 1024 x 768 pixels",
      "Submission Guidelines: Heavy editing/manipulation (adding/removing elements) is not permitted",
      "Submission Guidelines: Submit original (unedited) image along with final edited version",
      "Additional Guidelines: Judges' decision is final and binding",
      "Additional Guidelines: Any rule violation leads to disqualification",
      "Additional Guidelines: Organizers may use submitted photographs for promotional/documentation purposes"
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
