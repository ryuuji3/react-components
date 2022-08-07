import React from 'react'
import { RecoilRoot } from 'recoil'

function withRecoil(Component: React.ComponentType<WithChildren>, recoilProps = {}) {
    return (props: any) => (
        <RecoilRoot {...recoilProps}>
            <Component {...props} />
        </RecoilRoot>
    )
}

interface WithChildren {
    children: React.ReactNode
}

export default withRecoil