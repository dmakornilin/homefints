import {Config} from '../config/config';
import {type AuthInfo, AuthInfoKey, type UserInfo} from "../types/util-types/user-info.type";
import type {DefaultResponseType, TokensType} from "../types/respose.types/token-response.type";


export class AuthUtils {
    private static readonly accessTokenKey: string = 'accessToken';
    private static readonly refreshTokenKey: string = 'refreshToken';
    private static readonly userInfoKey: string = 'userInfo';

    public static setAuthInfo(accessToken: string, refreshToken: string, userInfo: UserInfo | null = null) {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
        if (userInfo) {
            localStorage.setItem(this.userInfoKey, JSON.stringify(userInfo));
        }
    }

    public static removeAuthInfo() {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        localStorage.removeItem(this.userInfoKey);
    }


    public static isLogin(): boolean {
        let result: boolean = true;
        if (!localStorage.getItem(this.accessTokenKey)) {
            result = false;
        } else {
            if (!localStorage.getItem(this.refreshTokenKey)) {
                result = false;
            } else {
                if (!localStorage.getItem(this.userInfoKey)) {
                    result = false;
                }
            }
        }
        return result;
    }

    public static getAuthInfo(key: AuthInfoKey | null = null): string | AuthInfo | null {
        if (key && [this.accessTokenKey, this.refreshTokenKey, this.userInfoKey].includes(key)) {
            return localStorage.getItem(key);
        } else {
            const accessToken: string | null = localStorage.getItem(this.accessTokenKey);
            const refreshToken: string | null = localStorage.getItem(this.refreshTokenKey);
            const userInfo: string | null = localStorage.getItem(this.userInfoKey);
            if (accessToken && refreshToken && userInfo) {
                return {accessToken: accessToken, refreshToken: refreshToken, userInfo: userInfo};
            } else return null;
        }
    }

    public static async updateRefreshToken(): Promise<boolean> {
        let result: boolean = false;
        const refreshToken: string | null = (this.getAuthInfo(AuthInfoKey.refreshToken) as string | null);
        if (refreshToken) {
            const response = await fetch(Config.api + '/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({refreshToken: refreshToken,})
            });
            if (response && response.status === 200) {
                // console.log(response);
                const tokens: DefaultResponseType | null = await response.json();
                if (tokens && !tokens.error) {
                    this.setAuthInfo((tokens.tokens as TokensType).accessToken, (tokens.tokens as TokensType).refreshToken);
                    result = true;
                    return result;
                }
            }
        }
        if (!result) {
            this.removeAuthInfo()
        }
        return result;
    }
}