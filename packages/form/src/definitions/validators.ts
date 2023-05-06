import { Validator, InputType } from "../types";


const NUMBER_VALIDATORS: { [key: string]: (...args: any[]) => Validator } = {
    min(minValue: number) {
        return {
            isValid: value => value >= minValue,
            errorMessage: `Value must be greater than or equal to ${minValue}`,
        }
    },
    max(maxValue: number) {
        return {
            isValid: value => value <= maxValue,
            errorMessage: `Value must be less than or equal to ${maxValue}`,
        }
    }
}

export const TYPE_VALIDATORS: { [key in InputType]: { [key: string]: (...args: any[]) => Validator }} = {
    [InputType.TEXT]: {
        // TODO: Add validators
    },
    [InputType.INTEGER]: {
        ...NUMBER_VALIDATORS
    },
    [InputType.FLOAT]: {
        ...NUMBER_VALIDATORS
    },
}

export const GENERIC_VALIDATORS: { [key: string]: (...args: any[]) => Validator } = {
    isRequired() {
        return {
            isValid: value => value != null,
            errorMessage: 'Value is required',
        }
    },
}

// Most validators are parameterized, so we need to allow passing in arguments.
// For simplicity, all validators will become factories even if they don't need arguments.
export type ValidatorFactory = (...args: any[]) => Validator