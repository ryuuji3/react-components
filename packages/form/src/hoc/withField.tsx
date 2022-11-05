import useField from "../hooks/useField";
import { Field } from "../types";

export default function withField<T>(Input: React.ComponentType<T>) {
    return function ({ name, value: initialValue, onChange, ...otherProps }: any & FieldProps) {
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
}

export interface FieldProps extends Field {
    onChange?: (value: any) => void,
}