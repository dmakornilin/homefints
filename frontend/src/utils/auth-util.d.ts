import { type AuthInfo, AuthInfoKey, type UserInfo } from "../types/util-types/user-info.type";
export declare class AuthUtils {
    private static readonly accessTokenKey;
    private static readonly refreshTokenKey;
    private static readonly userInfoKey;
    static setAuthInfo(accessToken: string, refreshToken: string, userInfo?: UserInfo | null): void;
    static removeAuthInfo(): void;
    static isLogin(): boolean;
    static getAuthInfo(key?: AuthInfoKey | null): string | AuthInfo | null;
    static updateRefreshToken(): Promise<boolean>;
}
//# sourceMappingURL=auth-util.d.ts.map