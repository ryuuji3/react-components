import React, { useEffect, useState } from 'react'

function TextInput({
    name,
    value,
    onChange,
}: TextInputProps) {
    const [ currentValue, setValue ] = useState(value)

    // Synchronize the value prop with the internal state
    useEffect(
        () => setValue(value),
        [ value ]
    )

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = e.target.value

        setValue(newValue)
        onChange?.(newValue);
    }

    return (
        <input
            name={name}
            type="text"
            value={currentValue ?? ''}
            onChange={handleChange}
        />
    )
}

export type TextInputValue = string | null;
export interface TextInputProps {
    name: string,
    value?: TextInputValue,
    onChange?: (value: TextInputValue) => void,
}

export default TextInput