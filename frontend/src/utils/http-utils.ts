import {Config} from '../config/config';
import {AuthUtils} from "./auth-util";
import {AuthInfoKey} from "../types/util-types/user-info.type";


export class HttpUtils {

    public static async request(url: string, method: string = "GET", useAuth = true, body: any = null): Promise<any> {
        const result: any = {
            error: false,
            response: null
        }
        const params: any = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }
        let token: string | null = null;

        if (useAuth) {
            token = (AuthUtils.getAuthInfo(AuthInfoKey.accessToken) as string | null);
            if (token) {
                params.headers['x-auth-token'] = token;
            }
        }
        if (body) {
            params.body = JSON.stringify(body);
        }
        let response: any = null;
        try {
            response = await fetch(Config.api + url, params);
            result.response = await response.json();
        } catch (e) {
            result.error = true;
            return result;
        }
        if (useAuth && response.status === 401) {
            if (!token) { // токена нет
                result.redirect = '/login';
                return result;
            } else {  //2 - токен устарел / невалидный (надо обновить)
                const updateTokenResult = await AuthUtils.updateRefreshToken();
                if (updateTokenResult) { // запрос повторно
                    return this.request(url, method, useAuth, body);
                } else {
                    result.redirect = '/login';
                    return result;
                }
            }
        }
        if (response.status < 200 || response.status > 299) {
            result.redirect = '/login';
            result.error = true;
        }
        return result;
    }

}