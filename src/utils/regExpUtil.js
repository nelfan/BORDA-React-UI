export const USER_NAME_REG_EXP = /^(?!.*[_]{2})[a-zA-Z0-9_]+(?<![_.])$/;
export const FIRST_NAME_REG_EXP = /^[A-Z][a-z]*$/;
export const LAST_NAME_REG_EXP = /^[A-Z][a-z]*([-][A-Z][a-z]*)?$/;
export const EMAIL_REG_EXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REG_EXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;