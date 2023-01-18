import { watch } from 'fs';
import React from 'react';
import { IContentInputProps } from '../../../types/todo';

function ContentInput({register, watch}: IContentInputProps) {
    return (
        <>
            <textarea {...register("content")} className="inputContent" placeholder="content" maxLength={1000} />
            <p className="textright m-4">{watch("content").length}/1000</p>
        </>
    );
}

export default ContentInput;
