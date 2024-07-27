export type DepositDataType = {
    amount: number,
}

export type MultiSwapDataType = {
    inputToken: string,
    inputTokenAmount: number,
    outputtoken:{
        token: string[],
        percentage: number[]
    }
}