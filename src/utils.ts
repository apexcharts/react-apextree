import type { ApexTreeProps } from './types';

/**
 * extracts ApexTree options from React props
 * filters out react-specific props (className, style, data)
 */
export function buildOptions<T>(props: ApexTreeProps<T>): Record<string, unknown> {
  const {
    // exclude react-specific props
    className: _className,
    style: _style,
    data: _data,
    // everything else becomes options
    ...options
  } = props;

  // remove undefined values to let ApexTree use its defaults
  const cleanOptions: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(options)) {
    if (value !== undefined) {
      cleanOptions[key] = value;
    }
  }

  return cleanOptions;
}

/**
 * shallow comparison of two objects
 * used to detect option changes
 */
export function shallowEqual(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>
): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}
