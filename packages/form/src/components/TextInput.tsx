import React from 'react'

import withErrorMessage from '../hoc/withErrorMessage'
import useInput from '../hooks/useInput'

function TextInput({
    name,
    value,
    onChange,
    ...inputProps
}: TextInputProps) {
    const {
        currentValue,
        updateValue,
    } = useInput({
        value,
        onChange,
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        updateValue(e.target.value === '' ? null : e.target.value)
    }

    return (
        <input
            {...inputProps}
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

export default withErrorMessage(TextInput)