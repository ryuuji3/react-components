import React from 'react'

import withLabel from '../hoc/withLabel'
import { ValidityState } from '../types'
import withErrorMessage from '../hoc/withErrorMessage'
import useInputValidity from '../hooks/useInputValidity'

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
    const {
        currentValue,
        updateValue,
    } = useInputValidity({
        value,
        onChange,
        onValidityChange,
        isRequired,
        checkValidity(newValue: ParsedInputValue) {
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
    })

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

export type ParsedInputValue = number;
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