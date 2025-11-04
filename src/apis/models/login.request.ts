/**
 * Login request payload model
 */
export interface LoginRequest {
    /**
     * Username or email for login
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
 * Factory function to create login request payload
 */
export function createLoginRequest(
    username: string,
    password: string,
    rememberMe: boolean = false
): LoginRequest {
    return {
        input: username,
        password: password,
        isRemember: rememberMe ? 1 : 0
    };
}
