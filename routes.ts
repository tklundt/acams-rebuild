/**
 * An array of routes accessible to public without authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/"
]

/**
 * An array of routes used for authentication
 * These routes redirect to /settings page
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
]

/**
 * Prefix for API authentication routes
 * Needed for API authentication (allow people to log in without being authenticated)
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";