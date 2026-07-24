export const clinicSizes = [
  {
    id: "solo",
    label: "Solo Practice",
    description: "Just you, or you and one assistant.",
  },
  {
    id: "multi-doctor",
    label: "Multi-Doctor",
    description: "A clinic with 2–10 doctors on staff.",
  },
  {
    id: "enterprise",
    label: "Enterprise",
    description: "Multiple locations or 10+ doctors.",
  },
] as const;

export const timeSlots = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "2:00 PM",
  "3:30 PM",
  "5:00 PM",
] as const;

export function getUpcomingWeekdays(count: number) {
  const days: { iso: string; weekday: string; date: string }[] = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);

  while (days.length < count) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      days.push({
        iso: cursor.toISOString().slice(0, 10),
        weekday: cursor.toLocaleDateString("en-US", { weekday: "short" }),
        date: cursor.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

export const onboardingSteps = [
  "Creating your workspace",
  "Configuring patient records",
  "Almost there",
] as const;

export const budgetRanges = [
  "Under $500/mo",
  "$500 – $2,000/mo",
  "$2,000 – $10,000/mo",
  "$10,000+/mo",
] as const;

export const dashboardPreviewStats = [
  { label: "Today's Appointments", value: "0" },
  { label: "Patients Onboarded", value: "0" },
  { label: "Reminders Sent", value: "0" },
] as const;
