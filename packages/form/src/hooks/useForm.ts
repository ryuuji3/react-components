import { selector, useRecoilValue } from "recoil"
import { Fields, FormValue } from "./useField"

function useForm() {
    const fields = useRecoilValue(FormFields)

    return { 
        get fields() {
            return fields
        }
    }
}

export const FormFields = selector({
    key: "form",
    get: ({ get }) => get(Fields).map(fieldName => ({
        get name() { return fieldName },
        get value() { return get(FormValue(fieldName)) },
    })),
})

export default useForm