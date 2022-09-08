import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/address";
import Product from "./product.entity";

type InvoiceProps = {
    id?: Id // criado automaticamente
    name: string
    document: string
    address: Address // value object
    items: Product[] // Product entity
    createdAt?: Date // criada automaticamente
    updatedAt?: Date // criada automaticamente
}

export default class Invoice extends BaseEntity implements AggregateRoot {

}