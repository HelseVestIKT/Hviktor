import { LogoDefinition } from './logo-types';
import { LOGO_HBE } from './logos/logo-hbe';
import { LOGO_HBE_HUS } from './logos/logo-hbe-hus';
import { LOGO_HFD } from './logos/logo-hfd';
import { LOGO_HST } from './logos/logo-hst';
import { LOGO_HST_SUS } from './logos/logo-hst-sus';
import { LOGO_HVE } from './logos/logo-hve';
import { LOGO_HVIKT } from './logos/logo-hvikt';

/** Available company identifiers for the logo component */
export type LogoCompany = keyof typeof LOGOS;

/**
 * Path data and metadata for all logos.
 *
 * Individual logo definitions live in their own files (logo-hve.ts, logo-hvikt.ts, etc.)
 * to keep file sizes manageable. This registry assembles them.
 */
export const LOGOS = {
  hvikt: LOGO_HVIKT,
  hve: LOGO_HVE,
  hbe: LOGO_HBE,
  'hbe-hus': LOGO_HBE_HUS,
  hfd: LOGO_HFD,
  hst: LOGO_HST,
  'hst-sus': LOGO_HST_SUS,
} satisfies Record<string, LogoDefinition>;
