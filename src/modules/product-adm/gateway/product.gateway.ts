import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";

export default interface ProcuctGateway {
    add(product: Product): Promise<void>
    find(id: string): Promise<Product>
}