export type ValidationPatternType = {
    email: RegExp | null,
    password: RegExp | null,
    name: RegExp | null,
}

export type ValidationOption = {
    pattern?: RegExp,
    compareTo?:string
}

export type ValidationElement = {
    element:HTMLInputElement,
    options?: ValidationOption
}