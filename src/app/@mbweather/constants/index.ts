import { environment } from "src/environments/environment";

/**
 * The number of milliseconds in a second.
 */
const MILLISECONDS = environment.app.config.constants.MILLISECONDS;

/**
 * The temperature unit in Kelvin.
 */
const KELVIN = environment.app.config.constants.KELVIN;

/**
 * The languages supported by the application.
 */
const LANGUAGES = environment.app.config.languages;

/**
 * The regular expression used to validate the language.
 */
const langRegEx: RegExp = new RegExp(`^${LANGUAGES.available.map(lang => lang.short).join('|')}$`, 'i');

/**
 * The storage keys used by the application.
 */
const STORAGE_KEYS = environment.app.config.storage.keys;

export {
  MILLISECONDS,
  KELVIN,
  LANGUAGES,
  langRegEx,
  STORAGE_KEYS
};