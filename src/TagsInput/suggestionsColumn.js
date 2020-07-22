import React from 'react';

const SuggestionColumn = ({title, keyName, suggestions, onChange}) => (
    <div className={`suggestions ${keyName}`}>
        <p>{title}</p>
        <ul>{suggestions.map((suggestion, key) => 
            <li key={key}>
                <div onClick={() => onChange(suggestion, keyName)}>
                    <span> {suggestion.label} </span>
                </div>
            </li>
        )}</ul>
    </div>
);
export default SuggestionColumn;