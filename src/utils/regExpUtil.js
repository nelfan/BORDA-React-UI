/** USER_NAME_REG_EXP allows only english letters, numbers and symbol "_" inside.
 */
export const USER_NAME_REG_EXP = /^(?!.*[_]{2})[a-zA-Z0-9_]+(?<![_.])$/;

/** FIRST_NAME_REG_EXP allows only english letters.
 * Starts with one upper case letter and then any number of lower case letters.
 */
export const FIRST_NAME_REG_EXP = /^[A-Z][a-z]*$/;

/** LAST_NAME_REG_EXP allows only english letters.
 * Starts with one upper case letter and then any number of lower case letters.
 * Allows symbol "-" inside text for using double surname.
 * After symbol "-" requires one upper case letter and then any number of lower case letters.
 */
export const LAST_NAME_REG_EXP = /^[A-Z][a-z]*([-][A-Z][a-z]*)?$/;

/** EMAIL_REG_EXP checks for compliance with the email format?
 */
export const EMAIL_REG_EXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/** PASSWORD_REG_EXP allows only english letters and special characters.
 * Requires at least one upper case letter, one lower case letter and one number.
 */
export const PASSWORD_REG_EXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

/** BOARD_NAME_REG_EXP allows only english letters, numbers and special characters.
 */
export const BOARD_NAME_REG_EXP = /^[\s~`!@#$%^&*()_+=[\]\\{}|;':",.\/<>?a-zA-Z0-9-]+$/;