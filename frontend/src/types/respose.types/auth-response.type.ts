
export type LoginResponseRecord = {
    tokens:{
        accessToken:string,
        refreshToken:string,
    },
    user:{
        id:number,
        name:string,
        lastName:string,
    }
}

export type SignUpResponseRecord = {
    tokens:{
        accessToken:string,
        refreshToken:string,
    },
    user:{
        id:number,
        name:string,
    }
}

export type LoginResponseType = {
    error?: boolean,
    response: LoginResponseRecord
}

export type SignUpResponseType = {
    error?: boolean,
    response: SignUpResponseRecord
}
