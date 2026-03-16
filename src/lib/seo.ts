import type { Metadata } from "next";
import {
  allDepartmentEvents,
  flagshipEvents,
  getDepartmentEventById,
  getEventById,
} from "@/data/events";

export const SITE_NAME = "Kapricious 2026";
export const SITE_TITLE =
  "Kapricious 2026 | Tech Fest at KMEA Engineering College, Edathala, Aluva";
export const DEFAULT_DESCRIPTION =
  "Kapricious 2026 is the flagship tech fest of KMEA Engineering College, Edathala, Aluva, Kerala. Explore flagship events, department competitions, cultural events, and registrations for March 27-28, 2026.";
export const DEFAULT_KEYWORDS = [
  "Kapricious 2026",
  "KMEA tech fest",
  "KMEA Engineering College",
  "KMEA College Edathala",
  "Edathala Aluva tech fest",
  "Kerala engineering college fest",
  "college tech fest 2026",
  "department events",
  "talent showcase",
  "main stage events",
];
const DEFAULT_IMAGE_PATH = "/logo.png";
const ORGANIZATION_NAME = "KMEA Engineering College";
const ORGANIZATION_EMAIL = "kapricious@kmeacollege.ac.in";
const ORGANIZATION_ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: "Aluva",
  addressRegion: "Kerala",
  addressCountry: "IN",
};
const VENUE_PLACE = {
  "@type": "Place",
  name: "KMEA Engineering College",
  address: ORGANIZATION_ADDRESS,
};

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const getSiteUrl = () =>
  trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000");

export const buildAbsoluteUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const origin = getSiteUrl();
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
};

export const buildCanonicalUrl = (pathname: string) => {
  const normalizedPathname = pathname === "/" ? "" : trimTrailingSlash(pathname);
  return `${getSiteUrl()}${normalizedPathname}`;
};

const toIsoDate = (value: string) => {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return undefined;
  }

  return parsedDate.toISOString().split("T")[0];
};

const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  name: ORGANIZATION_NAME,
  url: getSiteUrl(),
  email: ORGANIZATION_EMAIL,
  address: ORGANIZATION_ADDRESS,
});

const createWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: getSiteUrl(),
  description: DEFAULT_DESCRIPTION,
});

const createFestivalSchema = (canonicalUrl: string, imageUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Festival",
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  url: canonicalUrl,
  image: imageUrl,
  startDate: "2026-03-27",
  endDate: "2026-03-28",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: VENUE_PLACE,
  organizer: {
    "@type": "CollegeOrUniversity",
    name: ORGANIZATION_NAME,
    url: getSiteUrl(),
    email: ORGANIZATION_EMAIL,
  },
});

const createEventListSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Kapricious 2026 Events",
  itemListElement: [
    ...flagshipEvents.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: event.title,
      url: buildAbsoluteUrl(`/event/${event.id}`),
    })),
    ...allDepartmentEvents.map((event, index) => ({
      "@type": "ListItem",
      position: flagshipEvents.length + index + 1,
      name: event.title,
      url: buildAbsoluteUrl(`/events/${event.id}`),
    })),
  ],
});

const createPageSchema = (name: string, description: string, canonicalUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name,
  description,
  url: canonicalUrl,
});

const createEventSchema = ({
  name,
  description,
  canonicalUrl,
  imageUrl,
  startDate,
  venue,
}: {
  name: string;
  description: string;
  canonicalUrl: string;
  imageUrl: string;
  startDate?: string;
  venue: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name,
  description,
  url: canonicalUrl,
  image: imageUrl,
  ...(startDate ? { startDate } : {}),
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
});

