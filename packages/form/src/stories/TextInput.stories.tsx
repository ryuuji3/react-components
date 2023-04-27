import { ComponentMeta, ComponentStory } from '@storybook/react'

import TextInputComponent, { TextInputProps } from "../components/TextInput";

const meta: ComponentMeta<typeof TextInputComponent> = {
    title: 'Inputs/TextInput',
    component: TextInputComponent,
    args: {
        name: 'example',
    },
    argTypes: {
        onChange: {
            action: {
                type: 'change',
            }
        }
    }
}

export default meta
export type Story = ComponentStory<typeof TextInputComponent>

function Template(args: TextInputProps) {
    return (
        <TextInputComponent {...args} />
    )
}

export const TextInput = Template.bind({})