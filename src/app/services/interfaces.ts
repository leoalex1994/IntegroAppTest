export interface IUser {
    name: string;
    email: string;
    role: string;
    password?: string;
    passwordRepeat?: string;
    token?: string;
}