import AddProductUseCase from "./add-product.usecase"

const input = {
    name: "Product 1",
    description: "Product 1 description",
    purchasePrice: 100,
    stock: 10
}

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}


describe("Unit test for add product use case", () => {
    it("should add a product", async () => {
        const productRepopsitory = MockRepository()

        const usecase = new AddProductUseCase(productRepopsitory)

        const output = await usecase.execute(input)

        expect(productRepopsitory.add).toHaveBeenCalled()
        expect(output.name).toBe(input.name)
    })
})