export interface User {
    username: string;
    password: string;
    email?: string;
    id?: number;
}

export interface UsersData {
    [key: string]: User;
}