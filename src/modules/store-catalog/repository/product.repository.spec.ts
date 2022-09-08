import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model"
import ProductRepository from "./product.repository"

describe("Product repository test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should find all products", async () => {

        await ProductModel.create({
            id: "1",
            name: "product 1",
            description: "product 1 decription",
            salesPrice: 100,
        })


        await ProductModel.create({
            id: "2",
            name: "product 2",
            description: "product 2 decription",
            salesPrice: 200,
        })

        const productRepository = new ProductRepository()

        const products = await productRepository.findAll()

        expect(products.length).toBe(2)
        expect(products[0].id.id).toBe("1")
        expect(products[0].name).toBe("product 1")
        expect(products[0].salesPrice).toBe(100)

        expect(products[1].id.id).toBe("2")
        expect(products[1].name).toBe("product 2")
        expect(products[1].salesPrice).toBe(200)
    })

    it("should find a product", async () => {
        await ProductModel.create({
            id: "1",
            name: "product 1",
            description: "product 1 decription",
            salesPrice: 100,
        })

        const productRepository = new ProductRepository()

        const product = await productRepository.find("1")

        expect(product.id.id).toBe("1")
        expect(product.name).toBe("product 1")
        expect(product.salesPrice).toBe(100)

    })
})