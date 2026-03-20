// Types
export type { CoordinatorContact, DepartmentEvent, FlagshipEvent, CulturalEvent } from "./types";

// Department Events
export { mainEvents } from "./main";
export { managerialEvents } from "./managerial";
export { eceEvents } from "./ece";
export { sfEvents } from "./sf";
export { raEvents } from "./rae";
export { eeeEvents } from "./eee";
export { meEvents } from "./me";
export { ceEvents } from "./ce";
export { cseEvents } from "./cse";
export { sportsEvents } from "./sports";

// Other Events
export { flagshipEvents, getEventById } from "./flagship";

// Re-import for combined exports
import { mainEvents } from "./main";
import { managerialEvents } from "./managerial";
import { eceEvents } from "./ece";
import { sfEvents } from "./sf";
import { raEvents } from "./rae";
import { eeeEvents } from "./eee";
import { meEvents } from "./me";
import { ceEvents } from "./ce";
import { cseEvents } from "./cse";
import { sportsEvents } from "./sports";
import { DepartmentEvent } from "./types";

const prizePoolToNumber = (value: string) => {
  if (!value) return 0;
  const match = value.replace(/,/g, "").match(/(\d+)/);
  return match ? Number(match[1]) : 0;
};

export const sortDepartmentEventsByPrizePool = (events: DepartmentEvent[]) =>
  [...events].sort((a, b) => prizePoolToNumber(b.prizePool) - prizePoolToNumber(a.prizePool));

// All department events combined
export const allDepartmentEvents: DepartmentEvent[] = [
  ...mainEvents,
  ...managerialEvents,
  ...sportsEvents,
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
