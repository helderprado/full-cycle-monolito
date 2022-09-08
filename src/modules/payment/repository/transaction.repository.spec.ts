import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/value-object/id.value-object"
import Transaction from "../domain/transaction"
import { TransactionModel } from "./transaction.model"
import TransactionRepository from "./transaction.repository"

describe("Unit test for transaction repository", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([TransactionModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a transaction", async () => {
        const transactionRepository = new TransactionRepository()

        const transaction = new Transaction({
            id: new Id("1"),
            amount: 100,
            orderId: "1",
            status: "declined"
        })

        transaction.approve()

        const result = await transactionRepository.save(transaction)

        expect(result.id.id).toBe(transaction.id.id)
        expect(result.status).toBe("approved")
        expect(result.amount).toBe(100)
        expect(result.orderId).toBe("1")
    })
})