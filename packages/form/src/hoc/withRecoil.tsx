import React from 'react'
import { RecoilRoot, RecoilRootProps } from 'recoil'

function withRecoil<T extends object>(Component: React.ComponentType<T>) {
    function Wrapped(props: Partial<RecoilRootProps> & any) {
        return (
            <RecoilRoot {...props}>
                <Component {...props} />
            </RecoilRoot>
        )
    }

    Wrapped.displayName = Component.displayName || Component.name

    return Wrapped
}

export default withRecoil