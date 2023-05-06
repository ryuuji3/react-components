import { useState } from "react"
import ErrorMessageContainer, { ErrorMessageContainerProps } from "../components/ErrorMessageContainer"

function withErrorMessage<T extends object>(Element: React.ComponentType<T>) {
    function Wrapper({ 
        isValid,
        errorMessage,
        className,
        
        onBlur,

        ...elementProps 
    }: ErrorMessageContainerProps & any) {
        const [ hasBlurred, setHasBlurred ] = useState(false)

        function handleBlur(e: React.FocusEvent<any>) {
            onBlur?.(e)
            setHasBlurred(true)
        }

        return (
            <ErrorMessageContainer
                {...(hasBlurred && {
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