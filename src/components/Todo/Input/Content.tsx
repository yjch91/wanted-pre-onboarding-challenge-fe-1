import React from 'react';
import { IContentInput } from './type';

function ContentInput({register, getValues}: IContentInput) {
    return (
        <>
            <textarea {...register("content")} className="inputContent" placeholder="content" maxLength={1000} />
            <p className="textright m-4">{getValues("content").length}/1000</p>
        </>
    );
}

export default ContentInput;
