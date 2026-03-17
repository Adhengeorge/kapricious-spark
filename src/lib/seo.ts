import type { Metadata } from "next";
import {
  allDepartmentEvents,
  flagshipEvents,
  getDepartmentEventById,
  getEventById,
} from "@/data/events";

// ============================================================================
// SITE CONSTANTS
// ============================================================================

export const SITE_NAME = "Kapricious 2026";
export const SITE_TITLE =
  "Kapricious 2026 | Tech Fest at KMEA Engineering College, Edathala, Aluva, Ernakulam";
export const SITE_TAGLINE = "Where Innovation Meets Excellence";

export const DEFAULT_DESCRIPTION =
  "Kapricious 2026 is the flagship tech fest of KMEA Engineering College, Edathala, Aluva, Ernakulam, Kerala. Experience 12-hour Hackathon, Star of Kapricious, Auto Show, coding competitions, robotics, cultural events & more on March 26-28, 2026. Register now for Kerala's biggest engineering college fest!";

export const SHORT_DESCRIPTION =
  "KMEA Engineering College's flagship tech fest featuring Hackathon, Star of Kapricious, Auto Show & 50+ events. March 26-28, 2026 at Edathala, Aluva.";

// ============================================================================
// KEYWORDS - Comprehensive & Location-Optimized
// ============================================================================

export const DEFAULT_KEYWORDS = [
  // Brand Keywords
  "Kapricious 2026",
  "Kapricious",
  "Kapricious KMEA",
  "Kapricious tech fest",
  
  // Institution Keywords
  "KMEA Engineering College",
  "KMEA College",
  "KMEA tech fest",
  "KMEA College fest 2026",
  "KMEA Engineering College Edathala",
  "KMEA College Aluva",
  
  // Location Keywords - Hyper Local
  "tech fest Edathala",
  "tech fest Aluva",
  "tech fest Ernakulam",
  "college fest Ernakulam",
  "engineering fest Kerala",
  "tech fest Kerala 2026",
  "college event Aluva",
  "Edathala events",
  "Aluva college fest",
  "Ernakulam tech events",
  "Kochi tech fest",
  "South India tech fest",
  
  // Event-Specific Keywords
  "12 hour hackathon Kerala",
  "hackathon Ernakulam 2026",
  "Star of Kapricious",
  "auto show college fest",
  "college auto expo Kerala",
  "coding competition Kerala",
  "robotics competition Ernakulam",
  
  // Generic Keywords
  "college tech fest 2026",
  "engineering college fest",
  "student tech event",
  "technical symposium Kerala",
  "intercollegiate fest Kerala",
  "March 2026 tech fest",
  "best tech fest Kerala",
  "flagship events",
  "department events",
  "cultural fest Kerala",
];

export const HACKATHON_KEYWORDS = [
  ...DEFAULT_KEYWORDS,
  "12 hour hackathon",
  "hackathon 2026",
  "hackathon Kerala",
  "hackathon Ernakulam",
  "coding hackathon",
  "overnight hackathon Kerala",
  "student hackathon",
  "engineering hackathon",
  "tech hackathon Aluva",
  "hackathon registration",
  "hackathon prizes",
  "March 26 hackathon",
];

export const STAR_OF_KAPRICIOUS_KEYWORDS = [
  ...DEFAULT_KEYWORDS,
  "Star of Kapricious",
  "talent hunt Kerala",
  "college talent show",
  "main stage event",
  "singing competition Kerala",
  "dance competition Ernakulam",
  "fashion show college",
  "personality contest",
  "college star competition",
];

export const AUTO_SHOW_KEYWORDS = [
  ...DEFAULT_KEYWORDS,
  "auto show Kerala",
  "auto expo Ernakulam",
  "college auto show",
  "bike show Kerala",
  "car exhibition Aluva",
  "modified vehicles show",
  "automobile exhibition",
  "vehicle showcase Kerala",
  "auto enthusiasts meet",
];

// ============================================================================
// ORGANIZATION & VENUE DETAILS
// ============================================================================

const DEFAULT_IMAGE_PATH = "/logo.png";
const LOGO_PATH = "/logo.png";
const ORGANIZATION_NAME = "KMEA Engineering College";
const ORGANIZATION_EMAIL = "kapricious@kmeacollege.ac.in";
const ORGANIZATION_PHONE = "+91-XXXXXXXXXX"; // Add actual phone
const ORGANIZATION_WEBSITE = "https://kmeacollege.ac.in";

