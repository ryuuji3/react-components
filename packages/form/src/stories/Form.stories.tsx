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
                    type="text"
                    label="What is your name?"
                    className="flex-1 flex flex-column padding-1"
                    isRequired
                />

                <Question
                    name="integer"
                    type="integer"
                    label="Enter an integer between 1-10:"
                    className="flex-1 flex flex-column padding-1"
                    min={1}
                    max={10}
                    isRequired
                />

                <Computed>
                    {({ integer }: any) => (
                        <Question
                            name="float"
                            type="float"
                            label="Enter a float:"
                            className="flex-1 flex flex-column padding-1"
                            isRequired
                            isVisible={integer != null}
                        />
                    )}
                </Computed>
                

                <Computed
                    name="sum"
                    label="Sum:"
                    className="flex-1 flex flex-column padding-1"
                    getValue={({ integer, float }: any) => {
                        if (integer == null || float == null) {
                            return null
                        }

                        return integer + float
                    }}
                />

                <button type="submit">Submit</button>
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
        },
        onSubmit: {
            action: {
                type: 'submit',
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