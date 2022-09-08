import StoreCalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {
    static create(): StoreCalogFacade {
        const productRepository = new ProductRepository()
        const findUseCase = new FindProductUseCase(productRepository)
        const findAllUseCase = new FindAllProductsUseCase(productRepository)

        const facade = new StoreCalogFacade({
            findUseCase: findUseCase,
            findAllUseCase: findAllUseCase
        })

        return facade
    }


}