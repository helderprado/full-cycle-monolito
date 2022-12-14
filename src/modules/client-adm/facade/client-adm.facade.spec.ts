import { Sequelize } from "sequelize-typescript"
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory"
import ClientModel from "../repository/client.model"
import ClientRepository from "../repository/client.repository"
import AddClientUseCase from "../usecase/add-client/add-client.usecase"
import ClientAdmFacade from "./client-adm.facade"


describe("Unit test for client-adm facade", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([ClientModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a client", async () => {
        const repository = new ClientRepository();
        const addUsecase = new AddClientUseCase(repository);
        const facade = new ClientAdmFacade({
            addUsecase: addUsecase,
            findUsecase: undefined,
        });

        const input = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",
        };

        await facade.add(input);

        const client = await ClientModel.findOne({ where: { id: "1" } });

        expect(client).toBeDefined();
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.address).toBe(input.address);
    });

    it("shoud find a client", async () => {
        const facade = ClientAdmFacadeFactory.create()

        const input = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",
        };

        await facade.add(input)

        const client = await facade.find({ id: "1" })

        expect(client).toBeDefined();
        expect(client.id).toBe(input.id);
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.address).toBe(input.address);
    })
})