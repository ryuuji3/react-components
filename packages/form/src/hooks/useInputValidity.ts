import { useState, useCallback, useEffect } from 'react'

import { ValidityState } from '../types'

function useInputValidity<T>({
    value,
    checkValidity,
    isRequired,
    onValidityChange,
    onChange,
}: {
    value?: T | null,
    checkValidity?: (value: T) => ValidityState,
    isRequired?: boolean,
    onValidityChange?: (validity: ValidityState) => void,
    onChange?: (value: T | null) => void,
}) {
    const [ currentValue, setValue ] = useState(value)

    const checkValidityAndRequired = useCallback(
        (newValue: any) => {
            if (newValue == null) {
                return {
                    isValid: !isRequired,
                    ...(isRequired && {
                        message: 'Value is required',
                    }),
                    invalidValue: newValue,
                }
            }

            return checkValidity?.(newValue) ?? { isValid: true }
        },
        [ isRequired, checkValidity ]
    )

    const updateValue = useCallback(
        (newValue: T | null) => {
            setValue(newValue)

            const validity = checkValidityAndRequired(newValue)
            onValidityChange?.(validity)
            onChange?.(validity.isValid ? newValue : null)
        },
        [ setValue, onValidityChange, onChange, checkValidityAndRequired ]
    )

    useEffect(
        () => {
            if (value != null && value !== currentValue) {
                updateValue(value)
            }
        },
        [ value, currentValue, updateValue ]
    )

    return {
        currentValue,
        updateValue,
    }
}

export default useInputValidity