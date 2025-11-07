export enum AuthInfoKey {
    name = 'name',
    lastName = 'lastName',
    email = 'email',
    accessToken = 'accessToken',
    refreshToken = 'refreshToken',
    userInfo= 'userInfo',
}


export type UserInfo = {
    id?: number;
    name?: string;
    lastName?: string;
    email?: string;
    fio?: string;
}

export type AuthInfo = {
    accessToken: string,
    refreshToken: string,
    userInfo: string
}