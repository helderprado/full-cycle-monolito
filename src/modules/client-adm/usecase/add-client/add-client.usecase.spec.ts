import AddClientUseCase from "./add-client.usecase"

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe("Unit test for add-client use case", () => {
    it("should add a client", async () => {

        const clientRepository = MockRepository()

        const usecase = new AddClientUseCase(clientRepository)

        const input = {
            name: "John",
            email: "john@john.com",
            address: "Street 1"
        }

        const result = await usecase.execute(input)

        expect(clientRepository.add).toHaveBeenCalled()
        expect(result.id).toBeDefined()
        expect(result.name).toEqual(input.name)
        expect(result.address).toEqual(input.address)



    })
})