import { Sequelize } from "sequelize-typescript"
import PaymentFacadeFactory from "../factory/payment.facade.factory"
import { TransactionModel } from "../repository/transaction.model"
import TransactionRepository from "../repository/transaction.repository"
import ProcessPaymentUseCase from "../usecase/process-payment.usecase"
import PaymentFacade from "./payment.facade"

describe("Unit test for payment facade", () => {

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
        // const transactionRepository = new TransactionRepository()
        // const processUseCase = new ProcessPaymentUseCase(transactionRepository)
        // const facade = new PaymentFacade(processUseCase)

        const facadeFactory = PaymentFacadeFactory.create()

        const input = {
            orderId: "order-1",
            amount: 100
        }

        const output = await facadeFactory.process(input)

        expect(output).toBeDefined();
        expect(output.orderId).toBe(input.orderId);
        expect(output.amount).toBe(input.amount);
        expect(output.status).toBe("approved");

    })
})