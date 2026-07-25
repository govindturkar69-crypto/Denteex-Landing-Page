export const roiAssumptions = {
  avgRevenuePerVisit: 150,
  workingDaysPerMonth: 22,
  baselineNoShowRate: 0.15,
  noShowReduction: 0.35,
  hoursSavedPerDentistPerDay: 0.75,
};

export function calculateRoi(patientsPerDay: number, dentists: number) {
  const {
    avgRevenuePerVisit,
    workingDaysPerMonth,
    baselineNoShowRate,
    noShowReduction,
    hoursSavedPerDentistPerDay,
  } = roiAssumptions;

  const totalMonthlyVisits = patientsPerDay * dentists * workingDaysPerMonth;
  const recoveredVisits =
    totalMonthlyVisits * baselineNoShowRate * noShowReduction;
  const monthlyRevenueBoost = Math.round(recoveredVisits * avgRevenuePerVisit);
  const hoursSaved = Math.round(
    dentists * hoursSavedPerDentistPerDay * workingDaysPerMonth
  );

  return { monthlyRevenueBoost, hoursSaved };
}
