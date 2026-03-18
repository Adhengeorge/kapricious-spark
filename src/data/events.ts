export interface DepartmentEvent {
  id: string;
  title: string;
  teamSize: number;
  registrationFee: string;
  prizePool: string;
  details: string;
  prizes: string[];
  type: "individual" | "team";
  department: string;
  departmentName: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  rules: string[];
  highlights: string[];
}

export const eceEvents: DepartmentEvent[] = [
  {
    id: "laser-heist",
    title: "Laser Heist",
    teamSize: 1,
    registrationFee: "₹50",
    prizePool: "₹1,500",
    details: "Navigate through laser obstacles in this thrilling heist-themed challenge testing agility and precision.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "ECE",
    departmentName: "Electronics & Communication Engineering",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "10:00 AM - 12:00 PM",
    venue: "ECE Lab, KMEA Engineering College",
    rules: [
      "Participants must move through the laser maze without breaking beams",
      "Each beam break adds penalty time",
      "Fastest completion time wins"
    ],
    highlights: [
      "Real laser obstacle course",
      "Timed challenge format",
      "Certificates for all participants",
      "Exciting prizes for winners"
    ]
  },
  {
    id: "electro-hunt",
    title: "Electro Hunt",
    teamSize: 1,
    registrationFee: "₹200",
    prizePool: "₹3,000",
    details: "A treasure hunt with electronics and communication engineering puzzles and clues.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "ECE",
    departmentName: "Electronics & Communication Engineering",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "Campus Wide, KMEA Engineering College",
    rules: [
      "Teams of 4 members",
      "Each clue leads to the next checkpoint",
      "Use of mobile phones is not allowed",
      "Team completing all stages fastest wins"
    ],
    highlights: [
      "Campus-wide treasure hunt",
      "Electronics-based puzzles",
      "Multiple checkpoints",
      "Exciting final treasure"
    ]
  },
  {
    id: "solder-master",
    title: "Solder Master",
    teamSize: 1,
    registrationFee: "₹50",
    prizePool: "₹1,500",
    details: "Showcase your soldering skills by assembling electronic circuits with precision and speed.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "ECE",
    departmentName: "Electronics & Communication Engineering",
    image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "ECE Workshop, KMEA Engineering College",
    rules: [
      "Participants must replicate the given circuit design",
      "Components will be provided",
      "Judged based on accuracy, soldering quality, and neatness"
    ],
    highlights: [
      "Hands-on soldering challenge",
      "Professional equipment provided",
      "Learn practical electronics skills",
      "Certificates for participants"
    ]
  },
  {
    id: "code-red",
    title: "Code Red",
    teamSize: 1,
    registrationFee: "₹50",
    prizePool: "₹1,500",
    details: "A coding challenge focused on embedded systems and microcontroller programming.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "ECE",
    departmentName: "Electronics & Communication Engineering",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "3:00 PM - 5:00 PM",
    venue: "Computer Lab, KMEA Engineering College",
    rules: [
      "Participants must identify the correct wire connections",
      "Incorrect wire selection may lead to penalties or disqualification",
      "Fastest successful defusal wins"
    ],
    highlights: [
      "Embedded systems focus",
      "Real microcontroller boards",
      "Industry-relevant skills",
      "Attractive prizes"
    ]
  },
  {
    id: "electrodex",
    title: "ElectroDex",
    teamSize: 1,
    registrationFee: "₹50",
    prizePool: "₹3,000",
    details: "Test your knowledge of electronics components, circuits, and communication systems.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "ECE",
    departmentName: "Electronics & Communication Engineering",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "9:00 AM - 11:00 AM",
    venue: "Seminar Hall, KMEA Engineering College",
    rules: [
      "Participants identify electronic components",
      "Must mention component name, value and application",
      "Highest score wins"
    ],
    highlights: [
      "Comprehensive ECE quiz",
      "Multiple rounds",
      "Test your technical knowledge",
      "Great learning experience"
    ]
  }
];

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
    department: "SFE",
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
    department: "SFE",
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
    department: "SFE",
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
    department: "SFE",
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
    department: "SFE",
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
    department: "SFE",
    departmentName: "Fire & Safety",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=600&fit=crop",
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
    department: "RA",
    departmentName: "Robotics & Automation Engineering",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 1:00 PM",
    venue: "Robotics Lab, KMEA Engineering College",
    rules: [
      "Team size: 2-4 members",
      "Robots will be provided by the department",
      "Each team is allowed 10 minutes",
      "The team that scores the maximum goals wins"
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
    department: "RA",
    departmentName: "Robotics & Automation Engineering",
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "Robotics Lab, KMEA Engineering College",
    rules: [
      "Participants must bring their own robot",
      "Team size: 2-4 members",
      "Robots must follow the line and complete the goal in the shortest time",
      "The team with the shortest time wins"
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
    department: "RA",
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
    department: "RA",
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
    date: "March 27, 2026",
    time: "10:00 AM - 12:00 PM",
    venue: "EEE Lab, KMEA Engineering College",
    rules: [
      "Event is conducted as a tournament",
      "A problem or task will be given to the participants",
      "Participants must solve the task using the provided hardware/components only",
      "Participants can use AI tools",
      "Complete the task within the specified time constraint",
      "Participants can choose required components from the given list"
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
    date: "March 27, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "EEE Department, KMEA Engineering College",
    rules: [
      "Place the metal loop at the start of the wire before beginning",
      "Use only one hand throughout the game",
      "Do not touch the wire; contact triggers the buzzer/LED and loses the round",
      "Reach the finish point without touching the wire to win"
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
    date: "March 27, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "EEE Lab, KMEA Engineering College",
    rules: [
      "Team size: 3 members",
      "Task completion time: 10 minutes"
    ],
    highlights: [
      "Exciting escape room format",
      "Team coordination required",
      "Technical puzzles",
      "Adrenaline-pumping experience"
    ]
  },
  {
    id: "seated-soccer",
    title: "Seated Soccer",
    teamSize: 1,
    registrationFee: "₹60",
    prizePool: "₹1,500",
    details: "A fun and competitive seated soccer game where players remain seated and use only their feet to control the ball and score goals. Tests agility, coordination, and quick reflexes in a unique twist on traditional football.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "individual",
    department: "EEE",
    departmentName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "10:00 AM - 2:00 PM",
    venue: "Common Area, KMEA Engineering College",
    rules: [
      "Players must remain seated at all times",
      "Use only feet to control and shoot the ball",
      "Keep feet on your own side",
      "Play without shoes",
      "Score 3 goals to win",
      "Maximum time: 5 minutes"
    ],
    highlights: [
      "Unique seated football challenge",
      "Tournament knockout format",
      "Tests coordination and reflexes",
      "Great fun and entertainment"
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
    date: "March 27, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "EEE Department, KMEA Engineering College",
    rules: [
      "Press the button once to stop the moving LED block and place it on the stack",
      "The new block must align with the block below it to stay in the stack",
      "If part of the block does not align, that part disappears",
      "The game continues until the player stacks all blocks to the top or loses all blocks"
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
    date: "March 27, 2026",
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
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
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

export const meEvents: DepartmentEvent[] = [
  {
    id: "assemble-x",
    title: "ASSEMBLE X (VR-based EV Assembly Challenge)",
    teamSize: 1,
    registrationFee: "₹100 per team",
    prizePool: "₹7,500",
    details: "A VR-based EV assembly challenge testing speed, precision, technical skills, and innovation.",
    prizes: ["🥇 ₹5,000", "🥈 ₹2,500"],
    type: "individual",
    department: "ME",
    departmentName: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 1:00 PM",
    venue: "VR Lab, KMEA Engineering College",
    rules: [
      "Individual participation",
      "VR equipment will be provided",
      "Complete EV assembly in VR environment",
      "Fastest accurate assembly wins",
      "No prior VR experience required",
      "Safety briefing mandatory"
    ],
    highlights: [
      "Cutting-edge VR technology",
      "Electric vehicle assembly",
      "Immersive experience",
      "Learn EV components"
    ]
  },
  {
    id: "rc-trails",
    title: "RC-TRAILS",
    teamSize: 1,
    registrationFee: "₹200 per team",
    prizePool: "₹4,500",
    details: "High-speed RC lap time challenge testing precision, control, and fastest track performance.",
    prizes: ["🥇 ₹3,000", "🥈 ₹1,500"],
    type: "individual",
    department: "ME",
    departmentName: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "Outdoor Track, KMEA Engineering College",
    rules: [
      "Individual participation",
      "Bring your own RC car or use provided",
      "Multiple laps, best time counts",
      "Track boundaries must be followed",
      "No modifications during race",
      "Battery swaps allowed between runs"
    ],
    highlights: [
      "Exciting RC racing",
      "Professional track setup",
      "Multiple attempts",
      "Thrilling competition"
    ]
  },
  {
    id: "cad-combat",
    title: "CAD COMBAT",
    teamSize: 1,
    registrationFee: "₹100 per participant",
    prizePool: "₹3,000",
    details: "CAD design challenge testing precision, creativity, and engineering skills.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "ME",
    departmentName: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 12:00 PM",
    venue: "CAD Lab, KMEA Engineering College",
    rules: [
      "Individual participation",
      "Software: AutoCAD/SolidWorks/Fusion 360",
      "Time limit: 90 minutes",
      "Design problem given at start",
      "Accuracy and creativity judged",
      "File submission in standard format"
    ],
    highlights: [
      "Industry-standard CAD software",
      "Real engineering problems",
      "Skill-based competition",
      "Great for portfolio"
    ]
  },
  {
    id: "technical-quiz",
    title: "Technical Quiz",
    teamSize: 2,
    registrationFee: "₹50 per participant",
    prizePool: "₹1,500",
    details: "Technical mechanical quiz testing core concepts, speed, accuracy, and engineering knowledge.",
    prizes: ["🥇 ₹1,000", "🥈 ₹500"],
    type: "team",
    department: "ME",
    departmentName: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "Seminar Hall, KMEA Engineering College",
    rules: [
      "Teams of 2 members",
      "Multiple rounds",
      "Mechanical engineering topics",
      "No electronic devices",
      "Negative marking applies",
      "Finals: Rapid fire round"
    ],
    highlights: [
      "Test your ME knowledge",
      "Multi-round format",
      "Team collaboration",
      "Exciting finals"
    ]
  },
  {
    id: "sustainable-innovation-pitching",
    title: "SUSTAINABLE INNOVATION PITCHING",
    teamSize: 4,
    registrationFee: "₹100 per participant",
    prizePool: "₹3,000",
    details: "Sustainability innovation pitch showcasing impactful, feasible, eco-friendly engineering solutions.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "team",
    department: "ME",
    departmentName: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "Conference Hall, KMEA Engineering College",
    rules: [
      "Teams of up to 4 members",
      "Pitch duration: 10 minutes",
      "Q&A: 5 minutes",
      "Presentation slides required",
      "Prototype/model preferred",
      "Judging: Innovation, Feasibility, Impact, Presentation"
    ],
    highlights: [
      "Showcase sustainable ideas",
      "Industry expert judges",
      "Networking opportunity",
      "Make real impact"
    ]
  },
  {
    id: "lathe-master",
    title: "LATHE MASTER",
    teamSize: 1,
    registrationFee: "₹100",
    prizePool: "₹3,000",
    details: "Hands-on machining contest where participants shape raw material into a finished mechanical component using a lathe.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "ME",
    departmentName: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 1:00 PM",
    venue: "Workshop, KMEA Engineering College",
    rules: [
      "Individual participation",
      "Safety gear mandatory",
      "Time limit: 45 minutes",
      "Raw material and tools provided",
      "Judging: Accuracy, Finish, Time",
      "Safety violations may disqualify"
    ],
    highlights: [
      "Real machining experience",
      "Work on actual lathe",
      "Learn workshop skills",
      "Certificate for all"
    ]
  }
];

export const ceEvents: DepartmentEvent[] = [
  {
    id: "bridgit",
    title: "BRIDGIT (Bridge Modelling Competition)",
    teamSize: 4,
    registrationFee: "₹200 per team",
    prizePool: "₹4,500",
    details: "A structural model-making competition where teams design and construct a bridge using limited materials. The model will be tested for load carrying capacity and structural efficiency.",
    prizes: ["🥇 ₹3,000", "🥈 ₹1,500"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "9:00 AM - 1:00 PM",
    venue: "Civil Lab, KMEA Engineering College",
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
      "Learn engineering principles"
    ]
  },
  {
    id: "cad-illumina",
    title: "CAD ILLUMINA",
    teamSize: 1,
    registrationFee: "₹100",
    prizePool: "₹3,750",
    details: "A software-based drafting competition that evaluates students' technical accuracy, speed, and design understanding within a specified time.",
    prizes: ["🥇 ₹2,500", "🥈 ₹1,250"],
    type: "individual",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 12:00 PM",
    venue: "CAD Lab, KMEA Engineering College",
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
      "Industry-standard software",
      "Civil engineering focus",
      "Skill-based competition",
      "Build your portfolio"
    ]
  },
  {
    id: "movethon",
    title: "MOVETHON",
    teamSize: 4,
    registrationFee: "₹200",
    prizePool: "₹4,500",
    details: "A team event where students develop simple and innovative ideas to solve real-world civil engineering problems.",
    prizes: ["🥇 ₹3,000", "🥈 ₹1,500"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "Conference Hall, KMEA Engineering College",
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
      "Real-world problems",
      "Innovation focused",
      "Present to experts",
      "Great networking"
    ]
  },
  {
    id: "quizzard",
    title: "QUIZZARD",
    teamSize: 2,
    registrationFee: "₹50 per team",
    prizePool: "₹4,500",
    details: "A knowledge-based competition focusing on core civil engineering subjects which is conducted in multi levels.",
    prizes: ["🥇 ₹3,000", "🥈 ₹1,500"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "Seminar Hall, KMEA Engineering College",
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
      "Multi-level quiz",
      "Civil engineering focus",
      "Team participation",
      "Exciting buzzer round"
    ]
  },
  {
    id: "infrahunt",
    title: "INFRAHUNT (Treasure Hunt)",
    teamSize: 4,
    registrationFee: "₹200",
    prizePool: "₹3,000",
    details: "A fun, team-based event where participants solve engineering and technical-related clues to find the final treasure.",
    prizes: ["🥇 ₹3,000"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 4:00 PM",
    venue: "Campus Wide, KMEA Engineering College",
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
      "Campus-wide hunt",
      "Engineering puzzles",
      "Team adventure",
      "Fun and learning"
    ]
  },
  {
    id: "structra",
    title: "STRUCTRA",
    teamSize: 4,
    registrationFee: "₹200",
    prizePool: "₹3,000",
    details: "A fun structural challenge where teams build the tallest free-standing tower using only paper and limited materials within a fixed time, testing creativity, stability, and basic engineering principles.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "team",
    department: "CE",
    departmentName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "3:00 PM - 5:00 PM",
    venue: "Civil Lab, KMEA Engineering College",
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
      "Tallest tower wins",
      "Creative challenge",
      "Team coordination",
      "Fun competition"
    ]
  }
];

export const cseEvents: DepartmentEvent[] = [
  {
    id: "prompt-wars",
    title: "Prompt Wars",
    teamSize: 1,
    registrationFee: "₹50",
    prizePool: "₹3,000",
    details: "Participants craft optimized prompts to generate the best AI output under given constraints.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 12:00 PM",
    venue: "Computer Lab, KMEA Engineering College",
    rules: [
      "Event is open to all registered tech fest participants",
      "Participants must participate individually",
      "Total event duration: 75 minutes",
      "The competition will have two rounds",
      "Prompts must be created using the provided AI tool and model only",
      "Round 1 - Image Generation: task/theme will be given",
      "Round 1 time: 30 minutes",
      "Top participants from Round 1 advance to Round 2",
      "Round 2 - Video Generation: new task/theme will be given",
      "Round 2 time: 45 minutes",
      "Prompts must be created during the competition",
      "Copying prompts or unfair practices are not allowed",
      "Participants must submit both the prompt and the AI-generated output",
      "Winners are selected based on prompt clarity, creativity, and quality of AI output",
      "Judges' decision is final"
    ],
    highlights: [
      "Learn AI prompting",
      "Latest AI technology",
      "Industry-relevant skill",
      "Exciting challenges"
    ]
  },
  {
    id: "bug-bounty",
    title: "Bug Bounty",
    teamSize: 1,
    registrationFee: "₹50",
    prizePool: "₹3,000",
    details: "Participants fix buggy code within a time limit.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "Computer Lab, KMEA Engineering College",
    rules: [
      "Individual participation only",
      "College ID is mandatory",
      "Participants must register before the event begins",
      "Participants can choose Python, C, C++, or Java",
      "Buggy code will be provided during the event",
      "Participants must identify and fix the errors",
      "The event consists of one debugging round only",
      "Participants must correct the given program within the time limit",
      "Code must be submitted before time ends",
      "System with compiler/IDE will be provided",
      "Internet access is not allowed",
      "AI tools (ChatGPT, Copilot, Gemini, etc.) are strictly prohibited",
      "Use of AI assistance will result in disqualification",
      "The corrected program must compile and run successfully",
      "Late submissions will not be accepted",
      "Judging: accuracy of corrected code, number of bugs fixed, time taken",
      "Participants must work individually; discussion or copying is not allowed",
      "Participant who fixes the maximum bugs correctly in the shortest time wins"
    ],
    highlights: [
      "Real-world debugging",
      "Multiple languages",
      "Test your skills",
      "Great practice"
    ]
  },
  {
    id: "css-royale",
    title: "CSS Royale",
    teamSize: 1,
    registrationFee: "₹50",
    prizePool: "₹3,000",
    details: "Design a visually appealing webpage using only HTML & CSS.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 4:00 PM",
    venue: "Computer Lab, KMEA Engineering College",
    rules: [
      "Only HTML and CSS are allowed",
      "JavaScript is strictly prohibited",
      "CSS frameworks like Bootstrap or Tailwind are not allowed",
      "You may use Flexbox, Grid, Animations, and Transitions",
      "Internet usage allowed only for documentation (optional)",
      "Code must be written during the event",
      "Plagiarism leads to disqualification",
      "Each participant must submit before the time limit",
      "Total time allowed: 90 minutes",
      "Students must carry their college ID",
      "Decision of the judge will be final",
      "Individual participation only"
    ],
    highlights: [
      "Pure CSS challenge",
      "No frameworks",
      "Test frontend skills",
      "Portfolio material"
    ]
  },
  {
    id: "no-run-ninja",
    title: "NO-Run Ninja",
    teamSize: 1,
    registrationFee: "₹50",
    prizePool: "₹3,000",
    details: "Participants write code without compiling or running it.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 11:30 AM",
    venue: "Computer Lab, KMEA Engineering College",
    rules: [
      "Individual participation",
      "No running/compiling allowed",
      "Paper-based submission",
      "Code must be logically correct",
      "Time limit: 60 minutes",
      "Judging by expert panel"
    ],
    highlights: [
      "Test logical thinking",
      "Pure coding skill",
      "No debugging allowed",
      "Mental challenge"
    ]
  },
  {
    id: "code-catastrophe",
    title: "Code Catastrophe",
    teamSize: 2,
    registrationFee: "₹50",
    prizePool: "₹3,000",
    details: "Write the most chaotic but functional code. Creativity in confusion wins.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "3:00 PM - 4:30 PM",
    venue: "Computer Lab, KMEA Engineering College",
    rules: [
      "Program must compile and run successfully",
      "Output should be correct according to the problem statement",
      "Any programming language allowed (C, C++, Java, Python, etc.)",
      "Participants may compete individually or in teams of up to 2 members",
      "Internet usage is strictly restricted",
      "Plagiarism or copying code from others leads to disqualification",
      "Code should intentionally use poor coding practices",
      "Make the code long, complex, and hard to read while producing correct output",
      "Avoid built-in shortcuts; use unnecessarily complicated logic",
      "Judges' decision will be final in selecting the worst (best) code"
    ],
    highlights: [
      "Fun coding challenge",
      "Break all conventions",
      "Creative coding",
      "Unique competition"
    ]
  },
  {
    id: "tech-escape-room",
    title: "TECH ESCAPE ROOM",
    teamSize: 4,
    registrationFee: "₹200 per team",
    prizePool: "₹6,000",
    details: "A QR-based interactive technical escape challenge where teams solve encryption, debugging, and logic puzzles to regain system control within 60 minutes.",
    prizes: ["🥇 ₹4,000", "🥈 ₹2,000"],
    type: "team",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "CSE Department, KMEA Engineering College",
    rules: [
      "Teams of 2-4 members",
      "College ID is mandatory",
      "Register at the help desk 15 minutes before the event",
      "First clue and zone details will be given at the start",
      "All teams start together",
      "Campus is divided into zones",
      "Teams must stay together throughout the hunt",
      "Clues include riddles, puzzles, cultural and tech challenges",
      "Solve each clue to proceed",
      "Mobile phones allowed only for QR codes and digital clues",
      "No calling or searching for answers",
      "Limited hints available; time penalty for each hint",
      "No cheating or copying; do not damage or hide clues",
      "Respect campus rules and property; follow volunteers' instructions",
      "Disqualification for indiscipline or not obeying instructions",
      "Fixed duration; participation certificates will be provided",
      "First to complete the final clue wins",
      "Judges' decision is final"
    ],
    highlights: [
      "Immersive experience",
      "Technical puzzles",
      "Team collaboration",
      "Thrilling challenge"
    ]
  },
  {
    id: "hackathon",
    title: "BuildX'26 - Hackathon",
    teamSize: 4,
    registrationFee: "₹200",
    prizePool: "₹15,000",
    details: "An overnight innovation challenge where teams build a working prototype within a fixed duration.",
    prizes: ["🥇 ₹10,000", "🥈 ₹5,000"],
    type: "team",
    department: "CSE",
    departmentName: "Computer Science & Engineering",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop",
    date: "March 26-27, 2026",
    time: "7:00 PM (Mar 26) - 7:00 AM (Mar 27)",
    venue: "Computer Lab Complex, KMEA Engineering College",
    rules: [
      "Participants can register only in teams of 2 to 4 members",
      "All participants must register before the event begins",
      "Problem statement will be given at the start of the hackathon",
      "Participants must complete the project within the given time limit",
      "Use of online resources and open-source tools is allowed; copying existing projects is not permitted",
      "All code and work must be created during the hackathon",
      "Teams must present or demonstrate their project at the end of the event",
      "Decision of the judges will be final",
      "Participants must follow event rules and maintain proper discipline"
    ],
    highlights: [
      "Overnight hackathon",
      "Build real projects",
      "Mentorship available",
      "Biggest prize pool"
    ]
  }
];

export const culturalEvents: DepartmentEvent[] = [
  {
    id: "fashion-show",
    title: "Vogueza -Fashion Show",
    teamSize: 14,
    registrationFee: "₹250 per head (College teams) / ₹350 per head (Other teams)",
    prizePool: "₹75,000",
    details: "Showcase your creativity and style on the grand runway. Teams present themed fashion collections with coordinated choreography, music, and stunning outfits.",
    prizes: ["🥇 ₹50,000", "🥈 ₹25,000"],
    type: "team",
    department: "CULTURAL",
    departmentName: "Cultural Events",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "5:30 PM - 7:30 PM",
    venue: "Auditorium",
    rules: [
      "It is an open-theme show; the event does not specify or prefer any theme requirements. Teams are free to explore and present their concept or style of their choice",
      "It is a team event. A team can have 8-14 members",
      "The time limit for every team would be 15 minutes (including setup and the performance)",
      "Negative marking if participants exceed the time limit",
      "Should carry their tracks in pen drive and should be submitted in advance",
      "Vulgarity is strongly prohibited. Any form of obscenity will lead to debarring the team from the contest",
      "Props may be used to enhance the presentation, but must meet the following conditions: must be safe, non-obstructive, and easily portable. Sharp, heavy or hazardous props are strictly prohibited",
      "Judging Criteria: Participants will be judged based on Costume & Creativity, Ramp Walk & Confidence, Overall Presentation",
      "The decision of the judges will be final and binding",
      "Use of cigarettes, alcohol and any unfair means is strongly prohibited"
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
    title: "TAAL TARANG - Group Dance",
    teamSize: 20,
    registrationFee: "₹250 per head",
    prizePool: "₹75,000",
    details: "Bring the stage alive with synchronized moves and electrifying performances. Any dance form welcome - classical, western, fusion, or folk.",
    prizes: ["🥇 ₹50,000", "🥈 ₹25,000"],
    type: "team",
    department: "CULTURAL",
    departmentName: "Cultural Events",
    image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "3:30 PM - 5:30 PM",
    venue: "Auditorium",
    rules: [
      "Each team must comprise a minimum of 8 members and a maximum of 20 members",
      "Time limit for the performance is 5 to 10 minutes. Exceeding this limit may lead to disqualification",
      "One minute will be allotted for the arrangement of the stage prior to the performance",
      "Each participating college can have only one team under this category",
      "Mixed groups from different colleges are not permitted. All members must represent the same college/institution",
      "Sound track must be in MP3 format",
      "Use of properties that may make the dance floor untidy is strictly prohibited and may result in disqualification",
      "The team has to restore the stage to its original condition within the given time limit",
      "Any form of vulgarity or inappropriate content will lead to immediate disqualification",
      "Judging criteria: Synchronization, choreography, creativity, rhythm, stage presence, and overall presentation",
      "The decision of the judges will be final and binding"
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
    title: "Rhythm -Spot Choreo",
    teamSize: 4,
    registrationFee: "₹100",
    prizePool: "₹4,500",
    details: "A unique synchronization challenge where teams perform choreographed steps in perfect unison. Precision and timing are key to victory.",
    prizes: ["🥇 ₹3,000", "🥈 ₹1,500"],
    type: "team",
    department: "CULTURAL",
    departmentName: "Cultural Events",
    image: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1200&h=600&fit=crop",
    date: "March 27, 2026",
    time: "2:00 PM - 3:30 PM",
    venue: "Auditorium",
    rules: [
      "This is an individual event",
      "Random songs will be played for the contestants",
      "The songs will encompass various languages",
      "All types of dance forms are allowed",
      "Each performance will be allotted a time of 2 minutes",
      "No dangerous props are to be used on stage, such as fire, swords, or knives",
      "Participants must bring a valid ID card on the day of the event",
      "Participants must report at least half an hour prior to the schedule",
      "The decision of the judges will be final and binding"
    ],
    highlights: [
      "Test your coordination",
      "Fun solo challenge",
      "Quick rounds",
      "Exciting format"
    ]
  },
  {
    id: "spot-photography",
    title: "PIXORA - Spot Photography",
    teamSize: 1,
    registrationFee: "₹100",
    prizePool: "₹3,000",
    details: "Capture the essence of the fest through your lens. Registration starts at 10:00 AM on March 27, 2026, and the event runs from 11:00 AM on March 27, 2026 to 11:00 AM on March 28, 2026.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "team",
    department: "CULTURAL",
    departmentName: "Cultural Events",
    image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=1200&h=600&fit=crop",
    date: "March 27-28, 2026",
    time: "Registration: 10:00 AM (Mar 27) | Event: 11:00 AM (Mar 27) - 11:00 AM (Mar 28)",
    venue: "Campus Wide, KMEA Engineering College",
    rules: [
      "General Rules: Competition is open to all registered participants of the tech fest",
      "General Rules: Each participant must carry their own camera or smartphone for photography",
      "General Rules: Theme will be given on the spot and images must be based on that theme",
      "General Rules: Registration starts at 10:00 AM on March 27, 2026",
      "General Rules: The event window is from 11:00 AM on March 27, 2026 to 11:00 AM on March 28, 2026",
      "General Rules: Capture and submit your entry via the drive link shared on event day within this event window",
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
      "Registration: Mar 27, 10:00 AM",
      "Event: Mar 27, 11:00 AM to Mar 28, 11:00 AM",
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
    time: "9:00 AM - 5:00 PM",
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
import { Brain, Bot, Shield, Paintbrush, LucideIcon } from "lucide-react";

export interface FlagshipEvent {
  id: string;
  title: string;
  category: string;
  prize: string;
  mode: string;
  description: string;
  icon: LucideIcon;
  image: string;
  date: string;
  time: string;
  venue: string;
  teamSize: string;
  registrationFee: string;
  highlights: string[];
  rules: string[];
  contact: {
    name: string;
    phone: string;
  };
}

export const flagshipEvents: FlagshipEvent[] = [
  {
    id: "cyber-shield-ctf",
    title: "Cyber Shield CTF",
    category: "Cybersecurity",
    prize: "₹40,000",
    mode: "Capture The Flag",
    description: "Test your cybersecurity skills in this high-stakes Capture The Flag competition. Crack codes, exploit vulnerabilities, and defend systems against attacks. Navigate through challenges in web security, cryptography, reverse engineering, and forensics.",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 4:00 PM",
    venue: "Computer Lab 1 & 2, KMEA Engineering College",
    teamSize: "2-3 members",
    registrationFee: "₹300 per team",
    highlights: [
      "Multiple difficulty levels from beginner to expert",
      "Categories: Web, Crypto, Forensics, Reverse Engineering, Pwn",
      "Real-time scoreboard",
      "Hints available for difficult challenges",
      "Certificates for all participants",
      "Top performers get internship opportunities"
    ],
    rules: [
      "Teams can have 2-3 members",
      "No attacking the CTF infrastructure",
      "No sharing flags between teams",
      "Use of automated tools is allowed",
      "Internet access will be provided",
      "No external help or communication with outsiders",
      "Brute-forcing flags is prohibited",
      "All challenges must be solved ethically",
      "Points are awarded based on difficulty and time"
    ],
    contact: {
      name: "Sneha Nair",
      phone: "+91 76543 21098"
    }
  },
  {
    id: "ui-ux-design-sprint",
    title: "UI/UX Design Sprint",
    category: "Design",
    prize: "₹25,000",
    mode: "6 Hour Sprint",
    description: "A rapid-fire design challenge. Create stunning, user-centric interfaces from a given brief in just 6 hours. Creativity, usability, and aesthetics will be judged. Show off your design thinking and prototyping skills.",
    icon: Paintbrush,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 4:00 PM",
    venue: "Design Studio, KMEA Engineering College",
    teamSize: "2 members",
    registrationFee: "₹200 per team",
    highlights: [
      "Real-world design brief from industry partner",
      "Access to design tools and resources",
      "Mentorship from professional designers",
      "Portfolio-worthy project",
      "Feedback from design jury",
      "Networking with design community"
    ],
    rules: [
      "Teams of 2 members only",
      "Bring your own laptop with design software",
      "Figma, Adobe XD, or Sketch recommended",
      "Design brief will be revealed at the start",
      "No pre-made templates or assets",
      "Must submit interactive prototype",
      "Presentation of design thinking required",
      "Judging: Creativity (30%), Usability (30%), Aesthetics (25%), Presentation (15%)"
    ],
    contact: {
      name: "Priya Sharma",
      phone: "+91 65432 10987"
    }
  }
];

export const getEventById = (id: string): FlagshipEvent | undefined => {
  return flagshipEvents.find(event => event.id === id);
};

// All department events combined
export const allDepartmentEvents: DepartmentEvent[] = [
  ...eceEvents,
  ...sfEvents,
  ...raEvents,
  ...eeeEvents,
  ...meEvents,
  ...ceEvents,
  ...cseEvents,
];

// Helper function to get any department event by ID
export const getDepartmentEventById = (id: string): DepartmentEvent | undefined => {
  return allDepartmentEvents.find(event => event.id === id);
};

// Helper function to get department info from event
export const getDepartmentByEventId = (id: string): { code: string; name: string } | undefined => {
  const event = getDepartmentEventById(id);
  if (event) {
    return { code: event.department, name: event.departmentName };
  }
  return undefined;
};
