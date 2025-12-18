/**
 * UMS (User Management Service) Request Models
 */

/**
 * Login request payload model
 */
export interface LoginRequest {
    /**
     * Username, email, or phone number for login
     */
    input: string;

    /**
     * User password
     */
    password: string;

    /**
     * Remember me flag (0 = false, 1 = true)
     */
    isRemember: 0 | 1;
}

/**
 * Default value for optional login field
 */
export const DEFAULT_LOGIN_REMEMBER_ME = 0;
