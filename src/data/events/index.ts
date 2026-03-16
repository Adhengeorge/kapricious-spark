// Types
export type { DepartmentEvent, FlagshipEvent, CulturalEvent } from "./types";

// Department Events
export { mainEvents } from "./main";
export { eceEvents } from "./ece";
export { sfEvents } from "./sf";
export { raEvents } from "./rae";
export { eeeEvents } from "./eee";
export { meEvents } from "./me";
export { ceEvents } from "./ce";
export { cseEvents } from "./cse";

// Other Events
export { flagshipEvents, getEventById } from "./flagship";

// Re-import for combined exports
import { mainEvents } from "./main";
import { eceEvents } from "./ece";
import { sfEvents } from "./sf";
import { raEvents } from "./rae";
import { eeeEvents } from "./eee";
import { meEvents } from "./me";
import { ceEvents } from "./ce";
import { cseEvents } from "./cse";
import { DepartmentEvent } from "./types";

// All department events combined
export const allDepartmentEvents: DepartmentEvent[] = [
  ...mainEvents,
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
