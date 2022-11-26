import NumberInputComponent from "../components/NumberInput";

export default {
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
        }
    }
}

function Template(args) {
    return (
        <NumberInputComponent {...args} />
    )
}

export const InputOnly = Template.bind({})

export const WithLabel = Template.bind({})
WithLabel.args = {
    label: 'Enter a number:',
}