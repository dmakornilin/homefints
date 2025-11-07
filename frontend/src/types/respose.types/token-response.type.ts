export type TokensType = {
    accessToken:string,
    refreshToken:string
}

export type DefaultResponseType ={
    error: boolean,
    message?: string | null,
    tokens?: TokensType
}

