import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/value-object/id.value-object"
import ProductAdmFacadeFactory from "../factory/facade.factory"
import ProductModel from "../repository/product.model"
import ProductRepository from "../repository/product.repository"
import AddProductUseCase from "../usecase/add-product/add-product.usecase"
import ProductAdmFacade from "./product-adm.facade"

describe("Unit test for product-adm facade", () => {

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

    it("should create a product", async () => {

        const productFacade = ProductAdmFacadeFactory.create()

        const input = {
            id: "1",
            name: "product 1",
            description: "product 1 decription",
            stock: 100,
            purchasePrice: 10
        }

        await productFacade.addProduct(input)

        const product = await ProductModel.findOne({ where: { id: "1" } })


        expect(input.id).toEqual(product.id)
        expect(input.name).toEqual(product.name)
        expect(input.description).toEqual(product.description)

    })

    it("should check product stock", async () => {

        const productFacade = ProductAdmFacadeFactory.create()

        const input = {
            id: "1",
            name: "product 1",
            description: "product 1 decription",
            stock: 100,
            purchasePrice: 10
        }

        await productFacade.addProduct(input)

        const result = await productFacade.checkStock({ productId: "1" })


        expect(result.productId).toBe("1")
        expect(input.stock).toBe(100)

    })
})