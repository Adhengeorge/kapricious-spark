import { LucideIcon } from "lucide-react";

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

export interface CulturalEvent {
  id: string;
  title: string;
}
