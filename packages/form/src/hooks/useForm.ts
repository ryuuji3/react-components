import { useEffect } from "react"
import { atom, selector, useRecoilCallback, useRecoilState } from "recoil"
import { set as _set } from 'lodash'

import { Fields, FormValue, Validity } from "./useField"
import { FieldValues } from "../types"


function useForm({ onChange }: FormParams = {}) {
    const [ formChange, setFormChange ] = useRecoilState(FormChange)
    const [ shouldShowInvalid, setShouldShowInvalid ] = useRecoilState(ShouldShowInvalid)

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

    const getValidity = useRecoilCallback(
        ({ snapshot }) => () => {
            return snapshot.getLoadable(FormValidity).getValue()
        },
        []
    )

    function handleFieldChange() {
        formChange?.(getValues(), form)
    }

    function submit() {
        if (!getValidity()) {
            setShouldShowInvalid(true)
        }
    }

    // Use a symbol so we can pass this to callbacks
    const form = { 
        get fields() {
            return getValues()
        },
        onChange: handleFieldChange,
        get isValid() {
            return getValidity()
        },
        submit,
        shouldShowInvalid,
    }

    return form
}

export const FormChange = atom<Function | undefined>({
    key: "formChange",
    default: undefined,
})

export const FormFields = selector<FieldValues>({
    key: "form",
    get: ({ get }) => {
        const fields = get(Fields)

        return fields.reduce((values, fieldName) => {
            _set(values, fieldName, get(FormValue(fieldName)))
            return values
        }, {})
    },
})

export const FormValidity = selector({
    key: 'form.isValid',
    get: ({ get }) => {
        const fields = get(Fields)

        return fields
            .map(field => get(Validity(field)))
            .every(state => state.isValid)
    }
})

export const ShouldShowInvalid = atom<boolean>({
    key: "shouldShowInvalid",
    default: false,
})

export type FormParams = {
    onChange?: (values: FieldValues) => void
}

export default useForm