const ORGANIZATION_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Edathala",
  addressLocality: "Aluva",
  addressRegion: "Kerala",
  postalCode: "683564",
  addressCountry: "IN",
};

const ORGANIZATION_GEO = {
  "@type": "GeoCoordinates",
  latitude: "10.1070",  // Update with actual coordinates
  longitude: "76.3550", // Update with actual coordinates
};

const VENUE_PLACE = {
  "@type": "Place",
  name: "KMEA Engineering College Campus",
  address: ORGANIZATION_ADDRESS,
  geo: ORGANIZATION_GEO,
};

// ============================================================================
// EVENT DATES & TIMINGS
// ============================================================================

const FEST_START_DATE = "2026-03-26";
const FEST_END_DATE = "2026-03-28";
const HACKATHON_DATE = "2026-03-26";
const HACKATHON_START_TIME = "07:00:00+05:30";
const HACKATHON_END_TIME = "19:00:00+05:30";

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const getSiteUrl = () =>
  trimTrailingSlash(
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000"
  );

export const buildAbsoluteUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const origin = getSiteUrl();
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
};

export const buildCanonicalUrl = (pathname: string) => {
  const normalizedPathname =
    pathname === "/" ? "" : trimTrailingSlash(pathname);
  return `${getSiteUrl()}${normalizedPathname}`;
};

const toIsoDate = (value: string) => {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return undefined;
  }
  return parsedDate.toISOString().split("T")[0];
};

const toIsoDateTime = (date: string, time: string) => `${date}T${time}`;

// ============================================================================
// SCHEMA GENERATORS
// ============================================================================

const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  "@id": `${getSiteUrl()}/#organization`,
  name: ORGANIZATION_NAME,
  alternateName: ["KMEA", "KMEA College", "KMEA Engineering"],
  url: ORGANIZATION_WEBSITE,
  logo: buildAbsoluteUrl(LOGO_PATH),
  email: ORGANIZATION_EMAIL,
  telephone: ORGANIZATION_PHONE,
  address: ORGANIZATION_ADDRESS,
  geo: ORGANIZATION_GEO,
  sameAs: [
    "https://www.facebook.com/kmeacollege",
    "https://www.instagram.com/kmeacollege",
    "https://twitter.com/kmeacollege",
    "https://www.linkedin.com/school/kmea-engineering-college",
  ],
});

const createWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${getSiteUrl()}/#website`,
  name: SITE_NAME,
  alternateName: "Kapricious",
  url: getSiteUrl(),
  description: DEFAULT_DESCRIPTION,
  publisher: {
    "@id": `${getSiteUrl()}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${getSiteUrl()}/events?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

const createFestivalSchema = (canonicalUrl: string, imageUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Festival",
  "@id": `${getSiteUrl()}/#festival`,
  name: SITE_NAME,
  alternateName: "Kapricious Tech Fest 2026",
  description: DEFAULT_DESCRIPTION,
  url: canonicalUrl,
  image: [
    imageUrl,
    buildAbsoluteUrl("/images/fest-banner.jpg"),
    buildAbsoluteUrl("/images/fest-gallery-1.jpg"),
  ],
  startDate: FEST_START_DATE,
  endDate: FEST_END_DATE,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: VENUE_PLACE,
  organizer: {
    "@type": "CollegeOrUniversity",
    name: ORGANIZATION_NAME,
    url: ORGANIZATION_WEBSITE,
    email: ORGANIZATION_EMAIL,
  },
  performer: {
    "@type": "PerformingGroup",
    name: "Various Artists & Participants",
  },
  offers: {
    "@type": "AggregateOffer",
    url: buildAbsoluteUrl("/register"),
    availability: "https://schema.org/InStock",
    priceCurrency: "INR",
    lowPrice: "0",
    highPrice: "500",
    validFrom: "2025-12-01",
  },
  keywords: DEFAULT_KEYWORDS.join(", "),
  inLanguage: ["en", "ml"],
  isAccessibleForFree: false,
  maximumAttendeeCapacity: 5000,
  typicalAgeRange: "16-30",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
});

const createHackathonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Hackathon",
  "@id": `${getSiteUrl()}/event/hackathon#event`,
  name: "Kapricious Hackathon 2026",
  alternateName: "12-Hour Coding Marathon",
  description:
    "Join the ultimate 12-hour hackathon at Kapricious 2026, KMEA Engineering College. Code, innovate, and compete from 7 AM to 7 PM on March 26, 2026. Cash prizes worth ₹50,000+ for winners!",
  url: buildAbsoluteUrl("/event/hackathon"),
  image: buildAbsoluteUrl("/images/hackathon-banner.jpg"),
  startDate: toIsoDateTime(HACKATHON_DATE, HACKATHON_START_TIME),
  endDate: toIsoDateTime(HACKATHON_DATE, HACKATHON_END_TIME),
  duration: "PT12H",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "KMEA Engineering College - Main Auditorium",
    address: ORGANIZATION_ADDRESS,
  },
  organizer: {
    "@type": "CollegeOrUniversity",
    name: ORGANIZATION_NAME,
    email: ORGANIZATION_EMAIL,
  },
  offers: {
    "@type": "Offer",
    url: buildAbsoluteUrl("/register?event=hackathon"),
    price: "200",
    priceCurrency: "INR",
    availability: "https://schema.org/LimitedAvailability",
    validFrom: "2025-12-01",
  },
  performer: {
    "@type": "Person",
    name: "Participating Teams",
  },
  workPerformed: {
    "@type": "SoftwareSourceCode",
    description: "Innovative software solutions developed during the hackathon",
  },
});

const createStarOfKapriciousSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": `${getSiteUrl()}/event/star-of-kapricious#event`,
  name: "Star of Kapricious 2026",
  alternateName: "The Ultimate Talent Hunt",
  description:
    "Star of Kapricious is the flagship talent hunt competition at Kapricious 2026, KMEA Engineering College, Edathala. Showcase your talents in singing, dancing, fashion, and personality on the main stage!",
  url: buildAbsoluteUrl("/event/star-of-kapricious"),
  image: buildAbsoluteUrl("/images/star-of-kapricious-banner.jpg"),
  startDate: "2026-03-27",
  endDate: "2026-03-28",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "KMEA Engineering College - Main Stage",
    address: ORGANIZATION_ADDRESS,
  },
  organizer: {
    "@type": "CollegeOrUniversity",
    name: ORGANIZATION_NAME,
    email: ORGANIZATION_EMAIL,
  },
  superEvent: {
    "@id": `${getSiteUrl()}/#festival`,
  },
});

const createAutoShowSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": `${getSiteUrl()}/event/auto-show#event`,
  name: "Kapricious Auto Show 2026",
  alternateName: "Auto Expo & Vehicle Exhibition",
  description:
    "Experience the spectacular Auto Show at Kapricious 2026 featuring modified bikes, cars, vintage vehicles, and automobile innovations at KMEA Engineering College, Edathala, Ernakulam.",
  url: buildAbsoluteUrl("/event/auto-show"),
  image: buildAbsoluteUrl("/images/auto-show-banner.jpg"),
  startDate: "2026-03-27",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "KMEA Engineering College - Open Ground",
    address: ORGANIZATION_ADDRESS,
  },
  organizer: {
    "@type": "CollegeOrUniversity",
    name: ORGANIZATION_NAME,
    email: ORGANIZATION_EMAIL,
  },
  audience: {
    "@type": "Audience",
    audienceType: "Automobile Enthusiasts",
  },
  superEvent: {
    "@id": `${getSiteUrl()}/#festival`,
  },
});

const createEventListSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Kapricious 2026 Events",
  description:
    "Complete list of events at Kapricious 2026 tech fest including hackathon, Star of Kapricious, auto show, and department events",
  numberOfItems: flagshipEvents.length + allDepartmentEvents.length,
  itemListElement: [
    // Featured Events First
    {
      "@type": "ListItem",
      position: 1,
      name: "12-Hour Hackathon",
      description: "Code for 12 hours straight from 7 AM to 7 PM",
      url: buildAbsoluteUrl("/event/hackathon"),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Star of Kapricious",
      description: "The ultimate talent hunt competition",
      url: buildAbsoluteUrl("/event/star-of-kapricious"),
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Auto Show",
      description: "Exhibition of modified vehicles and automobiles",
      url: buildAbsoluteUrl("/event/auto-show"),
    },
    // Flagship Events
    ...flagshipEvents.map((event, index) => ({
      "@type": "ListItem",
      position: index + 4,
      name: event.title,
      url: buildAbsoluteUrl(`/event/${event.id}`),
    })),
    // Department Events
    ...allDepartmentEvents.map((event, index) => ({
      "@type": "ListItem",
      position: flagshipEvents.length + index + 4,
      name: event.title,
      url: buildAbsoluteUrl(`/events/${event.id}`),
    })),
  ],
});

const createBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

const createFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When is Kapricious 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kapricious 2026 will be held from March 26-28, 2026 at KMEA Engineering College, Edathala, Aluva, Ernakulam.",
      },
    },
    {
      "@type": "Question",
      name: "What is the timing of the hackathon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 12-hour hackathon starts at 7:00 AM and ends at 7:00 PM on March 26, 2026.",
      },
    },
    {
      "@type": "Question",
      name: "How can I register for Kapricious 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can register for Kapricious 2026 events through our official website at the registration page. Select your preferred events and complete the online registration.",
      },
    },
    {
      "@type": "Question",
      name: "Where is KMEA Engineering College located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "KMEA Engineering College is located at Edathala, Aluva, Ernakulam District, Kerala - 683564.",
      },
    },
    {
      "@type": "Question",
      name: "What is Star of Kapricious?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Star of Kapricious is the flagship talent hunt competition featuring rounds of singing, dancing, fashion, and personality assessment to crown the ultimate star.",
      },
    },
    {
      "@type": "Question",
      name: "Is there an auto show at Kapricious?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Kapricious 2026 features an exciting Auto Show with modified bikes, cars, vintage vehicles, and the latest automobile innovations.",
      },
    },
    {
      "@type": "Question",
      name: "Are there prizes for winning events?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all competitive events at Kapricious 2026 have exciting cash prizes and certificates. The hackathon alone has prizes worth ₹50,000+.",
      },
    },
  ],
});

const createLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: ORGANIZATION_NAME,
  alternateName: "KMEA College",
  url: ORGANIZATION_WEBSITE,
  logo: buildAbsoluteUrl(LOGO_PATH),
  image: buildAbsoluteUrl("/images/college-campus.jpg"),
  telephone: ORGANIZATION_PHONE,
  email: ORGANIZATION_EMAIL,
  address: ORGANIZATION_ADDRESS,
  geo: ORGANIZATION_GEO,
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: ORGANIZATION_GEO,
    geoRadius: "50000",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Kapricious 2026 Events",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Event",
          name: "Hackathon",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Event",
          name: "Star of Kapricious",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Event",
          name: "Auto Show",
        },
      },
    ],
  },
});

const createPageSchema = (
  name: string,
  description: string,
  canonicalUrl: string
) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${canonicalUrl}#webpage`,
  name,
  description,
  url: canonicalUrl,
  isPartOf: {
    "@id": `${getSiteUrl()}/#website`,
  },
  about: {
    "@id": `${getSiteUrl()}/#festival`,
  },
  inLanguage: "en-IN",
});

const createEventSchema = ({
  name,
  description,
  canonicalUrl,
  imageUrl,
  startDate,
  endDate,
  venue,
  category,
  offers,
}: {
  name: string;
  description: string;
  canonicalUrl: string;
  imageUrl: string;
  startDate?: string;
  endDate?: string;
  venue: string;
  category?: string;
  offers?: {
    price: string;
    availability: string;
  };
}) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": `${canonicalUrl}#event`,
  name,
  description,
  url: canonicalUrl,
  image: imageUrl,
  ...(startDate ? { startDate } : {}),
  ...(endDate ? { endDate } : {}),
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: venue,
    address: ORGANIZATION_ADDRESS,
  },
  organizer: {
    "@type": "CollegeOrUniversity",
    name: ORGANIZATION_NAME,
    email: ORGANIZATION_EMAIL,
  },
  ...(category ? { category } : {}),
  ...(offers
    ? {
        offers: {
          "@type": "Offer",
          url: `${canonicalUrl}#register`,
          price: offers.price,
          priceCurrency: "INR",
          availability: `https://schema.org/${offers.availability}`,
        },
      }
    : {}),
  superEvent: {
    "@id": `${getSiteUrl()}/#festival`,
  },
});

// ============================================================================
// METADATA BUILDER
// ============================================================================

