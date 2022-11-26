import React from 'react'
import { RecoilRoot, RecoilRootProps } from 'recoil'

function withRecoil<T>(Component: React.ComponentType<T>) {
    function Wrapped(props: any & Partial<RecoilRootProps>) {
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