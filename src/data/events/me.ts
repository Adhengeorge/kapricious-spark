import { DepartmentEvent } from "./types";

export const meEvents: DepartmentEvent[] = [
  {
    id: "assemble-x",
    title: "Assemble-X (EV Edition)",
    teamSize: 1,
    registrationFee: "₹200 per head",
    prizePool: "₹4,500",
    details:
      "A VR-based Electric Vehicle assembly challenge where participants assemble EV components in a simulated factory. The event tests speed, precision, technical knowledge, and innovation.",
    prizes: ["🥇 ₹5,000", "🥈 ₹2,500"],
    type: "individual",
    department: "ME",
    departmentName: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "10:00 AM - 12:30 PM",
    venue: "VR Lab, KMEA Engineering College",
    rules: [
      "Solo participants only",
      "VR headsets and tools provided",
      "Complete the EV assembly within the time limit",
      "Accuracy and innovation are both scored",
      "No external references or help allowed",
      "Final ranking combines speed + precision"
    ],
    highlights: [
      "Immersive VR assembly",
      "Electric vehicle focus",
      "Precision and innovation scoring",
      "Hands-on technical challenge"
    ]
  },
  {
    id: "rc-trails",
    title: "RC Trails",
    teamSize: 1,
    registrationFee: "₹100 per head",
    prizePool: "₹3,000",
    details:
      "A high-speed remote-control vehicle lap-time challenge where participants race against the clock while maintaining control and precision.",
    prizes: ["🥇 ₹3,000", "🥈 ₹1,500"],
    type: "individual",
    department: "ME",
    departmentName: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "2:30 PM - 5:00 PM",
    venue: "Outdoor RC Track, KMEA Engineering College",
    rules: [
      "Individual participation",
      "Bring your own RC vehicle or use the provided fleet",
      "Multiple laps; best lap time counts",
      "Stay within track boundaries",
      "Battery swaps only in the pit area",
      "Judging prioritises speed and vehicle control"
    ],
    highlights: [
      "Professional RC circuit",
      "Speed and handling challenge",
      "Multiple timed laps",
      "Thrilling crowd experience"
    ]
  },
  {
    id: "cad-combat",
    title: "CAD Combat",
    teamSize: 1,
    registrationFee: "₹100 per participant",
    prizePool: "₹2,500",
    details:
      "Create accurate and creative CAD models within a limited time. The judges evaluate design clarity, engineering understanding, and finishing skills.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "ME",
    departmentName: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "10:00 AM - 12:00 PM",
    venue: "CAD Lab, KMEA Engineering College",
    rules: [
      "Solo participants only",
      "Use AutoCAD, SolidWorks, or Fusion 360",
      "Problem statement disclosed at the start",
      "90-minute window to complete the model",
      "Submit final file along with a short design rationale",
      "Judging: precision, creativity, feasibility"
    ],
    highlights: [
      "Industry-standard CAD tools",
      "Real-world engineering briefs",
      "Precise measurements matter",
      "Great for design portfolios"
    ]
  },
  {
    id: "technical-quiz",
    title: "Technical Quiz",
    teamSize: 2,
    registrationFee: "₹50 per participant",
    prizePool: "₹2,500",
    details:
      "A rapid-fire quiz covering core mechanical engineering concepts. Teams are tested on speed, accuracy, and depth of knowledge.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "team",
    department: "ME",
    departmentName: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "Seminar Hall, KMEA Engineering College",
    rules: [
      "Teams of two members",
      "Written and buzzer rounds",
      "Topics: mechanics, materials, fluids, dynamics",
      "No electronic aids allowed",
      "Negative marking for wrong answers",
      "Final rapid fire decides the winners"
    ],
    highlights: [
      "Core ME brain-teasers",
      "Team synergy matters",
      "Multi-round format",
      "High-energy buzzer finale"
    ]
  },
  {
    id: "sustainable-innovation-pitching",
    title: "Sustainable Innovation Pitching",
    teamSize: 4,
    registrationFee: "₹100 per participant",
    prizePool: "₹2,500",
    details:
      "Pitch eco-friendly engineering solutions to real challenges. Teams present the idea, prototype, and impact roadmap to industry judges.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "team",
    department: "ME",
    departmentName: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "2:00 PM - 4:30 PM",
    venue: "Conference Hall, KMEA Engineering College",
    rules: [
      "Teams of up to four members",
      "Pitch duration: 10 minutes + 5 minutes Q&A",
      "Presenters must highlight sustainability metrics",
      "Prototype or mock-up encouraged",
      "Judging: innovation, feasibility, impact, delivery",
      "Slide deck submission required"
    ],
    highlights: [
      "Sustainability-first pitching",
      "Connect with industry mentors",
      "Showcase prototypes",
      "Networking opportunity"
    ]
  }
];
