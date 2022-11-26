import React, { useEffect, useState } from 'react'

import withLabel from '../hoc/withLabel'

function NumberInput({
    name,
    value,
    onChange,
    ...inputProps
}: NumberInputProps) {
    const [ currentValue, setValue ] = useState(value)

    // Synchronize the value prop with the internal state
    useEffect(
        () => setValue(value),
        [ value ]
    )

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = Number(e.target.value)

        if (Number.isNaN(newValue)) {
            return // ignore change, its not valid
        }

        setValue(newValue)
        onChange?.(newValue);
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
}

export default withLabel(NumberInput)