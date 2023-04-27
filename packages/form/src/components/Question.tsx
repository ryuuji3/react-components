import classNames from "classnames"

import Field from "./Field"
import './Question.css'


function Question({
    label,
    isVisible = true,
    className,
    ...fieldProps
}: QuestionProps & any) {
    return (
        <label className={classNames(className, 'question', { 'is-visible': isVisible })}>
            <span>{label}</span>
            <Field
                {...fieldProps}
            />
        </label>
        
    )
}

export interface QuestionProps {
    label: string,
    isVisible?: boolean,
    className?: string,
}

export default Question