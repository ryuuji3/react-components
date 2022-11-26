import { useEffect } from "react"
import { atom, selector, useRecoilCallback, useRecoilState } from "recoil"
import { Fields, FormValue } from "./useField"

function useForm({ onChange }: FormParams = {}) {
    const [ formChange, setFormChange ] = useRecoilState(FormChange)

    // Sync onChange callback with formChange state (you can only have one form onChange at a time)
    useEffect(
        () => {
            if (typeof onChange === 'function' && formChange !== setFormChange) {
                setFormChange(() => onChange)
            }
        },
        [ formChange, setFormChange, onChange ]
    )

    // Lazily retrieve form values upon request
    const getValues = useRecoilCallback(
        ({ snapshot }) => () => {
            return snapshot.getLoadable(FormFields).getValue()
        },
        []
    )

    function handleFieldChange() {
        formChange?.(getValues(), form)
    }

    // Use a symbol so we can pass this to callbacks
    const form = { 
        get fields() {
            return getValues()
        },
        onChange: handleFieldChange,
    }

    return form
}

export const FormChange = atom<Function | undefined>({
    key: "formChange",
    default: undefined,
})

export const FormFields = selector({
    key: "form",
    get: ({ get }) => get(Fields).map(fieldName => ({
        get name() { return fieldName },
        get value() { return get(FormValue(fieldName)) },
    })),
})

export type FormParams = {
    onChange?: (values: FieldValues) => void
}
export type FieldValues = Array<{ name: string, value: any }>

export default useForm