export interface PaymentFacadeInputDto {
    orderId: string
    amount: number
}


export interface PaymentFacadeOutputDto {
    transactionId: string
    amount: number
    orderId: string
    status: string
    createdAt: Date
    updatedAt: Date
}

export default interface PaymentFacadeInterface {
    process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto>
}