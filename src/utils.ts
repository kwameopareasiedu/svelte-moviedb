/** Prepends a hash symbol to the given route */
export const hashRoute = (route: string): string => "#" + route;

/** Represents the status of external requests */
export enum ActionStatus {
  idle,
  pending,
  success,
  failed
}
