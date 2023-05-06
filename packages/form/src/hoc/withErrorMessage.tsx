import { useEffect, useState } from "react"
import ErrorMessageContainer, { ErrorMessageContainerProps } from "../components/ErrorMessageContainer"

function withErrorMessage<T extends object>(Element: React.ComponentType<T>) {
    function Wrapper({ 
        isValid,
        errorMessage,
        className,
        
        onBlur,

        shouldShowInvalid: shouldShowInvalidProp,

        ...elementProps 
    }: ErrorMessageContainerProps & any) {
        const [ shouldShowInvalid, setShouldShowInvalid ] = useState(shouldShowInvalidProp)

        useEffect(
            () => {
                setShouldShowInvalid(shouldShowInvalidProp)
            },
            [ shouldShowInvalidProp ]
        )

        function handleBlur(e: React.FocusEvent<any>) {
            onBlur?.(e)
            setShouldShowInvalid(true)
        }

        return (
            <ErrorMessageContainer
                {...(shouldShowInvalid && {
                    isValid,
                    errorMessage,
                })}
                className={className}
            >
                <Element {...elementProps as T} onBlur={handleBlur} />
            </ErrorMessageContainer>
        )
    }

    Wrapper.displayName = `withErrorMessage(${Element.displayName || Element.name})`

    return Wrapper
}

export default withErrorMessage