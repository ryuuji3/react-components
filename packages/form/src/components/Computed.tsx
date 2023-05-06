import { useRecoilValue } from "recoil";
import withLabel from "../hoc/withLabel";
import useForm, { FormFields } from "../hooks/useForm";
import { Form, FieldValues } from "../types";

function Computed({
    name,
    getValue,
    isRendered = true,
    children,
}: ComputedProps) {
    const form = useForm();
    const values = useRecoilValue(FormFields);
    const value = getValue?.(values)?.toString?.() ?? ''

    // TODO: Register computed field with form

    // By default, is not rendered
    if (!isRendered && typeof children !== 'function') {
        return null
    }

    // Allow custom rendition of the value
    if (typeof children === 'function') {
        return children(values, form);
    }

    // Simple output of the value
    return (
        <output name={name}>{value ?? '&mdash;'}</output>
    )
}

export type ComputedProps = {
    name?: string,
    getValue: (values: FieldValues) => any,
    isRendered?: boolean,
    children?: (values: FieldValues, form: Form) => React.ReactElement,
}

export default withLabel(Computed)