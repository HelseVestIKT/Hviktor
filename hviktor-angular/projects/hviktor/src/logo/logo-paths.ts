import { LogoDefinition } from './logo-types';
import { LOGO_DOTS } from './logos/logo-dots';
import { LOGO_HBE } from './logos/logo-hbe';
import { LOGO_HBE_HUS } from './logos/logo-hbe-hus';
import { LOGO_HFD } from './logos/logo-hfd';
import { LOGO_HFO } from './logos/logo-hfo';
import { LOGO_HST } from './logos/logo-hst';
import { LOGO_HST_SUS } from './logos/logo-hst-sus';
import { LOGO_HVE } from './logos/logo-hve';
import { LOGO_HVIKT } from './logos/logo-hvikt';
import { LOGO_SAV } from './logos/logo-sav';

/** Available company identifiers for the logo component */
export type LogoCompany = keyof typeof LOGOS;

/**
 * Path data and metadata for all logos.
 *
 * Individual logo definitions live in their own files (logo-hve.ts, logo-hvikt.ts, etc.)
 * to keep file sizes manageable. This registry assembles them.
 */
export const LOGOS = {
  dots: LOGO_DOTS,
  hvikt: LOGO_HVIKT,
  hve: LOGO_HVE,
  hbe: LOGO_HBE,
  'hbe-hus': LOGO_HBE_HUS,
  hfd: LOGO_HFD,
  hfo: LOGO_HFO,
  hst: LOGO_HST,
  'hst-sus': LOGO_HST_SUS,
  sav: LOGO_SAV,
} satisfies Record<string, LogoDefinition>;
