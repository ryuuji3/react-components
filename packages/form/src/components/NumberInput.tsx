import React from 'react'

import withErrorMessage from '../hoc/withErrorMessage'
import useInput from '../hooks/useInput'

function NumberInput({
    name,
    value,
    onChange,
    onKeyDown,
    decimalScale,
    ...inputProps
}: NumberInputProps) {
    const {
        currentValue,
        updateValue,
    } = useInput({
        value,
        onChange,
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === '') {
            return updateValue(null)
        }

        const newValue = parseNumber(e.target.value)

        // only update value if it's a valid number
        if (typeof newValue === 'number') {
            updateValue(newValue)
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (decimalScale === 0 && e.key === '.') {
            e.preventDefault()
        }

        onKeyDown?.(e)
    }

    return (
        <input
            {...inputProps}
            name={name}
            type="number"
            value={getInputValue(currentValue, decimalScale)}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    )
}

function parseNumber(value: string, decimalScale?: number) {
    const parsed = Number(value)

    // Not parseable; bail since we'll ignore their input
    if (Number.isNaN(parsed)) {
        return;
    }

    return parsed
}

function getInputValue(value?: number | null, decimalScale?: number): string {
    if (!value) {
        return ''
    }

    return typeof decimalScale === 'number'
        ? value.toFixed(decimalScale)
        : value.toString()
}

export type NumberInputValue = number | null;
export type NumberInputProps = {
    name: string,
    value?: NumberInputValue,
    onChange?: (value: NumberInputValue) => void,
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>,
    decimalScale?: number,
}

export default withErrorMessage(NumberInput)