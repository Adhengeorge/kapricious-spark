"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { User, Mail, Phone, GraduationCap, Layers, Calendar, CheckCircle2, CreditCard, ShieldCheck, ArrowRight, Trophy, Sparkles, Zap, Users, AlertTriangle, Loader2 } from "lucide-react";
import { flagshipEvents, getEventById, mainEvents, managerialEvents, sportsEvents, cseEvents, ceEvents, meEvents, eeeEvents, raEvents, sfEvents, eceEvents, sortDepartmentEventsByPrizePool } from "@/data/events/index";

const FLAGSHIP_DEPT_ID = "flagship";
const SPORTS_DEPT_ID = "sports";
const LIMITED_EVENT_IDS = new Set(["hackathon", "tech-escape-room"]);
const DEFAULT_SLOT_LIMIT_BY_EVENT: Record<string, number> = {
  hackathon: 10,
  "tech-escape-room": 15,
};
const MIN_TEAM_SIZE_BY_EVENT: Record<string, number> = {
  "fashion-show": 8,
  "group-dance": 8,
  hackathon: 2,
  "kabaddi-tournament": 7,
  "sevens-football-tournament": 7,
  "tech-escape-room": 2,
};
const RAZORPAY_CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

type RazorpayPaymentProof = {
  orderId: string;
  paymentId: string;
  signature: string;
  amountRupees: number;
  currency: string;
  gatewayStatus: string;
};

type RazorpayCheckoutResult = {
  orderId: string;
  paymentId: string;
  signature: string;
};

type RegistrationMutationInput = {
  paymentProofOverride?: RazorpayPaymentProof | null;
};

type CouponData = {
  registrationId: string;
  participantName: string;
  participantEmail: string;
  eventName: string;
  eventDate: string;
  venue: string;
  issuedAt: string;
  entryCode: string;
  teamCount: number;
  eventCategory: string;
  eventImage?: string;
};

declare global {
  interface Window {
    Razorpay?: any;
  }
}

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Invalid phone number").max(15),
  college: z.string().trim().min(1, "College is required").max(200),
});

