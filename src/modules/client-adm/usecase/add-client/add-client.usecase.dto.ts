export interface AddClientInputDto {
    id?: string,
    name: string
    email: string
    address: string
}

export interface AddClientOutputDto {
    id?: string,
    name: string
    email: string
    address: string
    createAt: Date
    updatedAt: Date
}