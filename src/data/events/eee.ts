import { DepartmentEvent } from "./types";

export const eeeEvents: DepartmentEvent[] = [
  {
    id: "arduino-crafters",
    title: "Arduino Crafters",
    teamSize: 1,
    registrationFee: "₹50 per participant",
    prizePool: "₹1,500",
    details:
      "Design, code, and demo a working Arduino project using modular sensors and actuators. Creativity and reliability are key.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "EEE",
    departmentName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 2:00 PM",
    venue: "C406",
    rules: [
      "Event is conducted as a tournament",
      "A problem or task will be given to the participants",
      "Participants must solve the task using the provided hardware/components only",
      "Participants can use AI tools",
      "Complete the task within the specified time constraint",
      "Participants can choose required components from the given list"
    ],
    highlights: [
      "Hands-on embedded coding",
      "Create working demos",
      "Learn Arduino wiring",
      "Expert feedback"
    ]
  },
  {
    id: "zap-free-zone",
    title: "Zap Free Zone",
    teamSize: 1,
    registrationFee: "₹50 per participant",
    prizePool: "₹1,500",
    details:
      "Navigate a reaction-driven arena while avoiding zap zones and completing rapid-fire electrical challenges.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "EEE",
    departmentName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=600&fit=crop",
    date: "March 27-28, 2026",
    time: "March 27: 11:30 AM - 3:00 PM | March 28: 10:00 AM - 2:00 PM",
    venue: "C205-A",
    rules: [
      "Place the metal loop at the start of the wire before beginning",
      "Use only one hand throughout the game",
      "Do not touch the wire; contact triggers the buzzer/LED and loses the round",
      "Reach the finish point without touching the wire to win"
    ],
    highlights: [
      "Adrenaline-fueled reaction game",
      "Test reflexes and timing",
      "Multiple thrilling rounds",
      "Safety-first setup"
    ]
  },
  {
    id: "defuse-x",
    title: "Defuse-X",
    teamSize: 3,
    registrationFee: "₹150 per team",
    prizePool: "₹3,500",
    details:
      "A high-pressure challenge where teams decode clues and complete circuit puzzles to 'defuse' a mock device before time runs out.",
    prizes: ["🥇 ₹3,500"],
    type: "team",
    department: "EEE",
    departmentName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=1200&h=600&fit=crop",
    date: "March 27-28, 2026",
    time: "March 27: 2:00 PM - 5:00 PM | March 28: 9:00 AM - 1:00 PM",
    venue: "C209",
    rules: [
      "Team size: 3 members",
      "Task completion time: 10 minutes"
    ],
    highlights: [
      "Team coordination",
      "Logical and circuit puzzles",
      "Tension-filled atmosphere",
      "Real-time scoring"
    ]
  },
  {
    id: "stacker-blocks",
    title: "Stacker Blocks",
    teamSize: 1,
    registrationFee: "₹30 per participant",
    prizePool: "₹800",
    details:
      "Stack as many blocks as possible while maintaining balance and speed. Each level ramps up the challenge.",
    prizes: ["🥇 ₹800"],
    type: "individual",
    department: "EEE",
    departmentName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=1200&h=600&fit=crop",
    date: "March 27-28, 2026",
    time: "March 27: 11:30 AM - 3:00 PM | March 28: 10:00 AM - 2:00 PM",
    venue: "C205B",
    rules: [
      "Press the button once to stop the moving LED block and place it on the stack",
      "The new block must align with the block below it to stay in the stack",
      "If part of the block does not align, that part disappears",
      "The game continues until the player stacks all blocks to the top or loses all blocks"
    ],
    highlights: [
      "Fast-paced reflex test",
      "Simple yet addictive",
      "Quick rounds",
      "Ideal for casual participants"
    ]
  },
  {
    id: "power-play-arena",
    title: "Power Play Arena",
    teamSize: 4,
    registrationFee: "₹80 per participant",
    prizePool: "Nil",
    details:
      "Compete in popular console and PC titles inside a dedicated gaming arena. Score points, survive eliminations, and claim bragging rights.",
    prizes: ["Bragging rights and swag"],
    type: "team",
    department: "EEE",
    departmentName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "12:00 PM - 6:00 PM",
    venue: "C306",
    rules: [
      "Teams of up to four participants",
      "Multiple game titles in rotation",
      "Tournament bracket structure",
      "Fair play and sportsmanship required",
      "Controllers and consoles provided",
      "Participants responsible for their slots"
    ],
    highlights: [
      "Full-day gaming arena",
      "Multiple titles to choose",
      "Casual and competitive vibes",
      "Earn tournament points"
    ]
  }
];
