export type DepositDataType = {
    inputToken:string,
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