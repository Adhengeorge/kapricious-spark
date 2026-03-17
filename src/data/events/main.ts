import { DepartmentEvent } from "./types";

export const mainEvents: DepartmentEvent[] = [
  {
    id: "fashion-show",
    title: "Fashion Show",
<<<<<<< HEAD
    teamSize: 14,
=======
    teamSize: 5,
>>>>>>> a458511 (Changes in admin and addition of events,Venues,Logo)
    registrationFee: "₹250 per head (College teams) / ₹350 per head (Other teams)",
    prizePool: "₹75,000",
    details:
      "Teams present a themed fashion performance featuring an introduction, ramp walk, and final pose. The event evaluates theme representation, costume creativity, stage confidence, and team coordination on the main stage.",
    prizes: ["🥇 ₹50,000", "🥈 ₹25,000"],
    type: "team",
    department: "CULTURAL",
    departmentName: "Cultural Events",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "5:30 PM - 7:30 PM",
    venue: "Auditorium",
    rules: [
<<<<<<< HEAD
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
=======
      "Open to all registered fest participants",
      "Participants must perform in teams",
      "Minimum team size: 5 members",
      "Each team must have a team leader for coordination",
      "Teams must follow the theme provided by the organizers",
      "Teams must report to the venue on time for briefing and coordination",
      "Each team will be given a specific time limit for the ramp walk or performance",
      "Performance should include introduction, ramp walk, and final pose",
      "Background music must be submitted to the organizers before the event",
      "Participants must ensure proper coordination and synchronization",
      "Use of fire, water, or hazardous materials is strictly prohibited",
      "Any vulgarity or inappropriate content will lead to disqualification",
      "Participants are responsible for their costumes and accessories",
      "Judging: theme representation, creativity and innovation, confidence and stage presence, coordination",
      "The judges' decision will be final and binding"
>>>>>>> a458511 (Changes in admin and addition of events,Venues,Logo)
    ],
    highlights: [
      "Theme-based team runway performance",
      "Includes introduction, ramp walk, and final pose",
      "Judged on costume creativity and stage confidence",
      "Largest cultural team prize pool"
    ]
  },
  {
    id: "group-dance",
    title: "Group Dance",
    teamSize: 15,
    registrationFee: "₹250 per head",
    prizePool: "₹75,000",
    details:
      "Bring the stage alive with a coordinated team dance performance across classical, western, fusion, or folk formats while following organizer instructions and fest participation guidelines.",
    prizes: ["🥇 ₹50,000", "🥈 ₹25,000"],
    type: "team",
    department: "CULTURAL",
    departmentName: "Cultural Events",
    image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "3:30 PM - 5:30 PM",
    venue: "Auditorium",
    rules: [
<<<<<<< HEAD
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
=======
      "Open to all registered fest participants",
      "Participants must carry valid ID cards during the event",
      "Registration must be completed before the deadline",
      "Participants must follow all instructions given by the organizers",
      "Team participation applies for this event",
      "Each participant may register for multiple events unless there is a time clash",
      "Substitution of participants is not allowed after registration",
      "Participants must maintain discipline throughout the event",
      "Misconduct, cheating, or unfair means will lead to disqualification",
      "Respect towards judges, organizers, and fellow participants is mandatory",
      "The judges' decision will be final and binding",
      "Results will be announced after evaluation",
      "No disputes regarding results will be entertained",
      "Organizers reserve the right to modify rules if required",
      "Participants are responsible for their belongings",
      "Any damage to property will be the responsibility of the participant"
>>>>>>> a458511 (Changes in admin and addition of events,Venues,Logo)
    ],
    highlights: [
      "Team dance stage event",
      "High-energy auditorium performance slot",
      "Valid for registered fest participants only",
      "Top-tier cultural team prizes"
    ]
  },
  {
    id: "step-in-synchro",
    title: "Rhythm - Spot Choreo",
    teamSize: 5,
    registrationFee: "₹200",
    prizePool: "₹8,000",
    details:
      "Prepare and perform an on-the-spot choreography based on the music or theme provided by the organizers. Rhythm tests creativity, synchronization, adaptability, expression, and stage energy in a fast-turnaround performance format.",
    prizes: ["🥇 ₹5,000", "🥈 ₹3,000"],
    type: "team",
    department: "CULTURAL",
    departmentName: "Cultural Events",
    image: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "2:00 PM - 3:30 PM",
    venue: "Auditorium",
    rules: [
<<<<<<< HEAD
      "Individual event",
      "Random songs will be played for contestants",
      "Songs will cover multiple languages",
      "All dance forms are allowed",
      "Each performance is limited to 2 minutes",
      "No dangerous props (fire, swords, knives)",
      "Bring a valid ID card on event day",
      "Report at least 30 minutes prior to the schedule",
      "Judges' decision is final and binding"
=======
      "Open to all registered fest participants",
      "Solo and team entries are allowed",
      "Team size: 1 to 5 members",
      "Multiple teams from the same college are allowed",
      "Choreography must be prepared on the spot based on the music or theme provided",
      "Preparation time will be given before the performance begins",
      "Performance duration should stay within 3 to 5 minutes",
      "Participants must use the music provided by the organizers",
      "Inappropriate or offensive content is strictly prohibited",
      "Dangerous props or fire are not allowed",
      "Exceeding the time limit may lead to penalties",
      "Any misconduct or rule violation will lead to disqualification",
      "Judging: choreography, synchronization, expression and energy, adaptability",
      "Participants must report to the venue on time",
      "The judges' decision will be final and binding"
>>>>>>> a458511 (Changes in admin and addition of events,Venues,Logo)
    ],
    highlights: [
      "Official event title: Rhythm",
      "Solo or team participation up to 5 members",
      "On-the-spot choreography challenge",
      "Judged on creativity, synchronization, and adaptability"
    ]
  },
  {
    id: "spot-photography",
    title: "Spot Photography - Pixora",
    teamSize: 1,
    registrationFee: "₹100",
    prizePool: "₹3,000",
    details:
      "Capture an original image based on the on-spot theme announcement and submit it within 24 hours. Pixora rewards creativity, technical quality, and how strongly your photograph reflects the given theme and the Kapricious fest spirit.",
    prizes: ["🥇 ₹2,000", "🥈 ₹1,000"],
    type: "individual",
    department: "CULTURAL",
    departmentName: "Cultural Events",
    image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=1200&h=600&fit=crop",
    date: "March 28, 2026",
    time: "10:00 AM - 1:00 PM",
    venue: "Campus Wide, KMEA Engineering College",
    rules: [
<<<<<<< HEAD
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
=======
      "Open to all registered Kapricious participants",
      "Bring your own DSLR camera or high-end smartphone",
      "Theme will be announced on the spot and photos must be taken only after the announcement",
      "One final JPEG image must be submitted per participant within 24 hours using the shared drive link",
      "Minimum image size: 1024 x 768 pixels",
      "Submit both the original unedited image and the final edited version",
      "Heavy manipulation or adding/removing elements is not permitted",
      "Plagiarism, stock images, or pre-taken photos will lead to disqualification",
      "Do not disturb people, animals, or the environment and avoid restricted areas",
      "Judging: creativity and originality, technical quality, and relevance to the theme"
>>>>>>> a458511 (Changes in admin and addition of events,Venues,Logo)
    ],
    highlights: [
      "Official event title: Pixora",
      "24-hour submission window",
      "DSLR or smartphone participation",
      "Judged on originality, technique, and theme relevance"
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
