import { DepartmentEvent } from "./types";

export const raEvents: DepartmentEvent[] = [
  {
    id: "robo-soccer",
    title: "Robo Soccer",
    teamSize: 4,
    registrationFee: "₹50 per participant",
    prizePool: "₹3,000",
    details: "A thrilling robot soccer competition where teams control robots to score goals and win.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "team",
    department: "RAE",
    departmentName: "Robotics & Automation Engineering",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 1:00 PM",
    venue: "Robotics Lab, KMEA Engineering College",
    rules: [
      "Teams of 2-4 members",
      "Robots must be autonomous or remote controlled",
      "Maximum robot dimensions: 30cm x 30cm x 30cm",
      "Match duration: 5 minutes",
      "No ramming or damaging opponent robots",
      "Highest goals scored wins"
    ],
    highlights: [
      "Exciting robot matches",
      "Work with real robots",
      "Team competition format",
      "Attractive prizes"
    ]
  },
  {
    id: "line-tracer",
    title: "Line Tracer",
    teamSize: 4,
    registrationFee: "₹80 per participant",
    prizePool: "₹4,000",
    details: "Build and program a robot to follow a line track with speed and precision.",
    prizes: ["🥇 ₹2,500", "🥈 ₹1,500"],
    type: "team",
    department: "RAE",
    departmentName: "Robotics & Automation Engineering",
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "Robotics Lab, KMEA Engineering College",
    rules: [
      "Teams of 2-4 members",
      "Robot must follow black line on white surface",
      "Track includes curves and intersections",
      "Fastest completion time wins",
      "Robot must complete track without manual intervention",
      "Multiple attempts allowed, best time counts"
    ],
    highlights: [
      "Design your own line follower",
      "Challenging track layout",
      "Speed-based competition",
      "Learn robotics fundamentals"
    ]
  },
  {
    id: "vibe-coding-ideathon",
    title: "Vibe Coding Ideathon",
    teamSize: 4,
    registrationFee: "₹100 per participant",
    prizePool: "₹8,000",
    details: "An innovative ideathon where teams develop creative coding solutions to real-world problems.",
    prizes: ["🥇 ₹5,000", "🥈 ₹3,000"],
    type: "team",
    department: "RAE",
    departmentName: "Robotics & Automation Engineering",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "9:00 AM - 6:00 PM",
    venue: "Computer Lab, KMEA Engineering College",
    rules: [
      "Teams of 2-4 members",
      "Problem statement given at start",
      "Duration: 6 hours",
      "Any programming language allowed",
      "Working prototype required for submission",
      "Judging: Innovation (40%), Implementation (35%), Presentation (25%)"
    ],
    highlights: [
      "Full-day coding marathon",
      "Real-world problem solving",
      "Mentorship available",
      "Networking with peers"
    ]
  },
  {
    id: "circuit-rush",
    title: "Circuit Rush",
    teamSize: 3,
    registrationFee: "₹50 per participant",
    prizePool: "₹5,500",
    details: "A fast-paced circuit building challenge testing your electronics knowledge and speed.",
    prizes: ["🥇 ₹3,000", "🥈 ₹2,500"],
    type: "team",
    department: "RAE",
    departmentName: "Robotics & Automation Engineering",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "Electronics Lab, KMEA Engineering College",
    rules: [
      "Teams of 2-3 members",
      "Build given circuit within time limit",
      "All components provided",
      "Circuit must be functional",
      "Fastest working circuit wins",
      "Safety guidelines must be followed"
    ],
    highlights: [
      "Speed circuit building",
      "Test practical skills",
      "Team coordination required",
      "Exciting competition format"
    ]
  }
];
