import withField from "../hoc/withField";

function TextInput({
    name,
    value,
    onChange,
}: TextInputProps) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        onChange(e.target.value);
    }

    return (
        <input
            name={name}
            type="text"
            value={value ?? ''}
            onChange={handleChange}
        />
    )
}

export type TextInputValue = string | null;
export interface TextInputProps {
    name: string,
    value?: TextInputValue,
    onChange: (value: TextInputValue) => void,
}

export default withField(TextInput);