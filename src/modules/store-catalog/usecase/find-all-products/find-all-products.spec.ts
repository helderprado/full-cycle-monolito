import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import FindAllProductsUseCase from "./find-all-products.usecase"

const product1 = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    salesPrice: 100,
})

const product2 = new Product({
    id: new Id("2"),
    name: "Product 2",
    description: "Product 2 description",
    salesPrice: 200,
})

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2]))
    }
}

describe("Unit test for find all products", () => {
    it("should find all products", async () => {
        const productRepopsitory = MockRepository()

        const usecase = new FindAllProductsUseCase(productRepopsitory)

        const output = await usecase.execute()

        expect(productRepopsitory.findAll).toHaveBeenCalled()
        expect(output.products.length).toBe(2)
        expect(output.products[0].id).toBe("1")
        expect(output.products[0].name).toBe("Product 1")
        expect(output.products[0].salesPrice).toBe(100)
        expect(output.products[1].id).toBe("2")
        expect(output.products[1].name).toBe("Product 2")
        expect(output.products[1].salesPrice).toBe(200)
    })
})