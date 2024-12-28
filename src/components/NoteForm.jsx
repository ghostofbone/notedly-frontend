import styled from "styled-components";
import React, {useState} from 'react';
import Button from "./Button";

const Wrapper = styled.div`
    height: 100%;
`

const Form = styled.form`
    height: 100%;
`

const TextArea = styled.textarea`
    width: 100%;
    height: 90%;
`


const NoteForm = (props) => {
    const [value, setValue] = useState({content: props.content || ''})

    const onChange = e => {
        setValue({...value, [e.target.name]: e.target.value})
    }

    return (
        <Wrapper>
            <Form
                onSubmit={e => {
                    console.log(value);
                    e.preventDefault();
                    props.action({
                        variables: {
                            ...value
                        }
                    });
                }}
            >
                <TextArea required type={'text'} name="content" placeholder={'Note Content'} value={value.content} onChange={onChange} />
                <Button type={"submit"}>Save</Button>
            </Form>
        </Wrapper>
    );
};

export default NoteForm;
