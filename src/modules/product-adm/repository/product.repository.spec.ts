import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";


describe("Unit test for product repository", () => {
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
        const productRepository = new ProductRepository()

        const productProps = {
            id: new Id("1"),
            name: "product 1",
            description: "product 1 decription",
            stock: 100,
            purchasePrice: 10
        }

        const product = new Product(productProps)

        await productRepository.add(product)

        const productDb = await ProductModel.findOne({ where: { id: productProps.id.id } })

        expect(product.id.id).toEqual(productDb.id)
        expect(product.name).toEqual(productDb.name)
        expect(product.name).toEqual(product.name)

    })

    it("should find a product", async () => {
        const productRepository = new ProductRepository()

        ProductModel.create({
            id: "1",
            name: "product 1",
            description: "product 1 decription",
            stock: 100,
            purchasePrice: 10,
            createdAt: new Date,
            updatedAt: new Date
        })

        const product = await productRepository.find("1")

        expect(product.id.id).toEqual("1")
        expect(product.name).toEqual("product 1")
        expect(product.description).toEqual("product 1 decription")

    })
})