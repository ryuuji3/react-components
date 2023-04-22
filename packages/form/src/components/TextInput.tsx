import React, { useCallback, useEffect, useState } from 'react'

import withLabel from '../hoc/withLabel'
import withErrorMessage from '../hoc/withErrorMessage'
import { ValidityState } from '../types'

function TextInput({
    name,
    value,
    onChange,
    onValidityChange,
    isRequired,
    ...inputProps
}: TextInputProps) {
    const [ currentValue, setValue ] = useState(value)

    const checkValidity = useCallback(
        (newValue: TextInputValue) => {
            if (newValue == null) {
                return {
                    isValid: !isRequired,
                    ...(isRequired && {
                        message: 'Value is required',
                    }),
                    invalidValue: newValue,
                }
            }

            return { isValid: true }
        },
        [ isRequired ]
    )

    const updateValue = useCallback(
        (newValue: TextInputValue) => {
            setValue(newValue)

            const validity = checkValidity(newValue)
            onValidityChange?.(validity)
            onChange?.(validity.isValid ? newValue : null)
        },
        [ setValue, onValidityChange, onChange, checkValidity ]
    )

    // Synchronize value prop with internal state
    useEffect(
        () => {
            if (typeof value === 'string' && value !== currentValue) {
                updateValue(value)
            }
        },
        [ value, currentValue, updateValue ]
    )

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
    onValidityChange?: (validity: ValidityState) => void,
    isRequired?: boolean,
}

export default withLabel(withErrorMessage(TextInput))