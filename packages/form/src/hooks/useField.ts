import { useEffect } from "react"
import { atom, atomFamily, selectorFamily, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { Field, FieldValidator, Validator, ValidityState } from "../types"
import { FormFields } from "./useForm"

function useField<T>(field: Field<T>) {
    const [ value, setValue ] = useRecoilState(FormValue(field.name))
    const [ fields, setFields ] = useRecoilState(Fields)
    const setValidators = useSetRecoilState(Validators(field.name))
    const validity = useRecoilValue(Validity(field.name))

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

    // Register validators so we can validate the field
    useEffect(
        () => {
            setValidators(field.validators ?? [])
        },
        [ field.validators, setValidators ]
    )

    return {
        value,
        setValue,
        validity,
    }
}

export const Fields = atom<string[]>({
    key: "fields",
    default: [],
})

export const Validators = atomFamily<Array<Validator | FieldValidator>, string>({
    key: "validators",
    default: [],
})

export const Validity = selectorFamily<ValidityState, string>({
    key: "validity",
    get: (name) => ({ get }) => {
        return get(Validators(name)).reduce((validity: ValidityState, validator: FieldValidator) => {
            const isValid = validator.isValid(get(FormValue(name)), get(FormFields))

            if (isValid) {
                return validity
            }

            return { isValid, errorMessage: validator.errorMessage }
        }, { isValid: true })
    }
})

export const FormValue = atomFamily<any, string>({
    key: "formValue",
    default: null,
})

export default useField