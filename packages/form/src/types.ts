import { SerializableParam } from "recoil";

export interface Field<T = any> {
    name: string;
    value: T | null;
    isRequired?: boolean;
    validators?: FieldValidator[];
}

export interface Form {
    // TODO: Not sure what props we need
}

export type FieldValues = object
export type Validator = {
    isValid: (value: any) => boolean;
    errorMessage: string;
}
export type FieldValidator = {
    isValid: (value: any, values: FieldValues) => boolean;
    errorMessage: string;
}

export enum InputType {
    TEXT = 'text',
    INTEGER = 'integer',
    FLOAT = 'float',
}

export interface ValidityState extends Readonly<{ [key: string]: SerializableParam; }> {
    isValid: boolean,
    errorMessage?: string,
    invalidValue?: any,
}