import React from 'react';
import { IContentInputProps } from '../../../types/todo';

function ContentInput({register}: IContentInputProps) {
    return (
        <input {...register("content")} className="todo" type="text" placeholder="content" />
    );
}

export default ContentInput;
