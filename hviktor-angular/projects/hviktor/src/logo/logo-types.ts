/** A single SVG path with fill type */
export interface LogoPath {
  /** SVG path data string */
  d: string;
  /**
   * 'accent' = always #6CACE4 (blue dots)
   * 'themed' = switches between dark (#003087) and light (white) via currentColor
   */
  fill: 'themed' | 'accent';
}

/** Defines the SVG structure for a single logo */
export interface LogoDefinition {
  /** SVG viewBox attribute */
  viewBox: string;
  /** Default width */
  width: number;
  /** Default height */
  height: number;
  /** Accessible label for the logo */
  label: string;
  /** SVG path elements */
  paths: LogoPath[];
}

/** Available logo sizes */
export type LogoSize = 'sm' | 'md' | 'lg';
