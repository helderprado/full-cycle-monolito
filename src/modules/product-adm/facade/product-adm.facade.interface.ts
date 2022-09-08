export interface AddProductFacadeInputDto {
    id?: string
    name: string
    description: string
    purchasePrice: number
    stock: number
}

export interface CheckStockInputDto {
    productId: string
}

export interface CheckStockFacadeDto {
    productId: string
    stock: number
}

export default interface ProductAdmFacadeInterface {
    addProduct(input: AddProductFacadeInputDto): Promise<void>

    checkStock(input: CheckStockInputDto): Promise<CheckStockFacadeDto>
}