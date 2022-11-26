import Field from "../components/Field"
import FormComponent from "../components/Form"

export default {
    title: 'Form',
    component: FormComponent,
    args: {
        children: (
            <>
                <Field
                    name="name"
                    type="text"
                    label="What is your name?"
                    className="flex-1 flex flex-column padding-1"
                />

                <Field
                    name="number"
                    type="number"
                    label="Enter a number:"
                    className="flex-1 flex flex-column padding-1"
                />
            </>
            
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
    decorators: [
        Story => (
            <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
                <h1 style={{ textAlign: 'center' }}>Form Example</h1>
                <Story />
            </div>
        )
    ]
}

function Template(args) {
    return (
        <FormComponent {...args} />
    )
}

export const Form = Template.bind({})