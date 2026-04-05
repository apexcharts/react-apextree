import ApexTree from "apextree";

/**
 * sets the ApexTree license key globally
 * should be called once at app initialization, before rendering any charts
 *
 * @param licenseKey - the license key string provided by ApexCharts
 *
 * @example
 * ```tsx
 * import { setApexTreeLicense } from 'react-apextree';
 *
 * // call this at the top of your app, before rendering any charts
 * setApexTreeLicense('your-license-key-here');
 * ```
 */
export function setApexTreeLicense(licenseKey: string): void {
  ApexTree.setLicense(licenseKey);
}
