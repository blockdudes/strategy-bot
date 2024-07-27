export type DepositDataType = {
    minAmount: number,
    maxAmount: number,
}

export type MultiSwapDataType = {
    inputToken: string,
    outputtoken:{
        token: string[],
        percentage: number[]
    }
}