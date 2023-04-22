import Computed from "../components/Computed"
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
                    isRequired
                />

                <Field
                    name="number"
                    type="number"
                    label="Enter a number between 1-10:"
                    className="flex-1 flex flex-column padding-1"
                    min={1}
                    max={10}
                    isRequired
                />

                <Field
                    name="number2"
                    type="number"
                    label="Enter a second number:"
                    className="flex-1 flex flex-column padding-1"
                    isRequired
                />

                <Computed
                    name="sum"
                    label="Sum:"
                    className="flex-1 flex flex-column padding-1"
                    getValue={({ number, number2 }) => number + number2}
                />

                <Computed>
                    {(_values, form) => (
                        <button type="submit" disabled={!form.isValid}>
                            Submit
                        </button>
                    )}
                </Computed>
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