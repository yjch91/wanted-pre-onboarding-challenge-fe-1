export const LOGIN_TOKEN = "loginToken" as const;
export const AUTHORIZATION_HEADER = "Authorization" as const;
export const CONTENT_TYPE_HEADER = "Content-Type" as const;
export const CONTENT_TYPE = "application/json" as const;
export const EMAIL_REGEXP: RegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+.[a-zA-Z]+$/;