import React, { useCallback, useEffect, useState } from 'react'

import withLabel from '../hoc/withLabel'
import { ValidityState } from '../types'
import withErrorMessage from '../hoc/withErrorMessage'

function NumberInput({
    name,
    value,
    onChange,
    onValidityChange,
    // validation
    max = Infinity,
    min = -Infinity,
    isRequired,
    ...inputProps
}: NumberInputProps) {
    const [ currentValue, setValue ] = useState(value)

    const checkValidity = useCallback(
        (newValue: NumberInputValue) => {
            if (newValue == null) {
                return {
                    isValid: !isRequired,
                    ...(isRequired && {
                        message: 'Value is required',
                    }),
                    invalidValue: newValue,
                }
            }

            if (Number.isNaN(newValue)) {
                return {
                    isValid: false,
                    message: 'Value is not a number',
                    invalidValue: newValue,
                }
            }

            if (newValue > max) {
                return {
                    isValid: false,
                    message: 'Value is too large',
                    invalidValue: newValue,
                }
            }

            if (newValue < min) {
                return {
                    isValid: false,
                    message: 'Value is too small',
                    invalidValue: newValue,
                }
            }

            return { isValid: true }
        },
        [ isRequired, max, min]
    )

    const updateValue = useCallback(
        (newValue: NumberInputValue) => {
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
            if (typeof value === 'number' && value !== currentValue) {
                updateValue(value)
            }
        },
        [ value, currentValue, updateValue ]
    )

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === '') {
            return updateValue(null)
        }

        const newValue = Number(e.target.value)

        // only update value if it's a valid number
        if (!Number.isNaN(newValue)) {
            updateValue(newValue)
        }
    }

    return (
        <input
            {...inputProps}
            name={name}
            type="number"
            inputMode="decimal"
            value={currentValue?.toString() ?? ''}
            onChange={handleChange}
        />
    )
}

export type NumberInputValue = number | null;
export type NumberInputProps = {
    name: string,
    value?: NumberInputValue,
    onChange?: (value: NumberInputValue) => void,
    onValidityChange?: (validity: ValidityState) => void,

    // validation
    max?: number,
    min?: number,
    isRequired?: boolean,
}

export default withLabel(withErrorMessage(NumberInput))