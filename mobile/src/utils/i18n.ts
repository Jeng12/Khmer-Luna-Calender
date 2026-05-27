/**
 * i18n — Bilingual string maps.
 *
 * Usage:
 *   import { t } from '../utils/i18n';
 *   import { useLocaleStore } from '../store/localeStore';
 *
 *   const locale = useLocaleStore(s => s.locale);
 *   <Text>{t('home.today', locale)}</Text>
 */

type Locale = 'km' | 'en';

const strings: Record<string, Record<Locale, string>> = {
  // Navigation labels
  'nav.home':      { km: 'ទំព័រដើម',  en: 'Home' },
  'nav.calendar':  { km: 'ប្រតិទិន',  en: 'Calendar' },
  'nav.explore':   { km: 'រកមើល',     en: 'Explore' },
  'nav.profile':   { km: 'គណនី',      en: 'Profile' },

  // Home screen
  'home.today':       { km: 'ថ្ងៃនេះ',          en: 'Today' },
  'home.upcoming':    { km: 'ខាងមុខ',            en: 'Upcoming' },
  'home.auspicious':  { km: 'ថ្ងៃមង្គល',        en: 'Auspicious' },
  'home.holidays':    { km: 'ថ្ងៃបុណ្យ',        en: 'Holidays' },
  'home.convert':     { km: 'បំលែង',            en: 'Convert' },

  // Calendar
  'cal.selectDay':    { km: 'ជ្រើសថ្ងៃ',        en: 'Select day' },
  'cal.moonPhase':    { km: 'ដំណាក់ព្រះចន្ទ',   en: 'Moon phase' },
  'cal.lunarDay':     { km: 'ថ្ងៃចន្ទគតិ',      en: 'Lunar day' },
  'cal.buddhistEra':  { km: 'ព.ស.',              en: 'B.E.' },

  // Auth
  'auth.login':       { km: 'ចូលគណនី',           en: 'Sign In' },
  'auth.register':    { km: 'ចុះឈ្មោះ',          en: 'Register' },
  'auth.logout':      { km: 'ចាកចេញ',            en: 'Sign Out' },
  'auth.email':       { km: 'អ៊ីមែល',             en: 'Email' },
  'auth.password':    { km: 'ពាក្យសម្ងាត់',       en: 'Password' },
  'auth.forgot':      { km: 'ភ្លេចពាក្យសម្ងាត់?',  en: 'Forgot password?' },

  // Common
  'common.save':      { km: 'រក្សាទុក',  en: 'Save' },
  'common.cancel':    { km: 'បោះបង់',   en: 'Cancel' },
  'common.loading':   { km: 'កំពុងផ្ទុក', en: 'Loading' },
  'common.error':     { km: 'មានបញ្ហា',  en: 'Error' },
  'common.retry':     { km: 'ព្យាយាម',   en: 'Retry' },
};

export function t(key: string, locale: Locale = 'km'): string {
  return strings[key]?.[locale] ?? key;
}
