import useField from "../hooks/useField";
import { Field } from "../types";

export default function withField<T>(Input: React.ComponentType<T>) {
    function Wrapped({ name, value: initialValue, onChange, ...otherProps }: any & FieldProps) {
        const [ value, setValue ] = useField({
            name,
            value: initialValue,
        })

        function handleChange(value: any) {
            setValue(value);
            onChange?.(value);
        }

        return (
            <Input
                {...otherProps}
                name={name}
                value={value}
                onChange={handleChange}
            />
        )
    }

    Wrapped.displayName = Input.displayName || Input.name

    return Wrapped
}

export interface FieldProps extends Field {
    onChange?: (value: any) => void,
}