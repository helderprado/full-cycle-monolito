import { Sequelize } from "sequelize-typescript"
import StoreCatalogFacadeFactory from "../factory/facade.factory"
import ProductModel from "../repository/product.model"


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

    it("should find a product", async () => {

        const storeCatalogFacade = StoreCatalogFacadeFactory.create()

        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100
        })

        const result = await storeCatalogFacade.find({ id: "1" })

        expect(result.id).toEqual("1")
        expect(result.name).toEqual("Product 1")
        expect(result.description).toEqual("Product 1 description")

    })

    it("should find all products", async () => {

        const storeCatalogFacade = StoreCatalogFacadeFactory.create()

        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100
        })

        await ProductModel.create({
            id: "2",
            name: "Product 2",
            description: "Product 2 description",
            salesPrice: 200
        })

        const result = await storeCatalogFacade.findAll()

        expect(result.products[0].id).toEqual("1")
        expect(result.products[0].name).toEqual("Product 1")
        expect(result.products[0].description).toEqual("Product 1 description")
        expect(result.products[0].salesPrice).toEqual(100)


        expect(result.products[1].id).toEqual("2")
        expect(result.products[1].name).toEqual("Product 2")
        expect(result.products[1].description).toEqual("Product 2 description")
        expect(result.products[1].salesPrice).toEqual(200)

    })
})