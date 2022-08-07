import { selector, useRecoilValue } from 'recoil'

import { Items } from '../atoms'
import Form from '../model/Form'


function useForm() {
    const form = useRecoilValue(getForm)

    return form
}

export const getForm = selector({
    key: 'form',
    get: ({ get }) => {
        const items = get(Items)

        return new Form(items)
    },
})

export default useForm