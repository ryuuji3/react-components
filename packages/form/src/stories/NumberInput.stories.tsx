import { ComponentMeta, ComponentStory } from '@storybook/react'

import NumberInputComponent, { NumberInputProps } from "../components/NumberInput";

const meta: ComponentMeta<typeof NumberInputComponent> = {
    title: 'Inputs/NumberInput',
    component: NumberInputComponent,
    args: {
        name: 'example',
    },
    argTypes: {
        onChange: {
            action: {
                type: 'change',
            }
        },
        onValidityChange: {
            action: {
                type: 'validityChange'
            }
        },
        min: {
            control: 'number'
        },
        max: {
            control: 'number'
        }
    }
}

export default meta
export type Story = ComponentStory<typeof NumberInputComponent>

function Template(args: NumberInputProps) {
    return (
        <NumberInputComponent {...args} />
    )
}

export const InputOnly: Story = Template.bind({})

export const WithLabel: Story = Template.bind({})
WithLabel.args = {
    label: 'Enter a number:',
}