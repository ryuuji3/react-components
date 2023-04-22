import React from 'react'

import withLabel from '../hoc/withLabel'
import withErrorMessage from '../hoc/withErrorMessage'
import { ValidityState } from '../types'
import useInputValidity from '../hooks/useInputValidity'

function TextInput({
    name,
    value,
    onChange,
    onValidityChange,
    isRequired,
    ...inputProps
}: TextInputProps) {
    const {
        currentValue,
        updateValue,
    } = useInputValidity({
        value,
        onChange,
        onValidityChange,
        isRequired,
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

export type ParsedInputValue = string;
export type TextInputValue = string | null;
export interface TextInputProps {
    name: string,
    value?: TextInputValue,
    onChange?: (value: TextInputValue) => void,
    onValidityChange?: (validity: ValidityState) => void,
    isRequired?: boolean,
}

export default withLabel(withErrorMessage(TextInput))