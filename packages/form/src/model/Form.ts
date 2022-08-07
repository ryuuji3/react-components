import Field, { isField } from "./Field";
import Fieldset from "./Fieldset";

export default class Form {
    items: Items = [];

    constructor(items: Items) {
        this.items = items;
    }

    get fields(): Field[] {
        return this.items.reduce((fields, item) => {
            if (isField(item)) {
                fields.push(item);
            } else {
                fields = fields.concat(item.fields);
            }

            return fields
        }, [] as Field[])
    }

    getField(id: string): Field | undefined {
        return this.fields.find(field => field.id === id)
    }
}

type Items = Array<Field | Fieldset>;