const buildMetadata = ({
  pathname,
  title,
  description,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE_PATH,
  index = true,
  follow = true,
  type = "website",
}: {
  pathname: string;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  index?: boolean;
  follow?: boolean;
  type?: "website" | "article";
}): Metadata => {
  const canonicalUrl = buildCanonicalUrl(pathname);
  const imageUrl = buildAbsoluteUrl(image);

  return {
    title,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: ORGANIZATION_NAME, url: ORGANIZATION_WEBSITE }],
    creator: ORGANIZATION_NAME,
    publisher: ORGANIZATION_NAME,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-IN": canonicalUrl,
      },
    },
    robots: {
      index,
      follow,
      nocache: !index,
      googleBot: {
        index,
        follow,
        noimageindex: false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type,
      locale: "en_IN",
      siteName: SITE_NAME,
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_NAME}`,
          type: "image/png",
        },
      ],
      countryName: "India",
    },
    twitter: {
      card: "summary_large_image",
      site: "@kmeacollege",
      creator: "@kapricious2026",
      title,
      description,
      images: {
        url: imageUrl,
        alt: `${title} - ${SITE_NAME}`,
      },
    },
    category: "Technology",
    classification: "Education, Technology, Events",
    other: {
      "geo.region": "IN-KL",
      "geo.placename": "Aluva, Ernakulam, Kerala",
      "geo.position": "10.1070;76.3550",
      ICBM: "10.1070, 76.3550",
      "revisit-after": "7 days",
      rating: "General",
      distribution: "Global",
    },
  };
};

// ============================================================================
// PAGE-SPECIFIC METADATA & SCHEMA EXPORTS
// ============================================================================

export const getBaseMetadata = (): Metadata => ({
  metadataBase: new URL(getSiteUrl()),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS.join(", "),
  authors: [{ name: ORGANIZATION_NAME, url: ORGANIZATION_WEBSITE }],
  creator: ORGANIZATION_NAME,
  publisher: ORGANIZATION_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification",
    // bing: "your-bing-verification",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
  },
});

export const getHomeMetadata = () =>
  buildMetadata({
    pathname: "/",
    title: SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
  });

export const getHomeSchema = () => {
  const canonicalUrl = buildCanonicalUrl("/");
  const imageUrl = buildAbsoluteUrl(DEFAULT_IMAGE_PATH);

  return [
    createOrganizationSchema(),
    createWebsiteSchema(),
    createFestivalSchema(canonicalUrl, imageUrl),
    createHackathonSchema(),
    createStarOfKapriciousSchema(),
    createAutoShowSchema(),
    createFAQSchema(),
    createLocalBusinessSchema(),
    createBreadcrumbSchema([
      { name: "Home", url: canonicalUrl },
    ]),
  ];
};

export const getEventsMetadata = () => {
  const description =
    "Explore 50+ events at Kapricious 2026 - 12-hour Hackathon, Star of Kapricious talent hunt, Auto Show, coding competitions, robotics, workshops & cultural events at KMEA Engineering College, Edathala, Aluva, Ernakulam.";

  return buildMetadata({
    pathname: "/events",
    title: "All Events - Hackathon, Star of Kapricious, Auto Show & More",
    description,
    keywords: [
      ...DEFAULT_KEYWORDS,
      "Kapricious events",
      "KMEA event registration",
      "all events list",
      "event schedule",
      "fest events",
    ],
  });
};

export const getEventsSchema = () => {
  const canonicalUrl = buildCanonicalUrl("/events");
  const description =
    "Explore 50+ events at Kapricious 2026 including hackathon, Star of Kapricious, auto show, and department events.";

  return [
    createPageSchema("Kapricious 2026 Events", description, canonicalUrl),
    createEventListSchema(),
    createBreadcrumbSchema([
      { name: "Home", url: getSiteUrl() },
      { name: "Events", url: canonicalUrl },
    ]),
  ];
};

// Hackathon Page
export const getHackathonMetadata = () => {
  const description =
    "Join the ultimate 12-hour hackathon at Kapricious 2026! Code from 7 AM to 7 PM on March 26, 2026 at KMEA Engineering College, Edathala, Aluva. Win prizes worth ₹50,000+. Register now!";

  return buildMetadata({
    pathname: "/event/hackathon",
    title: "12-Hour Hackathon | March 26, 2026 | 7 AM - 7 PM",
    description,
    keywords: HACKATHON_KEYWORDS,
    image: "/images/hackathon-og.png",
  });
};

export const getHackathonSchema = () => {
  const canonicalUrl = buildCanonicalUrl("/event/hackathon");

  return [
    createHackathonSchema(),
    createBreadcrumbSchema([
      { name: "Home", url: getSiteUrl() },
      { name: "Events", url: buildAbsoluteUrl("/events") },
      { name: "Hackathon", url: canonicalUrl },
    ]),
  ];
};

// Star of Kapricious Page
export const getStarOfKapriciousMetadata = () => {
  const description =
    "Star of Kapricious 2026 - The ultimate talent hunt at KMEA Engineering College, Edathala, Aluva. Showcase your talents in singing, dancing, fashion & personality. Win the crown and exciting prizes!";

  return buildMetadata({
    pathname: "/event/star-of-kapricious",
    title: "Star of Kapricious | Talent Hunt Competition",
    description,
    keywords: STAR_OF_KAPRICIOUS_KEYWORDS,
    image: "/images/star-of-kapricious-og.png",
  });
};

export const getStarOfKapriciousSchema = () => {
  const canonicalUrl = buildCanonicalUrl("/event/star-of-kapricious");

  return [
    createStarOfKapriciousSchema(),
    createBreadcrumbSchema([
      { name: "Home", url: getSiteUrl() },
      { name: "Events", url: buildAbsoluteUrl("/events") },
      { name: "Star of Kapricious", url: canonicalUrl },
    ]),
  ];
};

// Auto Show Page
export const getAutoShowMetadata = () => {
  const description =
    "Experience the spectacular Auto Show at Kapricious 2026! Modified bikes, cars, vintage vehicles & automobile innovations at KMEA Engineering College, Edathala, Ernakulam. Free entry for all!";

  return buildMetadata({
    pathname: "/event/auto-show",
    title: "Auto Show | Vehicle Exhibition & Auto Expo",
    description,
    keywords: AUTO_SHOW_KEYWORDS,
    image: "/images/auto-show-og.png",
  });
};

export const getAutoShowSchema = () => {
  const canonicalUrl = buildCanonicalUrl("/event/auto-show");

  return [
    createAutoShowSchema(),
    createBreadcrumbSchema([
      { name: "Home", url: getSiteUrl() },
      { name: "Events", url: buildAbsoluteUrl("/events") },
      { name: "Auto Show", url: canonicalUrl },
    ]),
  ];
};

export const getRegisterMetadata = () => {
  const description =
    "Register now for Kapricious 2026 events at KMEA Engineering College, Edathala, Aluva, Ernakulam. Easy online registration for hackathon, Star of Kapricious, auto show & 50+ events. Limited slots available!";

  return buildMetadata({
    pathname: "/register",
    title: "Register for Events | Easy Online Registration",
    description,
    keywords: [
      ...DEFAULT_KEYWORDS,
      "Kapricious registration",
      "KMEA fest registration",
      "event registration",
      "online registration",
      "register now",
      "hackathon registration",
    ],
  });
};

export const getRegisterSchema = () => {
  const canonicalUrl = buildCanonicalUrl("/register");
  const description =
    "Register for Kapricious 2026 events at KMEA Engineering College.";

  return [
    createPageSchema("Kapricious 2026 Registration", description, canonicalUrl),
    createBreadcrumbSchema([
      { name: "Home", url: getSiteUrl() },
      { name: "Register", url: canonicalUrl },
    ]),
  ];
};

export const getScheduleMetadata = () => {
  const description =
    "Complete schedule and timeline for Kapricious 2026 - March 26-28, 2026. Day-wise event schedule including hackathon (7 AM - 7 PM), Star of Kapricious, auto show & all events at KMEA Engineering College.";

  return buildMetadata({
    pathname: "/schedule",
    title: "Event Schedule | March 26-28, 2026 Timetable",
    description,
    keywords: [
      ...DEFAULT_KEYWORDS,
      "event schedule",
      "fest timetable",
      "event timing",
      "March 2026 schedule",
    ],
  });
};

export const getScheduleSchema = () => {
  const canonicalUrl = buildCanonicalUrl("/schedule");
  
  return [
    {
      "@context": "https://schema.org",
      "@type": "Schedule",
      name: "Kapricious 2026 Event Schedule",
      scheduleTimezone: "Asia/Kolkata",
      byDay: ["Thursday", "Friday", "Saturday"],
      startDate: FEST_START_DATE,
      endDate: FEST_END_DATE,
      repeatCount: 1,
    },
    createBreadcrumbSchema([
      { name: "Home", url: getSiteUrl() },
      { name: "Schedule", url: canonicalUrl },
    ]),
  ];
};

export const getCertificateMetadata = () => {
  const description =
    "Download your Kapricious 2026 participation and winner certificates. Enter your registration ID to find and download certificates from the official KMEA Engineering College fest portal.";

  return buildMetadata({
    pathname: "/certificate",
    title: "Download Certificates | Participation & Winner Certificates",
    description,
    index: false,
    follow: true,
  });
};

export const getCertificateSchema = () => {
  const canonicalUrl = buildCanonicalUrl("/certificate");
  
  return [
    createPageSchema(
      "Kapricious 2026 Certificates",
      "Download Kapricious 2026 participation certificates",
      canonicalUrl
    ),
    createBreadcrumbSchema([
      { name: "Home", url: getSiteUrl() },
      { name: "Certificates", url: canonicalUrl },
    ]),
  ];
};

export const getContactMetadata = () => {
  const description =
    "Contact Kapricious 2026 organizing team at KMEA Engineering College, Edathala, Aluva, Ernakulam. Get directions, phone numbers, email addresses & social media links. We're here to help!";

  return buildMetadata({
    pathname: "/contact",
    title: "Contact Us | Get in Touch",
    description,
    keywords: [
      ...DEFAULT_KEYWORDS,
      "contact",
      "phone number",
      "email",
      "directions",
      "reach KMEA",
      "how to reach",
    ],
  });
};

export const getContactSchema = () => {
  const canonicalUrl = buildCanonicalUrl("/contact");
  
  return [
    createPageSchema(
      "Contact Kapricious 2026",
      "Contact information for Kapricious 2026",
      canonicalUrl
    ),
    createLocalBusinessSchema(),
    createBreadcrumbSchema([
      { name: "Home", url: getSiteUrl() },
      { name: "Contact", url: canonicalUrl },
    ]),
  ];
};

export const getAboutMetadata = () => {
  const description =
    "Learn about Kapricious 2026 - the flagship tech fest of KMEA Engineering College since 2010. Discover our history, mission, and what makes us Kerala's most exciting engineering college fest.";

  return buildMetadata({
    pathname: "/about",
    title: "About Kapricious | Our Story & Mission",
    description,
    keywords: [
      ...DEFAULT_KEYWORDS,
      "about kapricious",
      "fest history",
      "KMEA history",
      "our story",
    ],
  });
};

export const getGalleryMetadata = () => {
  const description =
    "View photos and videos from previous Kapricious editions. Relive the memories of hackathons, cultural events, auto shows & more at KMEA Engineering College, Edathala, Aluva.";

  return buildMetadata({
    pathname: "/gallery",
    title: "Photo Gallery | Memories from Previous Years",
    description,
    keywords: [
      ...DEFAULT_KEYWORDS,
      "photos",
      "gallery",
      "images",
      "videos",
      "previous years",
    ],
  });
};

export const getAdminMetadata = (
  pathname: "/admin" | "/admin/dashboard"
): Metadata =>
  buildMetadata({
    pathname,
    title: "Admin Portal",
    description: "Kapricious 2026 admin portal for event management.",
    index: false,
    follow: false,
  });

export const getAdminSchema = (pathname: "/admin" | "/admin/dashboard") =>
  createPageSchema(
    "Kapricious 2026 Admin",
    "Admin portal",
    buildCanonicalUrl(pathname)
  );

export const getDepartmentListingMetadata = (deptId: string, deptName?: string) => {
  const name = deptName || deptId.toUpperCase();
  const description = `Explore ${name} department events at Kapricious 2026, KMEA Engineering College, Edathala, Aluva. Competitions, workshops & technical events for ${name} students.`;

  return buildMetadata({
    pathname: `/departments/${deptId}`,
    title: `${name} Department Events`,
    description,
    keywords: [
      ...DEFAULT_KEYWORDS,
      `${name} events`,
      `${name} competition`,
      `${deptId} department`,
    ],
    index: true,
    follow: true,
  });
};

export const getDepartmentListingSchema = (deptId: string, deptName?: string) => {
  const name = deptName || deptId.toUpperCase();
  const canonicalUrl = buildCanonicalUrl(`/departments/${deptId}`);
  
  return [
    createPageSchema(
      `${name} Department Events - Kapricious 2026`,
      `${name} department events at Kapricious 2026`,
      canonicalUrl
    ),
    createBreadcrumbSchema([
      { name: "Home", url: getSiteUrl() },
      { name: "Events", url: buildAbsoluteUrl("/events") },
      { name: `${name} Department`, url: canonicalUrl },
    ]),
  ];
};

export const getFlagshipEventMetadata = (eventId: string) => {
  const event = getEventById(eventId);

  if (!event) {
    return getNotFoundMetadata(`/event/${eventId}`);
  }

  const description = `${event.title} - A flagship ${event.category.toLowerCase()} event at Kapricious 2026, KMEA Engineering College, Edathala, Aluva, Ernakulam. Date: ${event.date} | Venue: ${event.venue} | Register now for exciting prizes!`;

  return buildMetadata({
    pathname: `/event/${event.id}`,
    title: `${event.title} | Flagship Event`,
    description,
    keywords: [
      ...DEFAULT_KEYWORDS,
      event.title,
      event.category,
      "KMEA flagship event",
      `${event.title} registration`,
      `${event.title} prizes`,
    ],
    image: event.image,
  });
};

export const getFlagshipEventSchema = (eventId: string) => {
  const event = getEventById(eventId);

  if (!event) {
    return getNotFoundSchema(`/event/${eventId}`);
  }

  const canonicalUrl = buildCanonicalUrl(`/event/${event.id}`);
  const description = `${event.title} - A flagship ${event.category.toLowerCase()} event at Kapricious 2026.`;

  return [
    createEventSchema({
      name: event.title,
      description,
      canonicalUrl,
      imageUrl: buildAbsoluteUrl(event.image),
      startDate: toIsoDate(event.date),
      venue: event.venue,
      category: event.category,
    }),
    createBreadcrumbSchema([
      { name: "Home", url: getSiteUrl() },
      { name: "Events", url: buildAbsoluteUrl("/events") },
      { name: event.title, url: canonicalUrl },
    ]),
  ];
};

export const getDepartmentEventMetadata = (eventId: string) => {
  const event = getDepartmentEventById(eventId);

  if (!event) {
    return getNotFoundMetadata(`/events/${eventId}`);
  }

  const description = `${event.title} - A ${event.departmentName} event at Kapricious 2026, KMEA Engineering College, Edathala, Aluva, Ernakulam. Date: ${event.date} | Venue: ${event.venue} | Prize: ${event.prizePool || "Exciting prizes"} | Register now!`;

  return buildMetadata({
    pathname: `/events/${event.id}`,
    title: `${event.title} | ${event.departmentName}`,
    description,
    keywords: [
      ...DEFAULT_KEYWORDS,
      event.title,
      event.departmentName,
      `${event.departmentName} event`,
      `${event.title} registration`,
    ],
    image: event.image,
  });
};

export const getDepartmentEventSchema = (eventId: string) => {
  const event = getDepartmentEventById(eventId);

  if (!event) {
    return getNotFoundSchema(`/events/${eventId}`);
  }

  const canonicalUrl = buildCanonicalUrl(`/events/${event.id}`);
  const description = `${event.title} - A ${event.departmentName} event at Kapricious 2026.`;

  return [
    createEventSchema({
      name: event.title,
      description,
      canonicalUrl,
      imageUrl: buildAbsoluteUrl(event.image),
      startDate: toIsoDate(event.date),
      venue: event.venue,
      category: event.departmentName,
    }),
    createBreadcrumbSchema([
      { name: "Home", url: getSiteUrl() },
      { name: "Events", url: buildAbsoluteUrl("/events") },
      { name: event.departmentName, url: buildAbsoluteUrl("/events") },
      { name: event.title, url: canonicalUrl },
    ]),
  ];
};

export const getNotFoundMetadata = (pathname = "/404") =>
  buildMetadata({
    pathname,
    title: "Page Not Found",
    description:
      "Oops! The page you're looking for doesn't exist. Explore Kapricious 2026 events, register for hackathon, Star of Kapricious & more at KMEA Engineering College.",
    index: false,
    follow: true,
  });

export const getNotFoundSchema = (pathname = "/404") =>
  createPageSchema(
    "Page Not Found - Kapricious 2026",
    "Page not found on Kapricious 2026 website",
    buildCanonicalUrl(pathname)
  );

// ============================================================================
// SITEMAP HELPER
// ============================================================================

export const generateSitemapUrls = () => {
  const staticPages = [
    { url: "/", priority: 1.0, changeFrequency: "daily" as const },
    { url: "/events", priority: 0.9, changeFrequency: "daily" as const },
    { url: "/register", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/schedule", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/event/hackathon", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/event/star-of-kapricious", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/event/auto-show", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/gallery", priority: 0.5, changeFrequency: "weekly" as const },
  ];

  const flagshipEventPages = flagshipEvents.map((event) => ({
    url: `/event/${event.id}`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
  }));

  const departmentEventPages = allDepartmentEvents.map((event) => ({
    url: `/events/${event.id}`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
  }));

  return [...staticPages, ...flagshipEventPages, ...departmentEventPages];
};
