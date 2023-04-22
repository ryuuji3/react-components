import useField from "../hooks/useField";
import useForm from "../hooks/useForm";
import { Field, ValidityState } from "../types";

export default function withField<T>(Input: React.ComponentType<T>) {
    function Wrapped({ name, value: initialValue, onChange, ...otherProps }: any & FieldProps) {
        const form = useForm()
        const {
            value,
            setValue,
            validity,
            setValidity,
        } = useField({
            name,
            value: initialValue,
        })

        function handleChange(value: any) {
            setValue(value);
            form.onChange();
            onChange?.(value);
        }

        return (
            <Input
                {...otherProps}
                name={name}
                value={value}
                onChange={handleChange}
                onValidityChange={setValidity}
                errorMessage={validity.message}
                isValid={validity.isValid}
            />
        )
    }

    Wrapped.displayName = Input.displayName || Input.name

    return Wrapped
}

export interface FieldProps extends Field {
    name: string,
    onChange?: (value: any) => void,
    onValidityChange?: (validity: ValidityState) => void,
}