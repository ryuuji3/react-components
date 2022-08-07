import Field from './Field'


export default class Fieldset {
    id: string;
    fields: Field[] = [];

    constructor({
        id,
        fields,
    }: { id: string, fields: Field[] }) {
        this.id = id;
        this.fields = fields;
    }
}