import { SerializableParam } from "recoil";

export interface Field<T = any> {
    name: string;
    value: T | null;
    isRequired?: boolean;
}

export interface Form {
    // TODO: Not sure what props we need
}

export interface ValidityState extends Readonly<{ [key: string]: SerializableParam; }> {
    isValid: boolean,
    message?: string,
    invalidValue?: any,
}