import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import FindProductUseCase from "./find-product.usecase"

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    salesPrice: 100,
})

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn()
    }
}

describe("Unit test for find a product", () => {
    it("should find a product", async () => {
        const productRepopsitory = MockRepository()

        const usecase = new FindProductUseCase(productRepopsitory)

        const input = {
            id: "1"
        }

        const output = await usecase.execute(input)

        expect(productRepopsitory.find).toHaveBeenCalled()
        expect(output.id).toBe("1")
        expect(output.name).toBe("Product 1")
        expect(output.description).toBe("Product 1 description")
        expect(output.salesPrice).toBe(100)
    })
})