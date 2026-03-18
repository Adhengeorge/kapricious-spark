import { DepartmentEvent } from "./types";

export const ceEvents: DepartmentEvent[] = [
  {
    id: "bridgit",
    title: "Bridgit (Bridge Modelling)",
    teamSize: 4,
    registrationFee: "₹200 per team",
    prizePool: "₹4,500",
    details:
      "Design and construct a bridge using limited materials. The structure will be tested for load bearing capacity and efficiency.",
    prizes: ["🥇 ₹3,500", "🥈 ₹1,000"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "2:00 PM - 4:00 PM",
    venue: "D304",
    rules: [
      "Team size: maximum four members",
      "Only materials provided at the venue may be used (150 popsicle sticks and glue)",
      "Construction must be completed within a maximum of three hours",
      "Truss bridge model with minimum span 400 mm and width 100 mm",
      "Winner based on maximum load capacity",
      "In case of tie, aesthetics decide the winner",
      "Load will be applied at the center of the span (mark midpoint)",
      "Judges will oversee load testing and aesthetic evaluation; decision is final"
    ],
    highlights: [
      "Hands-on structural design",
      "Real load testing",
      "Team collaboration",
      "Budget-aware engineering"
    ]
  },
  {
    id: "cad-illumina",
    title: "CAD Illumina",
    teamSize: 1,
    registrationFee: "₹100",
    prizePool: "₹3,750",
    details:
      "A software-based drafting competition that tests speed, accuracy, and technical understanding on CAD tools.",
    prizes: ["🥇 ₹2,500", "🥈 ₹1,250"],
    type: "individual",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "9:30 AM - 11:30 AM",
    venue: "CAD Lab, Civil Block",
    rules: [
      "Eligibility: open to graduate students in accredited engineering programs or recent graduates",
      "Specified CAD software may be required",
      "Design challenge to be completed within the given timeframe",
      "May require a 2D design",
      "Drawings must include proper dimensions",
      "Any discrepancy leads to disqualification",
      "Results finalized by the reviewing committee"
    ],
    highlights: [
      "Industry-standard drafting",
      "Civil engineering focus",
      "Creativity under time pressure",
      "Portfolio-ready work"
    ]
  },
  {
    id: "movethon",
    title: "Movethon",
    teamSize: 4,
    registrationFee: "₹200",
    prizePool: "₹4,500",
    details:
      "Teams develop creative solutions for real-world civil engineering problems and present their innovations.",
    prizes: ["🥇 ₹3,000", "🥈 ₹1,500"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "9:30 AM - 11:30 AM",
    venue: "Smart Class, Civil Block",
    rules: [
      "Team size: 4 members (ID card is mandatory)",
      "Problem given on Day 1 (online) and solution presented on Day 2 (offline)",
      "Presentation time is 15 minutes; teams must adhere to the limit",
      "Report 15 minutes before the allotted time",
      "Evaluation based on problem understanding, methodology, proposed solution, feasibility analysis",
      "Decision of the panel will be final",
      "Participation certificates will be provided"
    ],
    highlights: [
      "Real-world civil challenges",
      "Innovation-focused",
      "Mentorship from faculty",
      "Networking opportunity"
    ]
  },
  {
    id: "quizzard",
    title: "Quizzard",
    teamSize: 2,
    registrationFee: "₹50 per team",
    prizePool: "₹4,500",
    details:
      "A multi-round technical quiz covering structures, surveying, materials, and smart infrastructure.",
    prizes: ["🥇 ₹3,000", "🥈 ₹1,500"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "9:30 AM - 11:30 AM",
    venue: "Seminar Hall, Civil Block",
    rules: [
      "Each team can have a maximum of two members",
      "Time allotted for each question will be announced at the venue",
      "Team members may discuss before answering",
      "If a team cannot answer, they may pass",
      "No response within time passes to the next team",
      "Late answers are not considered correct",
      "Preliminary round with maximum teams to start",
      "Top teams advance to second round",
      "Eight teams proceed to semi-final",
      "Top four teams qualify for final",
      "Each correct answer is 5 points; a passed question carries 3 points",
      "Discussion between teams is strictly prohibited"
    ],
    highlights: [
      "Multi-level quiz format",
      "Civil engineering focus",
      "Team strategy is key",
      "Exciting buzzer finale"
    ]
  },
  {
    id: "infrahunt",
    title: "Infrahunt",
    teamSize: 4,
    registrationFee: "₹200",
    prizePool: "₹3,000",
    details:
      "A technical treasure hunt where teams solve civil engineering clues to reach the finish line.",
    prizes: ["🥇 ₹3,000"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "2:00 PM - 4:00 PM",
    venue: "Whole Department",
    rules: [
      "Team size: exactly four members; no participant can be in more than one team",
      "Mobile phones, smart watches, or electronic gadgets are strictly not allowed",
      "Solve clues in sequence; next clue only after the previous one is solved",
      "All clues are technical and logic-based",
      "External help is not allowed",
      "Tampering with, hiding, or damaging clues leads to disqualification",
      "First team to reach the final destination wins",
      "Decision of the event coordinators is final in case of disputes"
    ],
    highlights: [
      "Engineered treasure hunt",
      "Team adventure",
      "Puzzles rooted in civil themes",
      "Fun and learning"
    ]
  },
  {
    id: "structra",
    title: "Structra (Paper Tower Challenge)",
    teamSize: 4,
    registrationFee: "₹200",
    prizePool: "₹3,000",
    details:
      "Build the tallest freestanding tower using limited paper and materials within a fixed time to test creativity and structural stability.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 4:00 PM",
    venue: "Seminar Hall, Civil Block",
    rules: [
      "Team size: 2-4 members; no participant can be in more than one team",
      "Teams will be provided paper sheets and limited materials only",
      "Build the tower using only the provided materials",
      "The tower must be free-standing with no external support",
      "Time limit will be announced at the venue",
      "Evaluation based on height and stability",
      "Touching or disturbing other teams' structures leads to disqualification",
      "Tallest stable paper tower wins"
    ],
    highlights: [
      "Creative structural challenge",
      "Tallest tower wins",
      "Team coordination",
      "Hands-on civil fundamentals"
    ]
  }
];
