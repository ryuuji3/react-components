import React from 'react'
import { RecoilRoot, RecoilRootProps } from 'recoil'

function withRecoil<T>(Component: React.ComponentType<T>) {
    return (props: any & Partial<RecoilRootProps>) => (
        <RecoilRoot {...props}>
            <Component {...props} />
        </RecoilRoot>
    )
}

export default withRecoil