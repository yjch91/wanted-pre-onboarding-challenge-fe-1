import React from 'react';
import { ITitleInputProps } from '../../../types/todo';

function TitleInput({register, errors, watch}: ITitleInputProps) {
    return (
        <>
            <input {...register("title",  {
                required: "제목이 비어있습니다."
            })} className="inputTitle" type="text" placeholder="title" maxLength={40} />
            <p className="textleft m-4 red">{errors.title?.message}</p>
            <p className="textright m-4">{watch("title").length}/40</p>
        </>
    );
}

export default TitleInput;
