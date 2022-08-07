import { atom } from 'recoil'
import Field from './model/Field'
import Fieldset from './model/Fieldset'

// Form is a collection of fields and fieldsets
export const Items = atom<Array<Field | Fieldset>>({
    key: 'items',
    default: [],
})

// We will create these dynamically
export function createField(field: Field) {
    return atom({
        key: field.id,
        default: field,
    })
}