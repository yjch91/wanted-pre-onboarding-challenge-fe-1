import React from 'react';
import { ITitleInputProps } from '../../../types/todo';

function TitleInput({register, errors}: ITitleInputProps) {
    return (
        <>
            <input {...register("title",  {
                required: "제목이 비어있습니다."
            })} className="todo" type="text" placeholder="title" />
            <p>{errors.title?.message}</p>
        </>
    );
}

export default TitleInput;
