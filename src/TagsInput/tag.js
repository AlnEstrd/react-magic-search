import React from 'react';
import {AiOutlineCloseCircle} from 'react-icons/ai';

const Tag = ({tag, type, keyInArray, remove}) => {
    return(
    <li className={`tag ${type}`} key={keyInArray}>
        <span className='tag-title'>{tag}</span>
        <i className="tag-close-icon" 
            onClick={() => remove({key: keyInArray, type: type})}>
                <AiOutlineCloseCircle />
        </i>
    </li>)
}
export default Tag;