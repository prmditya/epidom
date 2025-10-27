import { useMemo } from "react";

// Mock data - will be replaced with API call
const MOCK_ALERTS = [
  { product: "Butter", pct: 0.8, qty: "10.22 Kg", date: "10.08.24" },
  { product: "Dark chocolate", pct: 0.6, qty: "9.15 Kg", date: "08.08.24" },
  { product: "White chocolate", pct: 0.55, qty: "7.85 Kg", date: "25.07.24" },
];

/**
 * Custom hook to get alerts count
 * Returns the number of active alerts
 * 
 * @returns {number} Total count of alerts
 * 
 * @example
 * const alertsCount = useAlertsCount();
 * // alertsCount = 3
 * 
 * TODO: Replace mock data with API call
 * const { data } = await fetch('/api/alerts/count')
 */
export function useAlertsCount(): number {
  const count = useMemo(() => {
    // TODO: Replace with API call or zustand store
    return MOCK_ALERTS.length;
  }, []);

  return count;
}

/**
 * Get alerts count synchronously (for server components)
 * 
 * @returns {number} Total count of alerts
 * 
 * TODO: Replace with API call or database query
 */
export function getAlertsCount(): number {
  return MOCK_ALERTS.length;
}