const buildMetadata = ({
  pathname,
  title,
  description,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE_PATH,
  index = true,
  follow = true,
}: {
  pathname: string;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  index?: boolean;
  follow?: boolean;
}): Metadata => {
  const canonicalUrl = buildCanonicalUrl(pathname);
  const imageUrl = buildAbsoluteUrl(image);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index,
      follow,
      googleBot: {
        index,
        follow,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          alt: `${SITE_NAME} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
};

export const getBaseMetadata = (): Metadata => ({
  metadataBase: new URL(getSiteUrl()),
  applicationName: SITE_NAME,
  title: SITE_TITLE,
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
  ];
};

export const getEventsMetadata = () => {
  const description =
    "Browse flagship events, department competitions, workshops, and cultural event highlights at Kapricious 2026, KMEA Engineering College, Edathala, Aluva.";

  return buildMetadata({
    pathname: "/events",
    title: `Events | ${SITE_NAME}`,
    description,
    keywords: [...DEFAULT_KEYWORDS, "Kapricious events", "KMEA event registration"],
  });
};

export const getEventsSchema = () => {
  const canonicalUrl = buildCanonicalUrl("/events");
  const description =
    "Browse flagship events, department competitions, workshops, and cultural event highlights at Kapricious 2026, KMEA Engineering College, Edathala, Aluva.";

  return [
    createPageSchema("Kapricious 2026 Events", description, canonicalUrl),
    createEventListSchema(),
  ];
};

export const getRegisterMetadata = () => {
  const description =
    "Register for Kapricious 2026 events at KMEA Engineering College, Edathala, Aluva. Choose your category, event, and complete your fest registration online.";

  return buildMetadata({
    pathname: "/register",
    title: `Register | ${SITE_NAME}`,
    description,
    keywords: [...DEFAULT_KEYWORDS, "Kapricious registration", "KMEA fest registration"],
  });
};

export const getRegisterSchema = () => {
  const description =
    "Register for Kapricious 2026 events at KMEA Engineering College, Edathala, Aluva. Choose your category, event, and complete your fest registration online.";

  return createPageSchema(
    "Kapricious 2026 Registration",
    description,
    buildCanonicalUrl("/register"),
  );
};

export const getCertificateMetadata = () => {
  const description =
    "Find and download Kapricious 2026 participation certificates from the official KMEA Engineering College fest portal.";

  return buildMetadata({
    pathname: "/certificate",
    title: `Certificates | ${SITE_NAME}`,
    description,
    index: false,
    follow: false,
  });
};

export const getCertificateSchema = () =>
  createPageSchema(
    "Kapricious 2026 Certificates",
    "Find and download Kapricious 2026 participation certificates from the official KMEA Engineering College fest portal.",
    buildCanonicalUrl("/certificate"),
  );

export const getAdminMetadata = (pathname: "/admin" | "/admin/dashboard") =>
  buildMetadata({
    pathname,
    title: `Admin | ${SITE_NAME}`,
    description: "Kapricious 2026 admin portal.",
    index: false,
    follow: false,
  });

export const getAdminSchema = (pathname: "/admin" | "/admin/dashboard") =>
  createPageSchema("Kapricious 2026 Admin", "Kapricious 2026 admin portal", buildCanonicalUrl(pathname));

export const getDepartmentListingMetadata = (deptId: string) => {
  const description =
    "Department-specific Kapricious 2026 event listings for KMEA Engineering College, Edathala, Aluva.";

  return buildMetadata({
    pathname: `/departments/${deptId}`,
    title: `Department Events | ${SITE_NAME}`,
    description,
    follow: true,
    index: false,
  });
};

export const getDepartmentListingSchema = (deptId: string) =>
  createPageSchema(
    "Kapricious 2026 Department Events",
    "Department-specific Kapricious 2026 event listings for KMEA Engineering College, Edathala, Aluva.",
    buildCanonicalUrl(`/departments/${deptId}`),
  );

export const getFlagshipEventMetadata = (eventId: string) => {
  const event = getEventById(eventId);

  if (!event) {
    return getNotFoundMetadata(`/event/${eventId}`);
  }

  const description = `${event.title} is a flagship ${event.category.toLowerCase()} event at Kapricious 2026, the tech fest of KMEA Engineering College, Edathala, Aluva. View the venue, schedule, prize, and registration details.`;

  return buildMetadata({
    pathname: `/event/${event.id}`,
    title: `${event.title} | Kapricious 2026 Flagship Event`,
    description,
    keywords: [...DEFAULT_KEYWORDS, event.title, event.category, "KMEA flagship event"],
    image: event.image,
  });
};

export const getFlagshipEventSchema = (eventId: string) => {
  const event = getEventById(eventId);

  if (!event) {
    return getNotFoundSchema(`/event/${eventId}`);
  }

  const description = `${event.title} is a flagship ${event.category.toLowerCase()} event at Kapricious 2026, the tech fest of KMEA Engineering College, Edathala, Aluva. View the venue, schedule, prize, and registration details.`;

  return createEventSchema({
    name: event.title,
    description,
    canonicalUrl: buildCanonicalUrl(`/event/${event.id}`),
    imageUrl: buildAbsoluteUrl(event.image),
    startDate: toIsoDate(event.date),
    venue: event.venue,
  });
};

export const getDepartmentEventMetadata = (eventId: string) => {
  const event = getDepartmentEventById(eventId);

  if (!event) {
    return getNotFoundMetadata(`/events/${eventId}`);
  }

  const description = `${event.title} is a ${event.departmentName} event at Kapricious 2026, the tech fest of KMEA Engineering College, Edathala, Aluva. Check the date, venue, prize pool, rules, and registration details.`;

  return buildMetadata({
    pathname: `/events/${event.id}`,
    title: `${event.title} | ${event.departmentName} Event | Kapricious 2026`,
    description,
    keywords: [
      ...DEFAULT_KEYWORDS,
      event.title,
      event.departmentName,
      `${event.departmentName} event`,
    ],
    image: event.image,
  });
};

export const getDepartmentEventSchema = (eventId: string) => {
  const event = getDepartmentEventById(eventId);

  if (!event) {
    return getNotFoundSchema(`/events/${eventId}`);
  }

  const description = `${event.title} is a ${event.departmentName} event at Kapricious 2026, the tech fest of KMEA Engineering College, Edathala, Aluva. Check the date, venue, prize pool, rules, and registration details.`;

  return createEventSchema({
    name: event.title,
    description,
    canonicalUrl: buildCanonicalUrl(`/events/${event.id}`),
    imageUrl: buildAbsoluteUrl(event.image),
    startDate: toIsoDate(event.date),
    venue: event.venue,
  });
};

export const getNotFoundMetadata = (pathname = "/404") =>
  buildMetadata({
    pathname,
    title: `Page Not Found | ${SITE_NAME}`,
    description: "The page you are looking for could not be found on the Kapricious 2026 website.",
    index: false,
    follow: false,
  });

export const getNotFoundSchema = (pathname = "/404") =>
  createPageSchema(
    "Page Not Found",
    "Kapricious 2026 page not found",
    buildCanonicalUrl(pathname),
  );
