import React from 'react';

const SuggestionsColumn = ({title, keyName, suggestions, onChange}) => (
    <div className={`suggestions ${keyName}`}>
        <div className='suggestions-column-header'><p>{title}</p></div>
        <div className='suggestions-column-body'>
        <ul>{suggestions.map((suggestion, key) => 
            <li key={key}>
                <div onClick={(e) => {
                    e.preventDefault();
                    onChange(keyName, suggestion)
                }}>
                    <span> {suggestion.label} </span>
                </div>
            </li>
        )}</ul>
        </div>
    </div>
);
export default SuggestionsColumn;