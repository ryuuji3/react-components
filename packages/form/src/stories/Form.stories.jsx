import Field from "../components/Field"
import FormComponent from "../components/Form"

export default {
    title: 'Form',
    component: FormComponent,
    args: {
        children: (
            <Field
                name="name"
                type="text"
                value={null}
            />
        ),
    },
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
        onChange: {
            action: {
                type: 'change',
            }
        }
    },
}

function Template(args) {
    return (
        <FormComponent {...args} />
    )
}

export const Form = Template.bind({})