import ErrorMessageContainer, { ErrorMessageContainerProps } from "../components/ErrorMessageContainer"

function withErrorMessage<T extends object>(Element: React.ComponentType<T>) {
    function withErrorMessageWrapper({ 
        isValid,
        errorMessage,
        className,
        ...elementProps 
    }: ErrorMessageContainerProps & any) {
        return (
            <ErrorMessageContainer isValid={isValid} errorMessage={errorMessage} className={className}>
                <Element {...elementProps as T} />
            </ErrorMessageContainer>
        )
    }

    withErrorMessageWrapper.displayName = `withErrorMessage(${Element.displayName || Element.name})`

    return withErrorMessageWrapper
}

export default withErrorMessage