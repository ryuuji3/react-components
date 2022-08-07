class Field<T = any> {
    id: string;
    value: T | null;

    constructor({
        id,
        value,
    }: Field) {
        this.id = id;
        this.value = value;
    }
}

interface Field<T = any> {
    id: string;
    value: T | null;
}

export function isField(item: any): item is Field {
    return item instanceof Field;
}

export default Field
