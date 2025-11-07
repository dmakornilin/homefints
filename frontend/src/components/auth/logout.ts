import {AuthUtils} from "../../utils/auth-util";
import {HttpUtils} from "../../utils/http-utils";
import {AuthInfoKey} from "../../types/util-types/user-info.type";
import type {NewRouteFunction} from "../../types/util-types/new-route.type";


export class Logout {
    private readonly openNewRoute:NewRouteFunction;

    constructor(openNewRoute:NewRouteFunction) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.getAuthInfo(AuthInfoKey.accessToken ) || !AuthUtils.getAuthInfo(AuthInfoKey.refreshToken)) {
            this.openNewRoute('/login');
            return;
        }
        this.logout().then();
    }

    private async logout():Promise<void> {
        await HttpUtils.request('/logout', 'POST', false,
            {
                refreshToken: AuthUtils.getAuthInfo(AuthInfoKey.refreshToken)
            });

        AuthUtils.removeAuthInfo();

        this.openNewRoute("/login");
    }

}

