import FormComponent from "../components/Form"
import TextInput from "../components/TextInput"

export default {
    title: 'Form',
    component: FormComponent,
    args: {
        children: (
            <TextInput
                name="name"
                value={null}
            />
        ),
    }
}

function Template(args) {
    return (
        <FormComponent {...args} />
    )
}

export const Form = Template.bind({})