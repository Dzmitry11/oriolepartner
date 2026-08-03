export const LEAD_EVENT = "oriole:lead";

export function requestConsultation(service?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(LEAD_EVENT, { detail: service ?? null }));
  document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
}
