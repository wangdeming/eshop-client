const root = process.env.API_HOST;

export const IS_MOCK = false
export const API_BASE_URL = IS_MOCK ? '/mock/' : root
export const TOKEN_KEY = 'X-shop-Token'
export const HISTORY_KEY = 'History-Key'
