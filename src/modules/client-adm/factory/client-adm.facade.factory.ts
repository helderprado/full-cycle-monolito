import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
    static create() {
        const repository = new ClientRepository()
        const addClientUseCAse = new AddClientUseCase(repository)
        const findClientUseCase = new FindClientUseCase(repository)

        const facade = new ClientAdmFacade({
            addUsecase: addClientUseCAse,
            findUsecase: findClientUseCase
        })

        return facade
    }
}