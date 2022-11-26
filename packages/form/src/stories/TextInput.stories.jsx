import TextInputComponent from "../components/TextInput";

export default {
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

function Template(args) {
    return (
        <TextInputComponent {...args} />
    )
}

export const TextInput = Template.bind({})