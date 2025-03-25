/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface RiskCount {
  totalAlerts: number;
  highRisk: number;
  mediumRisk: number;
  resolved: number;
}

export const useRiskCount = (): { data: RiskCount | undefined; error: any } => {
    // console.log("hit");
  const { data, error } = useSWR("/api/fraud-data", fetcher);

  if (!data) return { data: undefined, error };

  const { fraudulent_apps, fraudulent_urls } = data;

  let totalAlerts = 0;
  let highRisk = 0;
  let mediumRisk = 0;
  let resolved = 0;

  const calculateCounts = (items: any[]) => {
    items.forEach((item) => {
      if (item.actionStatus.toLowerCase() == "block" || "investigate" || "report") totalAlerts++;
      if (item.risk_level.toLowerCase() === "high") highRisk++;
      if (item.risk_level.toLowerCase() === "medium") mediumRisk++;
      if (item.actionStatus.toLowerCase() === "block") resolved++;
    });
  };

  calculateCounts(fraudulent_apps);
  calculateCounts(fraudulent_urls);

  // console.log({ totalAlerts, highRisk, mediumRisk, resolved });

  return { data: { totalAlerts, highRisk, mediumRisk, resolved }, error };
};
