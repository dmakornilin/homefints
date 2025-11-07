export type IdtransResposeType = {
    error?: boolean,
    response: {
        id: number,
        date: Date,
        amount: number,
        category: string,
        comment: string | null
    }
}