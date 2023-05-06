import { GENERIC_VALIDATORS, TYPE_VALIDATORS, ValidatorFactory } from "../definitions/validators";
import { Field, Validator, FieldValidator, InputType } from "../types";

export default function withValidity<T extends object>(Element: React.ComponentType<T>) {
    function Wrapped({ type, validators: customValidators = [], ...constraints }: FieldProps & any) {
        const allValidators = [
            ...customValidators,
            ...getValidatorsForType(type, constraints),
            ...getApplicableValidators(GENERIC_VALIDATORS, constraints)
        ]

        return (
            <Element
                {...constraints}
                validators={allValidators}
                type={type}
            />
        )
    }

    Wrapped.displayName = Element.displayName || Element.name

    return Wrapped
}

function getValidatorsForType(type: InputType, constraints: { [key: string]: any }) {
    if (!type || type in TYPE_VALIDATORS === false) {
        return []
    }

    const typeValidators = TYPE_VALIDATORS[type]

    return getApplicableValidators(typeValidators, constraints)
}

function getApplicableValidators(validatorMap: { [key: string]: ValidatorFactory}, constraints: { [key: string]: any }) {
    return Object.keys(constraints).reduce((validators: Validator[], constraintKey) => {
        if (constraintKey in validatorMap === false) {
            return validators
        }

        const validator = validatorMap[constraintKey](constraints[constraintKey])

        // probably bad code, but i want to remove the props that are used by the validator
        delete constraints[constraintKey]

        validators.push(validator)

        return validators
    }, [])
}

export interface FieldProps extends Field {
    type: InputType,
    validators?: FieldValidator[],
}