import classNames from "classnames"

import './ErrorMessageContainer.css'

function ErrorMessageContainer({ 
    isValid,
    errorMessage,
    className,
    children,
}: ErrorMessageContainerProps) {
    return (
        <span className={classNames(className, 'error-message-container')}>
            {children}
            <span className={classNames('error-message', { 'is-visible': !isValid })}>
                {errorMessage}
            </span>
        </span>
    )
}

export interface ErrorMessageContainerProps {
    isValid?: boolean,
    errorMessage?: string,

    children?: React.ReactNode, 
    className?: string 
}

export default ErrorMessageContainer