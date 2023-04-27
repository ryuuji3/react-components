import { ComponentMeta, ComponentStory } from '@storybook/react'

import Computed from "../components/Computed"
import Question from "../components/Question"
import FormComponent, { FormProps } from "../components/Form"

const meta: ComponentMeta<typeof FormComponent> = {
    title: 'Form',
    component: FormComponent,
    args: {
        children: (
            <>
                <Question
                    name="name"
                    component="text"
                    label="What is your name?"
                    className="flex-1 flex flex-column padding-1"
                    isRequired
                />

                <Question
                    name="number"
                    component="number"
                    label="Enter a number between 1-10:"
                    className="flex-1 flex flex-column padding-1"
                    min={1}
                    max={10}
                    isRequired
                />

                <Computed>
                    {({ number }: any) => (
                        <Question
                            name="number2"
                            component="number"
                            label="Enter a second number:"
                            className="flex-1 flex flex-column padding-1"
                            isRequired
                            isVisible={number != null}
                        />
                    )}
                </Computed>
                

                <Computed
                    name="sum"
                    label="Sum:"
                    className="flex-1 flex flex-column padding-1"
                    getValue={({ number, number2 }: any) => {
                        if (number == null || number2 == null) {
                            return null
                        }

                        return number + number2
                    }}
                />

                <Computed
                    children={(_: any, form: any ) => (
                        <button type="submit" disabled={!form.isValid}>
                            Submit
                        </button>
                    )}
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

export default meta
export type Story = ComponentStory<typeof FormComponent>

function Template(args: FormProps) {
    return (
        <FormComponent {...args} />
    )
}

export const Form: Story = Template.bind({})