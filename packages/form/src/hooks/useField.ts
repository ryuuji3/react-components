import { useEffect } from "react"
import { atom, atomFamily, useRecoilState } from "recoil"
import { Field } from "../types"

function useField<T>(field: Field<T>) {
    const [ value, setValue ] = useRecoilState(FormValue(field.name))
    const [ fields, setFields ] = useRecoilState(Fields)

    // Update the value of the field in the form state
    useEffect(
        () => {
            setValue(field.value)
        },
        [field.value, setValue]
    )

    // Register field so the form can know about it
    useEffect(
        () => {
            if (!fields.includes(field.name)) {
                setFields([ ...fields, field.name ])
            }
        },
        [ field.name, fields, setFields ]
    )

    return [ value, setValue ]
}

export const Fields = atom<string[]>({
    key: "fields",
    default: [],
})

export const FormValue = atomFamily<any, string>({
    key: "formValue",
    default: null,
})

export default useField