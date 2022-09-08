import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, {
    AddProductFacadeInputDto,
    CheckStockFacadeDto,
    CheckStockInputDto,
} from "./product-adm.facade.interface";

export interface UseCaseProps {
    addUseCase: UseCaseInterface;
    stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addUseCase: UseCaseInterface;
    private _checkStockUseCase: UseCaseInterface;

    constructor(useCaseProps: UseCaseProps) {
        this._addUseCase = useCaseProps.addUseCase;
        this._checkStockUseCase = useCaseProps.stockUseCase;
    }

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        return this._addUseCase.execute(input);
    }

    checkStock(input: CheckStockInputDto): Promise<CheckStockFacadeDto> {
        return this._checkStockUseCase.execute(input);
    }
}
