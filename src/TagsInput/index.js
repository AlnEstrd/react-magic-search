import React, { useState, Fragment } from "react";
import Suggestions from './suggestions';
import Tag from './tag';
import controlsManager from "./utils/controlsManager";

function TagsInput ({queryTags, suggestions, onOperatorChange}) {
    const [selections, setSelections] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);

    const addTag = (type, value) => {
        setSelections([...selections, {type: type, value: value}]);
        setInputValue('');
    }
    
    const removeTag = ({key, type}) => {
        setSelections([...selections.filter(tag => selections.indexOf(tag) !== key)]);
    } 

    const searchForInput = (value) => {
        let inputValue = value.currentTarget.value
        setInputValue(inputValue);
        const checkForOperator = selection => selection.type === 'operator';
        if (selections.some(checkForOperator)){
            console.log(inputValue)
        }
        if (selections.some(checkForOperator) === false){
            const filterByString = parameter  => parameter.label.toLowerCase().includes(inputValue.toLowerCase())
            let parametersFiteredArray = suggestions.parameters.filter(filterByString)
            setFilteredSuggestions({...suggestions, parameters: parametersFiteredArray});
        }
    }

    const handleInputFocus = () => {
        setFilteredSuggestions({...suggestions, parameters: suggestions.parameters});
        setShowSuggestions(true);
    }

    const handleControls = event => {
        controlsManager(
            event, inputValue, 
            selections, suggestions, 
            addTag, removeTag, setShowSuggestions)
    };

    const addTagOfSuggestion = (value, type) => {
        addTag(type, value);
        setShowSuggestions(false);
        if(type === 'operator'){
            onOperatorChange(value);
        }
    }

    return (<>
        <div className="tags-input">
            <ul id="tags">
                {selections.map((selection, key) => (<Fragment key={key}>
                    <Tag 
                        tag={selection.value.label} 
                        type={selection.type} 
                        keyInArray={key}
                        remove={removeTag}
                    />
                </Fragment>))}
            </ul>
            <input
                className='query-input'
                type="text"
                value={inputValue}
                onFocus={handleInputFocus}
                onKeyUp={handleControls}
                onChange={searchForInput}
                placeholder="Press enter to add tags"
            />  
        </div>
        {showSuggestions && 
            <Suggestions 
                selections={selections}
                suggestions={filteredSuggestions} 
                onChange={addTagOfSuggestion}
            />
        }
    </>);
};
export default TagsInput;