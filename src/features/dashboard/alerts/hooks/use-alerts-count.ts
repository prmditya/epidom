import { useMemo } from "react";
import { MOCK_ALERTS } from "@/mocks";

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