const loadRazorpayCheckout = async () => {
  if (typeof window === "undefined") return false;
  if (window.Razorpay) return true;

  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = RAZORPAY_CHECKOUT_SRC;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const parseFeeToRupees = (fee: string, teamSize: number) => {
  if (!fee) return 0;
  if (/free|nil|none/i.test(fee)) return 0;

  const amountMatch = fee.replace(/,/g, "").match(/(\d+)/);
  if (!amountMatch) return 0;

  const baseAmount = Number(amountMatch[1]);
  const perHead = /per\s*(head|participant|member)/i.test(fee);
  return perHead ? baseAmount * Math.max(teamSize, 1) : baseAmount;
};

const getDefaultSlotLimit = (eventId: string) => DEFAULT_SLOT_LIMIT_BY_EVENT[eventId] ?? 10;

const buildEntryCodeFromRegistrationId = (registrationId: string) =>
  `KAP-${registrationId.replace(/-/g, "").substring(0, 8).toUpperCase()}`;

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const base64Encode = (bytes: Uint8Array) => {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
};

const base64ToBytes = (base64: string) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

const fetchAsDataUrl = async (url?: string, fallbackType = "image/png") => {
  if (!url) return null;
  const res = await fetch(url);
  if (!res.ok) return null;
  const contentType = res.headers.get("content-type") || fallbackType;
  const bytes = new Uint8Array(await res.arrayBuffer());
  return `data:${contentType};base64,${base64Encode(bytes)}`;
};

const buildCouponSvg = (coupon: CouponData, qrDataUrl: string, eventImageDataUrl: string | null) => {
  const canonicalEntryCode = buildEntryCodeFromRegistrationId(coupon.registrationId);
  const safeName = escapeXml(coupon.participantName);
  const safeEventName = escapeXml(coupon.eventName);
  const safeVenue = escapeXml(coupon.venue || "TBA");
  const safeDate = escapeXml(coupon.eventDate || "TBA");
  const safeCategory = escapeXml(coupon.eventCategory || "Event");
  const teamLabel = escapeXml(coupon.teamCount > 1 ? `${coupon.teamCount} members` : "Individual");
  const regLabel = escapeXml(coupon.registrationId.substring(0, 8).toUpperCase());
  const codeLabel = escapeXml(canonicalEntryCode);
  const fallbackImage =
    "data:image/svg+xml;base64," +
    base64Encode(
      new TextEncoder().encode(
        `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="100%" height="100%" fill="#1f2937"/><text x="50%" y="50%" fill="#f9fafb" font-family="Arial" font-size="20" text-anchor="middle">Kapricious 2026</text></svg>`,
      ),
    );
  const eventImage = eventImageDataUrl || fallbackImage;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="675" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="60" y1="60" x2="1140" y2="615" gradientUnits="userSpaceOnUse">
      <stop stop-color="#111827"/>
      <stop offset="1" stop-color="#1F2937"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#F6D28A"/>
      <stop offset="1" stop-color="#E7A93E"/>
    </linearGradient>
    <clipPath id="posterClip"><rect x="720" y="122" width="390" height="220" rx="28"/></clipPath>
  </defs>
  <rect width="1200" height="675" rx="38" fill="#EDE4D6"/>
  <rect x="18" y="18" width="1164" height="639" rx="30" fill="url(#bg)"/>
  <rect x="60" y="60" width="1080" height="555" rx="28" fill="#0F172A" stroke="#334155"/>
  <rect x="60" y="60" width="1080" height="92" rx="28" fill="url(#accent)"/>
  <text x="96" y="110" fill="#111827" font-family="Arial" font-size="20" font-weight="700" letter-spacing="4">KAPRICIOUS 2026</text>
  <text x="96" y="136" fill="#3F2E0F" font-family="Arial" font-size="38" font-weight="700">EVENT COUPON</text>
  <text x="865" y="115" fill="#3F2E0F" font-family="Arial" font-size="16" font-weight="700" letter-spacing="3">ENTRY CODE</text>
  <text x="865" y="142" fill="#111827" font-family="monospace" font-size="28" font-weight="700">${codeLabel}</text>
  <text x="96" y="210" fill="#94A3B8" font-family="Arial" font-size="14" font-weight="700" letter-spacing="3">REGISTERED PARTICIPANT</text>
  <text x="96" y="248" fill="#F8FAFC" font-family="Arial" font-size="34" font-weight="700">${safeName}</text>
  <text x="96" y="302" fill="#94A3B8" font-family="Arial" font-size="14" font-weight="700" letter-spacing="3">EVENT</text>
  <text x="96" y="340" fill="#F8FAFC" font-family="Arial" font-size="30" font-weight="700">${safeEventName}</text>
  <text x="96" y="374" fill="#CBD5E1" font-family="Arial" font-size="18">${safeCategory}</text>
  <rect x="96" y="420" width="250" height="90" rx="20" fill="#111827" stroke="#334155"/>
  <text x="120" y="455" fill="#94A3B8" font-family="Arial" font-size="13" font-weight="700" letter-spacing="2">EVENT DATE</text>
  <text x="120" y="487" fill="#F8FAFC" font-family="Arial" font-size="22" font-weight="700">${safeDate}</text>
  <rect x="368" y="420" width="300" height="90" rx="20" fill="#111827" stroke="#334155"/>
  <text x="392" y="455" fill="#94A3B8" font-family="Arial" font-size="13" font-weight="700" letter-spacing="2">VENUE</text>
  <text x="392" y="487" fill="#F8FAFC" font-family="Arial" font-size="22" font-weight="700">${safeVenue}</text>
  <rect x="96" y="530" width="250" height="52" rx="18" fill="#111827" stroke="#334155"/>
  <text x="120" y="562" fill="#94A3B8" font-family="Arial" font-size="13" font-weight="700" letter-spacing="2">TEAM SIZE</text>
  <text x="244" y="562" fill="#F8FAFC" font-family="Arial" font-size="18" font-weight="700">${teamLabel}</text>
  <rect x="368" y="530" width="300" height="52" rx="18" fill="#111827" stroke="#334155"/>
  <text x="392" y="562" fill="#94A3B8" font-family="Arial" font-size="13" font-weight="700" letter-spacing="2">REG ID</text>
  <text x="480" y="562" fill="#F8FAFC" font-family="monospace" font-size="18" font-weight="700">${regLabel}</text>
  <rect x="720" y="122" width="390" height="220" rx="28" fill="#0B1220" stroke="#334155"/>
  <image href="${eventImage}" x="720" y="122" width="390" height="220" preserveAspectRatio="xMidYMid slice" clip-path="url(#posterClip)"/>
  <rect x="720" y="374" width="170" height="170" rx="24" fill="#F8FAFC"/>
  <image href="${qrDataUrl}" x="737" y="391" width="136" height="136"/>
  <text x="912" y="430" fill="#94A3B8" font-family="Arial" font-size="13" font-weight="700" letter-spacing="2">SCAN AT ENTRY</text>
  <text x="912" y="466" fill="#F8FAFC" font-family="Arial" font-size="24" font-weight="700">Kapricious Pass</text>
  <text x="912" y="500" fill="#CBD5E1" font-family="Arial" font-size="16">Use this QR and code at check-in.</text>
  <text x="912" y="540" fill="#EAB308" font-family="Arial" font-size="14" font-weight="700">Carry this coupon with you.</text>
  <text x="96" y="615" fill="#64748B" font-family="Arial" font-size="14">KMEA Engineering College - Official event coupon for venue verification</text>
</svg>`;
};

const renderSvgToJpeg = async (svg: string, width = 1200, height = 675) => {
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Failed to render coupon artwork."));
      image.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not available for coupon generation.");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", 0.95);
  } finally {
    URL.revokeObjectURL(url);
  }
};

const buildPdfFromJpegDataUrl = (jpegDataUrl: string, width = 1200, height = 675) => {
  const [, base64] = jpegDataUrl.split(",", 2);
  const jpegBytes = base64ToBytes(base64);
  const enc = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets: number[] = [0];
  let length = 0;

  const pushText = (text: string) => {
    const bytes = enc.encode(text);
    chunks.push(bytes);
    length += bytes.length;
  };
  const pushBytes = (bytes: Uint8Array) => {
    chunks.push(bytes);
    length += bytes.length;
  };
  const mark = () => offsets.push(length);

  pushText("%PDF-1.4\n");
  mark();
  pushText("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
  mark();
  pushText("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");
  mark();
  pushText(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>\nendobj\n`);
  const content = `q\n${width} 0 0 ${height} 0 0 cm\n/Im0 Do\nQ`;
  mark();
  pushText(`4 0 obj\n<< /Length ${enc.encode(content).length} >>\nstream\n${content}\nendstream\nendobj\n`);
  mark();
  pushText(`5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`);
  pushBytes(jpegBytes);
  pushText("\nendstream\nendobj\n");

  const xrefOffset = length;
  pushText("xref\n0 6\n0000000000 65535 f \n");
  for (let i = 1; i <= 5; i++) {
    pushText(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`);
  }
  pushText(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);

  return new Blob(chunks, { type: "application/pdf" });
};

const downloadDesignedCouponPdf = async (coupon: CouponData) => {
  const canonicalEntryCode = buildEntryCodeFromRegistrationId(coupon.registrationId);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(canonicalEntryCode)}&bgcolor=ffffff&color=111827`;
  const [qrDataUrl, eventImageDataUrl] = await Promise.all([
    fetchAsDataUrl(qrUrl, "image/png"),
    fetchAsDataUrl(coupon.eventImage, "image/jpeg"),
  ]);
  if (!qrDataUrl) throw new Error("Unable to generate coupon QR.");

  const couponSvg = buildCouponSvg(coupon, qrDataUrl, eventImageDataUrl);
  const jpegDataUrl = await renderSvgToJpeg(couponSvg);
  const pdfBlob = buildPdfFromJpegDataUrl(jpegDataUrl);

  const url = URL.createObjectURL(pdfBlob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `kapricious-coupon-${coupon.registrationId}.pdf`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};

const buildCouponQrUrl = (registrationId: string) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(buildEntryCodeFromRegistrationId(registrationId))}&bgcolor=ffffff&color=111827`;

// Floating particles component
const FloatingParticles = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/20"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};

// Animated grid background
const AnimatedGrid = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03]">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
};

type Step = "details" | "payment";
type FashionShowTeamType = "college" | "other";

const Register = () => {
  const searchParams = useSearchParams();
  const preselectedEvent = searchParams.get("event") || "";
  const preselectedDeptParam = searchParams.get("dept") || searchParams.get("department") || "";

  const preselectedFlagship = getEventById(preselectedEvent);

  const allDeptEvents = [...mainEvents, ...managerialEvents, ...sportsEvents, ...cseEvents, ...ceEvents, ...meEvents, ...eeeEvents, ...raEvents, ...sfEvents, ...eceEvents];
  const preselectedDeptEvent = allDeptEvents.find(ev => ev.id === preselectedEvent);
  
  const getInitialDept = () => {
    if (preselectedFlagship) return FLAGSHIP_DEPT_ID;
    if (preselectedDeptEvent?.department === "SPORTS") return SPORTS_DEPT_ID;
    if (preselectedDeptParam) return preselectedDeptParam;
    if (preselectedDeptEvent && preselectedDeptEvent.department) {
      return preselectedDeptEvent.department;
    }
    return "";
  };

  const [selectedDept, setSelectedDept] = useState(getInitialDept());
  const [selectedEvent, setSelectedEvent] = useState(preselectedFlagship || preselectedDeptEvent ? preselectedEvent : "");
  const [form, setForm] = useState({ name: "", email: "", phone: "", college: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registered, setRegistered] = useState(false);
  const [selectedTeamSize, setSelectedTeamSize] = useState(1);
  const [fashionShowTeamType, setFashionShowTeamType] = useState<FashionShowTeamType>("college");
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<Step>("details");
  const [slotCheckLoading, setSlotCheckLoading] = useState(false);
  const [slotsAvailable, setSlotsAvailable] = useState<number | null>(null);
  const [maxSlots, setMaxSlots] = useState<number | null>(null);
  const [paymentProof, setPaymentProof] = useState<RazorpayPaymentProof | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [couponData, setCouponData] = useState<CouponData | null>(null);
  const [couponDownloading, setCouponDownloading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    if (preselectedFlagship) {
      setSelectedDept(FLAGSHIP_DEPT_ID);
      setSelectedEvent(preselectedEvent);
    }
  }, [preselectedEvent, preselectedFlagship]);

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("departments").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  const visibleDepartments = departments?.filter((d) => {
    const normalizedCode = (d.code || "").toUpperCase();
    const normalizedName = (d.name || "").toLowerCase();
    if (["FLAGSHIP", "AI"].includes(normalizedCode)) return false;
    if (normalizedName.includes("artificial intelligence")) return false;
    return true;
  });

  useEffect(() => {
    if (!departments || !preselectedEvent) return;
    if (selectedDept === FLAGSHIP_DEPT_ID) return;
    if (selectedDept === SPORTS_DEPT_ID) return;
    if (preselectedDeptEvent && preselectedDeptEvent.department) {
      if (preselectedDeptEvent.department === "SPORTS") {
        if (selectedDept !== SPORTS_DEPT_ID) {
          setSelectedDept(SPORTS_DEPT_ID);
          setSelectedEvent(preselectedEvent);
        }
        return;
      }
      const deptByCode = departments.find(d => d.code === preselectedDeptEvent.department);
      if (deptByCode && selectedDept !== deptByCode.id) {
        setSelectedDept(deptByCode.id);
        setSelectedEvent(preselectedEvent);
      }
    }
    if (preselectedDeptParam) {
      const isValidUUID = departments.some(d => d.id === selectedDept);
      if (!isValidUUID) {
        const deptByCode = departments.find(d => d.code === preselectedDeptParam || d.code === selectedDept);
        if (deptByCode) {
          setSelectedDept(deptByCode.id);
          setSelectedEvent(preselectedEvent);
        }
      }
    }
  }, [departments, preselectedEvent, preselectedDeptEvent, preselectedDeptParam, selectedDept]);

  const { data: allDbEvents } = useQuery({
    queryKey: ["all-db-events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("id, title, department_id").order("title");
      if (error) throw error;
      return data;
    },
  });

  const getEventsForDept = () => {
    if (selectedDept === FLAGSHIP_DEPT_ID) {
      return flagshipEvents.map(e => ({ id: e.id, title: e.title, type: "flagship" }));
    }
    if (selectedDept === SPORTS_DEPT_ID) {
      return sortDepartmentEventsByPrizePool(sportsEvents).map(e => ({ id: e.id, title: e.title }));
    }
    if (selectedDept && departments) {
      const dept = departments.find(d => d.id === selectedDept);
      if (dept?.code === "CULTURAL") return sortDepartmentEventsByPrizePool(mainEvents).map(e => ({ id: e.id, title: e.title }));
      if (dept?.code === "MANAGERIAL") return sortDepartmentEventsByPrizePool(managerialEvents).map(e => ({ id: e.id, title: e.title }));
      if (dept?.code === "CSE") return sortDepartmentEventsByPrizePool(cseEvents).map(e => ({ id: e.id, title: e.title }));
      if (dept?.code === "CE") return sortDepartmentEventsByPrizePool(ceEvents).map(e => ({ id: e.id, title: e.title }));
      if (dept?.code === "ME") return sortDepartmentEventsByPrizePool(meEvents).map(e => ({ id: e.id, title: e.title }));
      if (dept?.code === "EEE") return sortDepartmentEventsByPrizePool(eeeEvents).map(e => ({ id: e.id, title: e.title }));
      if (dept?.code === "RA") return sortDepartmentEventsByPrizePool(raEvents).map(e => ({ id: e.id, title: e.title }));
      if (dept?.code === "SFE") return sortDepartmentEventsByPrizePool(sfEvents).map(e => ({ id: e.id, title: e.title }));
      if (dept?.code === "ECE") return sortDepartmentEventsByPrizePool(eceEvents).map(e => ({ id: e.id, title: e.title }));
    }
    return [];
  };

  const events = getEventsForDept();

  const getSelectedEventDetails = () => {
    if (selectedDept === FLAGSHIP_DEPT_ID) return getEventById(selectedEvent);
    if (selectedDept === SPORTS_DEPT_ID) {
      return sportsEvents.find(ev => ev.id === selectedEvent);
    }
    if (selectedDept && departments) {
      const allEvents = [...mainEvents, ...managerialEvents, ...sportsEvents, ...cseEvents, ...ceEvents, ...meEvents, ...eeeEvents, ...raEvents, ...sfEvents, ...eceEvents];
      return allEvents.find(ev => ev.id === selectedEvent);
    }
    return undefined;
  };

  const selectedEventDetails = getSelectedEventDetails();
  const isCapacityLimitedEvent = LIMITED_EVENT_IDS.has(selectedEvent);
  const isFashionShow = selectedEvent === "fashion-show";

  const selectedEventLabel =
    selectedDept === FLAGSHIP_DEPT_ID
      ? "Flagship Event"
      : selectedDept === SPORTS_DEPT_ID
        ? "Sports Event"
        : (selectedEventDetails && "department" in selectedEventDetails && selectedEventDetails.department === "CULTURAL")
          ? "Cultural Event"
          : (selectedEventDetails && "department" in selectedEventDetails && selectedEventDetails.department === "MANAGERIAL")
            ? "Managerial Event"
            : "Department Event";

  const isTeamEvent = selectedEventDetails && 'teamSize' in selectedEventDetails && (selectedEventDetails as any).teamSize > 1;
  const maxTeamSize = isTeamEvent ? (selectedEventDetails as any).teamSize : 1;
  const minTeamSize = MIN_TEAM_SIZE_BY_EVENT[selectedEvent] ?? 1;
  const registrationFeeText = selectedEventDetails && "registrationFee" in selectedEventDetails ? (selectedEventDetails as any).registrationFee || "" : "";
  const payableRupees = isFashionShow
    ? (fashionShowTeamType === "college" ? 250 : 350) * Math.max(selectedTeamSize, 1)
    : parseFeeToRupees(registrationFeeText, isTeamEvent ? selectedTeamSize : 1);
  const payableAmountInPaise = payableRupees * 100;

  useEffect(() => {
    if (selectedTeamSize > 1) {
      setTeamMembers(prev => {
        const needed = selectedTeamSize - 1;
        if (prev.length < needed) return [...prev, ...Array(needed - prev.length).fill("")];
        return prev.slice(0, needed);
      });
    } else {
      setTeamMembers([]);
    }
  }, [selectedTeamSize]);

  useEffect(() => {
    setSelectedTeamSize(minTeamSize);
    setFashionShowTeamType("college");
    setTeamMembers([]);
    // Reset to details step when event changes
    setCurrentStep("details");
    setSlotsAvailable(null);
    setMaxSlots(null);
    setPaymentProof(null);
  }, [selectedEvent, minTeamSize]);

  const findDbEventId = (eventTitle: string): string | null => {
    if (!allDbEvents) return null;
    const match = allDbEvents.find(e => e.title === eventTitle);
    return match?.id || null;
  };

  const findDbDeptId = (eventTitle: string): string | null => {
    if (!allDbEvents) return null;
    const match = allDbEvents.find(e => e.title === eventTitle);
    return match?.department_id || null;
  };

  // Get event title from selected event
  const getEventTitle = () => {
    if (selectedDept === FLAGSHIP_DEPT_ID) return getEventById(selectedEvent)?.title || "";
    const allHardcoded = [...mainEvents, ...managerialEvents, ...sportsEvents, ...cseEvents, ...ceEvents, ...meEvents, ...eeeEvents, ...raEvents, ...sfEvents, ...eceEvents];
    return allHardcoded.find(ev => ev.id === selectedEvent)?.title || "";
  };

  // Step 1: Validate details and proceed to payment for events with registration caps.
  const handleProceedToPayment = async () => {
    setErrors({});
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    if (!selectedDept || !selectedEvent) {
      toast.error("Please select a category and event.");
      return;
    }
    setSlotCheckLoading(true);
    try {
      const eventTitle = getEventTitle();
      const dbEventId = findDbEventId(eventTitle);
      if (!dbEventId) {
        toast.error("Event not found in database. Please try again later.");
        return;
      }

      const normalizedEmail = result.data.email.trim().toLowerCase();
      const { count: duplicateCount, error: duplicateError } = await supabase
        .from("registrations")
        .select("id", { head: true, count: "exact" })
        .eq("event_id", dbEventId)
        .eq("email", normalizedEmail);

      if (duplicateError) throw duplicateError;
      if (duplicateCount && duplicateCount > 0) {
        toast.error("You’ve already registered for this event with that email.");
        return;
      }

      if (isCapacityLimitedEvent) {
        const [countResult, eventResult] = await Promise.all([
          supabase.from("registrations").select("*", { count: "exact", head: true }).eq("event_id", dbEventId),
          supabase.from("events").select("max_participants").eq("id", dbEventId).single(),
        ]);

        if (countResult.error) throw countResult.error;

        const max = eventResult.data?.max_participants ?? getDefaultSlotLimit(selectedEvent);
        const current = countResult.count ?? 0;
        const remaining = max - current;

        setMaxSlots(max);
        setSlotsAvailable(remaining);

        if (remaining <= 0) {
          toast.error(`Registrations for this event are full (${max}/${max}). Please try another event.`);
          return;
        }

        toast.success(`${remaining} slot${remaining > 1 ? "s" : ""} available! Proceed to payment.`);
      } else {
        setMaxSlots(null);
        setSlotsAvailable(null);
        toast.success("Registration is open. Proceed to payment.");
      }

      setCurrentStep("payment");
    } catch (err: any) {
      toast.error(err.message || "Failed to check availability.");
    } finally {
      setSlotCheckLoading(false);
    }
  };

  const mutation = useMutation({
    mutationFn: async ({ paymentProofOverride }: RegistrationMutationInput = {}) => {
      const validated = schema.parse(form);
      const isFlagship = selectedDept === FLAGSHIP_DEPT_ID;
      const eventTitle = getEventTitle();
      const dbEventId = findDbEventId(eventTitle);
      const dbDeptId = findDbDeptId(eventTitle);
      const resolvedPaymentProof = paymentProofOverride ?? paymentProof;

      if (!dbEventId || !dbDeptId) {
        throw new Error("Event not found in database. Please try again later.");
      }

      if (LIMITED_EVENT_IDS.has(selectedEvent)) {
        const { count: regCount, error: countError } = await supabase
          .from("registrations")
          .select("*", { count: "exact", head: true })
          .eq("event_id", dbEventId);

        if (countError) throw countError;

        const { data: eventInfo } = await supabase
          .from("events")
          .select("max_participants")
          .eq("id", dbEventId)
          .single();

        const maxParticipants = eventInfo?.max_participants ?? getDefaultSlotLimit(selectedEvent);

        if (regCount !== null && regCount >= maxParticipants) {
          throw new Error(`Registrations for this event are full (${maxParticipants}/${maxParticipants}). Please try another event.`);
        }
      }

      const registrationId = crypto.randomUUID();
      const entryCode = buildEntryCodeFromRegistrationId(registrationId);

      const { data: regData, error } = await supabase.from("registrations").insert([{
        id: registrationId,
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        college: validated.college,
        event_id: dbEventId,
        department_id: dbDeptId,
        entry_code: entryCode,
        amount_paid: resolvedPaymentProof ? resolvedPaymentProof.amountRupees : payableAmountInPaise <= 0 ? 0 : null,
        team_size: isTeamEvent ? selectedTeamSize : 1,
        team_members: selectedTeamSize > 1 ? teamMembers.filter(m => m.trim()) : null,
        razorpay_order_id: resolvedPaymentProof?.orderId ?? null,
        payment_currency: resolvedPaymentProof?.currency ?? (payableAmountInPaise <= 0 ? "INR" : null),
        payment_gateway_status: resolvedPaymentProof?.gatewayStatus ?? (payableAmountInPaise <= 0 ? "free" : null),
        transaction_id: resolvedPaymentProof?.paymentId ?? null,
        payment_status: resolvedPaymentProof ? "verified" : "pending",
      }]).select("id").single();
      
      if (error) {
        if (error.code === "23505") throw new Error("You have already registered for this event.");
        throw error;
      }

      let eventName = eventTitle;
      let eventDate = "";
      let venue = "";

      if (isFlagship) {
        const fe = getEventById(selectedEvent);
        if (fe) { eventDate = fe.date; venue = fe.venue; }
      } else if (selectedEventDetails && "department" in selectedEventDetails && selectedEventDetails.department === "SPORTS") {
        eventDate = selectedEventDetails.date || "";
        venue = selectedEventDetails.venue || "";
      } else if (selectedEventDetails && "department" in selectedEventDetails && ["CULTURAL", "MANAGERIAL"].includes(selectedEventDetails.department)) {
        eventDate = selectedEventDetails.date || "";
        venue = selectedEventDetails.venue || "";
      } else {
        const { data: eventData } = await supabase
          .from("events")
          .select("title, event_date, venue")
          .eq("id", dbEventId)
          .single();
        eventName = eventData?.title || eventTitle;
        eventDate = eventData?.event_date || "";
        venue = eventData?.venue || "";
      }

      const emailRes = await supabase.functions.invoke("send-registration-email", {
        body: {
          participantName: validated.name,
          participantEmail: validated.email,
          eventName,
          registrationId: regData.id,
          entryCode,
          eventDate,
          venue,
          teamCount: isTeamEvent ? selectedTeamSize : 1,
          eventImage: selectedEventDetails && "image" in selectedEventDetails ? (selectedEventDetails as any).image ?? "" : "",
          eventCategory: selectedDept === FLAGSHIP_DEPT_ID ? "Flagship Event" : selectedDept === SPORTS_DEPT_ID ? "Sports Event" : "Department Event",
        },
      }).catch((err) => { console.error("Email send failed:", err); return null; });

      const emailRateLimited = emailRes?.data?.rateLimited === true;
      const coupon: CouponData = {
        registrationId: regData.id,
        participantName: validated.name,
        participantEmail: validated.email,
        eventName,
        eventDate,
        venue,
        issuedAt: new Date().toLocaleString(),
        entryCode,
        teamCount: isTeamEvent ? selectedTeamSize : 1,
        eventCategory: selectedDept === FLAGSHIP_DEPT_ID ? "Flagship Event" : selectedDept === SPORTS_DEPT_ID ? "Sports Event" : "Department Event",
        eventImage: selectedEventDetails && "image" in selectedEventDetails ? (selectedEventDetails as any).image ?? "" : "",
      };
      return { regData, emailRateLimited, coupon };
    },
    onSuccess: ({ emailRateLimited, coupon }) => {
      setRegistered(true);
      setCouponData(coupon);
      if (emailRateLimited) {
        toast.info("Registration successful! However, we couldn't send your event pass right now due to high demand. Please check your email tomorrow or contact the admin for your pass.");
      } else {
        toast.success("Registration successful! Check your email for the event pass 🎫");
      }
      setForm({ name: "", email: "", phone: "", college: "" });
      setSelectedEvent("");
      setCurrentStep("details");
      setPaymentProof(null);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const startRazorpayPayment = async (): Promise<RazorpayPaymentProof | null> => {
    if (!selectedEventDetails) return null;
    if (payableAmountInPaise <= 0) return null;

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!keyId) {
      toast.error("Payment gateway is not configured yet. Add the Razorpay public key and try again.");
      return null;
    }

    const loaded = await loadRazorpayCheckout();
    if (!loaded || !window.Razorpay) {
      toast.error("Unable to load Razorpay checkout.");
      return null;
    }

    setPaymentLoading(true);
    try {
      const eventTitle = getEventTitle();
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: payableAmountInPaise,
          currency: "INR",
          receipt: `${selectedEvent}-${Date.now()}`,
          notes: { eventTitle, email: form.email.trim().toLowerCase() },
        }),
      });

      const orderPayload = await orderRes.json();
      if (!orderRes.ok || !orderPayload?.order?.id) {
        throw new Error(orderPayload?.error || "Failed to create payment order.");
      }

      const paymentResult: RazorpayCheckoutResult | null = await new Promise((resolve, reject) => {
        const checkout = new window.Razorpay({
          key: keyId,
          amount: payableAmountInPaise,
          currency: "INR",
          name: "Kapricious 2026",
          description: eventTitle,
          order_id: orderPayload.order.id,
          prefill: {
            name: form.name,
            email: form.email,
            contact: form.phone,
          },
          notes: { eventTitle },
          theme: { color: "#22c55e" },
          handler: (response: any) => {
            resolve({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
          },
          modal: {
            ondismiss: () => resolve(null),
          },
        });
        checkout.on("payment.failed", (response: any) => {
          reject(new Error(response?.error?.description || "Payment failed."));
        });
        checkout.open();
      });

      if (!paymentResult) {
        toast.info("Payment cancelled.");
        return null;
      }

      const verifyRes = await fetch("/api/razorpay/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: paymentResult.orderId,
          razorpay_payment_id: paymentResult.paymentId,
          razorpay_signature: paymentResult.signature,
        }),
      });
      const verifyPayload = await verifyRes.json();
      if (!verifyRes.ok || !verifyPayload?.verified) {
        throw new Error(verifyPayload?.error || "Payment signature verification failed.");
      }

      const verifiedPayment = verifyPayload?.payment;
      if (!verifiedPayment || !Number.isFinite(Number(verifiedPayment.amount))) {
        throw new Error("Verified payment details are incomplete.");
      }

      const nextPaymentProof = {
        ...paymentResult,
        amountRupees: Number(verifiedPayment.amount) / 100,
        currency: verifiedPayment.currency || "INR",
        gatewayStatus: verifiedPayment.status || "unknown",
      };
      setPaymentProof(nextPaymentProof);
      toast.success("Payment verified. Finalizing registration...");
      return nextPaymentProof;
    } catch (error: any) {
      toast.error(error?.message || "Payment could not be completed.");
      return null;
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mutation.isPending || paymentLoading) return;

    let paymentProofForInsert = paymentProof;

    if (payableAmountInPaise > 0 && !paymentProof) {
      paymentProofForInsert = await startRazorpayPayment();
      if (!paymentProofForInsert) return;
    }

    mutation.mutate({ paymentProofOverride: paymentProofForInsert });
  };

  const inputClass =
    "w-full rounded-2xl bg-secondary/50 border border-border pl-11 pr-4 py-3.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all placeholder:text-muted-foreground/40";
  const selectClass =
    "w-full rounded-2xl bg-secondary/50 border border-border pl-11 pr-4 py-3.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all appearance-none cursor-pointer";
  const labelClass = "block text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2";

  if (registered) {
  const couponQrUrl = couponData ? buildCouponQrUrl(couponData.registrationId) : null;
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center grid-bg px-4">
        <FloatingParticles />
        <AnimatedGrid />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="bg-card rounded-large border border-border p-6 md:p-8 max-w-4xl w-full relative z-10"
        >
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto lg:mx-0 mb-5"
              >
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
              >
                Your Pass Is Ready
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="text-sm text-muted-foreground mb-6"
              >
                Your registration was successful. We&apos;ve sent the same event pass to your email, and you can screenshot this version right now.
              </motion.p>
              <div className="rounded-3xl border border-border bg-secondary/35 p-5 text-left">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">Quick Notes</p>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>Show the QR code or this screenshot at the venue entrance.</p>
                  <p>Keep your registration ID handy in case of a manual check-in.</p>
                  <p>The pass below is designed to be easy to save, share, and verify.</p>
                </div>
              </div>
              <div className="mt-5">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setRegistered(false);
                    setCouponData(null);
                  }}
                  className="w-full bg-foreground text-background rounded-2xl px-6 py-3.5 text-sm font-bold hover:opacity-90 transition-all"
                >
                  Register for Another Event
                </motion.button>
              </div>
            </div>

            {couponData ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.45 }}
                className="rounded-[32px] overflow-hidden border border-[#2f3b54] bg-[#0f172a] shadow-[0_20px_80px_-35px_rgba(15,23,42,0.9)]"
              >
                <div className="bg-[linear-gradient(135deg,#f6d28a_0%,#e7a93e_100%)] px-5 py-4 text-[#111827]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.35em] uppercase">Kapricious 2026</p>
                      <h3 className="font-display text-2xl font-bold mt-1">Event Coupon</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold tracking-[0.28em] uppercase">Entry Code</p>
                      <p className="font-mono text-lg font-bold mt-1">{buildEntryCodeFromRegistrationId(couponData.registrationId)}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-5">
                  <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-4">
                      <div className="overflow-hidden rounded-[24px] border border-[#334155] bg-[#111827]">
                        {couponData.eventImage ? (
                          <img
                            src={couponData.eventImage}
                            alt={couponData.eventName}
                            className="h-52 w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-52 w-full items-center justify-center bg-[#111827] text-sm text-slate-300">
                            Kapricious 2026
                          </div>
                        )}
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[22px] border border-[#334155] bg-[#111827] p-4">
                          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400">Participant</p>
                          <p className="mt-2 text-lg font-bold text-slate-50">{couponData.participantName}</p>
                          <p className="mt-1 text-xs text-slate-300 break-all">{couponData.participantEmail}</p>
                        </div>
                        <div className="rounded-[22px] border border-[#334155] bg-[#111827] p-4">
                          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400">Event</p>
                          <p className="mt-2 text-lg font-bold text-slate-50">{couponData.eventName}</p>
                          <p className="mt-1 text-xs text-slate-300">{couponData.eventCategory}</p>
                        </div>
                        <div className="rounded-[22px] border border-[#334155] bg-[#111827] p-4">
                          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400">Date & Venue</p>
                          <p className="mt-2 text-sm font-bold text-slate-50">{couponData.eventDate || "TBA"}</p>
                          <p className="mt-1 text-xs text-slate-300">{couponData.venue || "Venue will be announced"}</p>
                        </div>
                        <div className="rounded-[22px] border border-[#334155] bg-[#111827] p-4">
                          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400">Registration ID</p>
                          <p className="mt-2 font-mono text-base font-bold text-slate-50">{couponData.registrationId.substring(0, 8).toUpperCase()}</p>
                          <p className="mt-1 text-xs text-slate-300">
                            {couponData.teamCount > 1 ? `${couponData.teamCount} members` : "Individual pass"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[26px] border border-[#334155] bg-[#111827] p-4 flex flex-col items-center justify-between">
                      <div className="w-full rounded-[22px] bg-white p-3">
                        {couponQrUrl ? (
                          <img
                            src={couponQrUrl}
                            alt="Entry QR code"
                            className="w-full rounded-2xl"
                          />
                        ) : null}
                      </div>
                      <div className="mt-4 w-full text-center">
                        <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400">Scan At Entry</p>
                        <p className="mt-2 text-xl font-bold text-slate-50">Kapricious Pass</p>
                        <p className="mt-2 text-xs leading-5 text-slate-300">
                          Save this screen or download the PDF. This pass includes the same key event details and QR used in the email version.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen pt-24 pb-16 grid-bg px-4 relative">
      <FloatingParticles />
      <AnimatedGrid />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 mb-6"
          >
            <Zap className="w-3 h-3 text-accent" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent">Join the Movement</span>
          </motion.div>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">
            <span className="text-accent">REGISTER</span> NOW
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Choose from flagship events or department events, fill in your details, and you're good to go.
          </p>
        </motion.div>

        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-lg mx-auto mb-10"
        >
          <div className="flex items-center gap-3">
            <div className={`flex-1 flex items-center gap-3 p-3 rounded-2xl border transition-all ${
              currentStep === "details" ? "bg-accent/10 border-accent/30" : "bg-card border-border"
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                currentStep === "details" ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
              }`}>
                {currentStep === "payment" ? <CheckCircle2 className="w-4 h-4" /> : "1"}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${
                currentStep === "details" ? "text-foreground" : "text-muted-foreground"
              }`}>Fill Details</span>
            </div>

            <div className={`w-8 h-px ${currentStep === "payment" ? "bg-accent" : "bg-border"}`} />

            <div className={`flex-1 flex items-center gap-3 p-3 rounded-2xl border transition-all ${
              currentStep === "payment" ? "bg-accent/10 border-accent/30" : "bg-card border-border opacity-60"
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                currentStep === "payment" ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
              }`}>2</div>
              <span className={`text-xs font-bold uppercase tracking-wider ${
                currentStep === "payment" ? "text-foreground" : "text-muted-foreground"
              }`}>Payment</span>
            </div>
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Side - Decorative */}
          <motion.div
            style={{ y: parallaxY }}
            className="hidden lg:flex lg:col-span-2 flex-col gap-6"
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-card rounded-large border border-border p-8"
            >
              <h3 className="font-display text-sm tracking-tight mb-6 text-muted-foreground">WHY JOIN?</h3>
              <div className="space-y-4">
                {[
                  { icon: Trophy, label: "₹2L+ in Prizes", desc: "Across all events" },
                  { icon: Sparkles, label: "40+ Events", desc: "7 departments" },
                  { icon: Calendar, label: "March 27-28", desc: "Two day festival" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-foreground text-background rounded-large p-8 relative overflow-hidden flex-1"
            >
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="20s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="15s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="font-display text-lg font-bold mb-2">KAPRICIOUS '26</h3>
                <p className="text-sm opacity-60 leading-relaxed">
                  The flagship annual tech fest of KMEA Engineering College. Be part of the future.
                </p>
                <div className="mt-6 pt-4 border-t border-background/20">
                  <p className="text-[10px] uppercase tracking-widest opacity-40">KMEA Engineering College</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 mt-1">Aluva, Kerala</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <div className="lg:col-span-3 bg-card rounded-large border border-border overflow-hidden">
            {/* ===== STEP 1: FILL DETAILS ===== */}
            {currentStep === "details" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Event Selection */}
                <div className="p-6 md:p-8 space-y-4 border-b border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Event Selection</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Category</label>
                      <div className="relative">
                        <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <select
                          value={selectedDept}
                          onChange={(e) => { setSelectedDept(e.target.value); setSelectedEvent(""); }}
                          className={selectClass}
                        >
                          <option value="">Select</option>
                          <optgroup label="Special Events">
                            <option value={SPORTS_DEPT_ID}>Sports Fiesta (SPORTS)</option>
                          </optgroup>
                          <optgroup label="Department Events">
                            {visibleDepartments?.map((d) => (
                              <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                            ))}
                          </optgroup>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Event</label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <select
                          value={selectedEvent}
                          onChange={(e) => setSelectedEvent(e.target.value)}
                          disabled={!selectedDept}
                          className={`${selectClass} disabled:opacity-40 disabled:cursor-not-allowed`}
                        >
                          <option value="">Select</option>
                          {events?.map((ev) => (
                            <option key={ev.id} value={ev.id}>{ev.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Event Details Banner */}
                  {selectedEvent && selectedEventDetails && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 rounded-2xl bg-secondary/50 border border-border p-4"
                    >
                      <div className="flex items-start gap-4">
                        {('image' in selectedEventDetails) && (selectedEventDetails as any).image && (
                          <img
                            src={(selectedEventDetails as any).image}
                            alt={selectedEventDetails.title}
                            className="w-20 h-20 rounded-xl object-cover hidden sm:block"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold tracking-wider uppercase text-accent">
                              {selectedEventLabel}
                            </span>
                          </div>
                          <h4 className="font-display font-bold text-foreground truncate">{selectedEventDetails.title}</h4>
                          {('category' in selectedEventDetails) && (
                            <p className="text-xs text-muted-foreground">{(selectedEventDetails as any).category}</p>
                          )}
                          {('departmentName' in selectedEventDetails) && (
                            <p className="text-xs text-muted-foreground">{(selectedEventDetails as any).departmentName}</p>
                          )}
                          <div className="flex flex-wrap gap-3 mt-2">
                            {('prize' in selectedEventDetails) && (
                              <span className="text-[10px] bg-card rounded-full px-2 py-1 border border-border text-muted-foreground">
                                Prize: <span className="text-foreground font-bold">{(selectedEventDetails as any).prize}</span>
                              </span>
                            )}
                            {('prizePool' in selectedEventDetails) && (
                              <span className="text-[10px] bg-card rounded-full px-2 py-1 border border-border text-muted-foreground">
                                Prize Pool: <span className="text-foreground font-bold">{(selectedEventDetails as any).prizePool}</span>
                              </span>
                            )}
                            {('date' in selectedEventDetails) && (
                              <span className="text-[10px] bg-card rounded-full px-2 py-1 border border-border text-muted-foreground">
                                {(selectedEventDetails as any).date}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Team Size Selection */}
                  {isTeamEvent && selectedEvent && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-accent" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Team Size</span>
                      </div>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <select
                          value={selectedTeamSize}
                          onChange={(e) => setSelectedTeamSize(Number(e.target.value))}
                          className={selectClass}
                        >
                          {Array.from({ length: maxTeamSize - minTeamSize + 1 }, (_, i) => i + minTeamSize).map((size) => (
                            <option key={size} value={size}>
                              {size} {size === 1 ? "Member (Individual)" : "Members"}
                            </option>
                          ))}
                        </select>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {minTeamSize > 1
                          ? `Minimum ${minTeamSize} members required; maximum team size: ${maxTeamSize} members`
                          : `Maximum team size: ${maxTeamSize} members`}
                      </p>
                      {isFashionShow && (
                        <div className="mt-4">
                          <label className={labelClass}>Team Category</label>
                          <div className="relative">
                            <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                            <select
                              value={fashionShowTeamType}
                              onChange={(e) => setFashionShowTeamType(e.target.value as FashionShowTeamType)}
                              className={selectClass}
                            >
                              <option value="college">College Team - ₹250 per head</option>
                              <option value="other">Other Team - ₹350 per head</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Personal Info */}
                <div className="p-6 md:p-8 space-y-4 border-b border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-accent" />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                      {isTeamEvent && selectedTeamSize > 1 ? "Team Leader Details" : "Personal Details"}
                    </span>
                    {isTeamEvent && selectedTeamSize > 1 && (
                      <span className="text-[9px] bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                        Coupon will be sent to leader
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className={labelClass}>{isTeamEvent && selectedTeamSize > 1 ? "Leader's Full Name" : "Full Name"}</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="John Doe" />
                      </div>
                      <p className="mt-2 text-xs text-amber-400/90">
                        Enter the name carefully. This spelling will be used for certificates and event records.
                      </p>
                      {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>{isTeamEvent && selectedTeamSize > 1 ? "Leader's Email" : "Email"}</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="you@example.com" />
                      </div>
                      {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>{isTeamEvent && selectedTeamSize > 1 ? "Leader's Phone" : "Phone"}</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="+91 XXXXX XXXXX" />
                      </div>
                      {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>College</label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <input type="text" value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} className={inputClass} placeholder="Your college name" />
                      </div>
                      {errors.college && <p className="text-xs text-destructive mt-1">{errors.college}</p>}
                    </div>
                  </div>
                </div>

                {/* Team Members Section */}
                {isTeamEvent && selectedTeamSize > 1 && (
                  <div className="p-6 md:p-8 space-y-4 border-b border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Team Members</span>
                    </div>
                    <p className="text-xs text-amber-400/90">
                      Team member names should also be entered exactly as they should appear on certificates.
                    </p>
                    <div className="space-y-3">
                      {teamMembers.map((member, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <label className={labelClass}>Member {index + 2} Name</label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                            <input
                              type="text"
                              value={member}
                              onChange={(e) => {
                                const newMembers = [...teamMembers];
                                newMembers[index] = e.target.value;
                                setTeamMembers(newMembers);
                              }}
                              className={inputClass}
                              placeholder={`Team member ${index + 2} name`}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Proceed to Payment Button */}
                <div className="p-6 md:p-8">
                  <motion.button
                    type="button"
                    disabled={slotCheckLoading}
                    onClick={handleProceedToPayment}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="group w-full flex items-center justify-center gap-3 bg-foreground text-background rounded-2xl py-4 font-bold text-sm tracking-wider uppercase hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {slotCheckLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {isCapacityLimitedEvent ? "Checking availability..." : "Preparing registration..."}
                      </span>
                    ) : (
                      <>
                        {isCapacityLimitedEvent ? "Check Availability & Proceed" : "Proceed to Payment"}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ===== STEP 2: PAYMENT GATEWAY ===== */}
            {currentStep === "payment" && (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
              >
                {/* Slot availability info */}
                <div className="p-6 md:p-8 border-b border-border">
                  <div className="rounded-2xl bg-accent/5 border border-accent/20 p-4 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {isCapacityLimitedEvent ? "Slots Available!" : "Registration Open"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isCapacityLimitedEvent
                          ? <>{slotsAvailable} of {maxSlots} slots remaining for <span className="font-bold text-foreground">{selectedEventDetails?.title}</span>. Complete payment to confirm your registration.</>
                          : <>Registrations are open for <span className="font-bold text-foreground">{selectedEventDetails?.title}</span>. Complete payment to confirm your registration.</>}
                      </p>
                    </div>
                  </div>

                  {/* Summary of filled details */}
                  <div className="mt-4 rounded-2xl bg-secondary/30 border border-border p-4 space-y-2">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3">Registration Summary</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="text-muted-foreground">Name:</span> <span className="font-medium text-foreground">{form.name}</span></div>
                      <div><span className="text-muted-foreground">Email:</span> <span className="font-medium text-foreground">{form.email}</span></div>
                      <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium text-foreground">{form.phone}</span></div>
                      <div><span className="text-muted-foreground">College:</span> <span className="font-medium text-foreground">{form.college}</span></div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep("details")}
                      className="text-[10px] text-accent hover:underline mt-2 uppercase tracking-wider font-bold"
                    >
                      ← Edit Details
                    </button>
                  </div>
                </div>

                {/* Payment Gateway Section */}
                <div className="p-6 md:p-8 border-b border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-4 h-4 text-accent" />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Payment Gateway</span>
                  </div>
                  <div className="rounded-2xl border border-dashed border-border bg-secondary/30 p-6 text-center">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h3 className="font-display text-xs font-bold text-foreground mb-1">PAYMENT GATEWAY</h3>
                    <p className="text-[10px] text-muted-foreground mb-3 uppercase tracking-wider">
                      {payableAmountInPaise > 0 ? "Razorpay Checkout Ready" : "No Payment Required"}
                    </p>
                    <div className="mb-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Amount Payable</p>
                      <p className="mt-1 font-display text-3xl font-bold text-foreground">
                        {payableAmountInPaise > 0 ? `₹${payableRupees.toLocaleString("en-IN")}` : "Free"}
                      </p>
                    </div>
                    <div className="flex justify-center gap-2">
                      {[payableAmountInPaise > 0 ? "Razorpay" : "Free Entry", "Secure Checkout"].map((g) => (
                        <span key={g} className="rounded-full bg-card border border-border px-2.5 py-0.5 text-[9px] tracking-wider text-muted-foreground">{g}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-muted-foreground/50">
                      <ShieldCheck className="w-3 h-3" />
                      <span>256-bit SSL Encrypted</span>
                    </div>
                    {payableAmountInPaise > 0 && (
                      <p className="mt-3 text-xs text-muted-foreground">
                        Clicking the button below will open Razorpay checkout.
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <div className="p-6 md:p-8">
                  <motion.button
                    type="submit"
                    disabled={mutation.isPending || paymentLoading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="group w-full flex items-center justify-center gap-3 bg-foreground text-background rounded-2xl py-4 font-bold text-sm tracking-wider uppercase hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {mutation.isPending || paymentLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        {paymentLoading ? "Processing payment..." : "Registering..."}
                      </span>
                    ) : (
                      <>
                        {payableAmountInPaise > 0 ? "Pay & Confirm Registration" : "Confirm Registration"}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
