import { ValidityState } from "../types"

import './withErrorMessage.css'

function withErrorMessage<T>(Element: React.ComponentType<T>) {
    function withErrorMessageWrapper({ 
        isValid,
        errorMessage,
        className,
        ...elementProps 
    }: any & LabelProps) {
        return (
            <span className={classNames(className, 'error-message-container')}>
                <Element {...elementProps} />
                <span className={classNames('error-message', { 'is-visible': !isValid })}>
                    {errorMessage}
                </span>
            </span>
        )
    }

    withErrorMessageWrapper.displayName = `withErrorMessage(${Element.displayName || Element.name})`

    return withErrorMessageWrapper
}

function classNames(...classes: Array<string | object>) {
    if (classes.length === 0) {
        return undefined
    }

    const compiledClassName = classes.reduce((output: string, className) => {
        if (typeof className === 'object') {
            const usedClasses = Object.entries(className)
                .filter(([, isUsed]) => isUsed)
                .map(([usedClassName]) => usedClassName)
                .join(' ')

            return output.concat(` ${usedClasses}`)
        }

        // ignore null/undefined
        if (className == null) {
            return output
        }

        if (!(typeof className === 'string')) {
            throw new Error('Can only pass string or object items')
        }

        return output.concat(` ${className}`)
    }, '')

    return compiledClassName.trim()
}

export type LabelProps = ValidityState

export default withErrorMessage