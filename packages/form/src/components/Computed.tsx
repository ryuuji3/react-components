import { useRecoilValue } from "recoil";
import withLabel from "../hoc/withLabel";
import useForm, { FieldValues, FormFields } from "../hooks/useForm";

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
        return children(value, form);
    }

    // Simple output of the value
    return (
        <output name={name}>{value}</output>
    )
}

export type ComputedProps = {
    name?: string,
    getValue: (values: FieldValues) => any,
    isRendered?: boolean,
    children?: (value: any, values: FieldValues) => React.ReactElement,
}

export default withLabel(Computed)