import React, { useState, Fragment } from "react";
import Suggestions from './suggestions';
import Tag from './tag';

function TagsInput ({queryTags, suggestions, onOperatorChange}) {
    const [selections, setSelections] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);

    const addTag = (type, value) => {
        setSelections([...selections, {type: type, value: value}]);
        queryTags([...selections, {type: type, value: value}]);
        setInputValue('');
    }
    const searchForInput = (value) => {
        let inputValue = value.currentTarget.value
        setInputValue(inputValue);
        const checkForOperator = selection => selection.type === 'operator';
        if (selections.some(checkForOperator)){
            console.log(inputValue)
        }
        if (selections.some(checkForOperator) === false){
            let parametersFiteredArray = suggestions.parameters.filter(parameter => parameter.includes(inputValue))
            setFilteredSuggestions({...suggestions, parameters: parametersFiteredArray});
        }
    }

    const handleInputFocus = () => {
        setFilteredSuggestions({...suggestions, parameters: suggestions.parameters});
        setShowSuggestions(true);
    }

    const handleControls = event => {
        const checkForOperator = selection => selection.type === 'operator';
        
        if (event.key === ',' && event.target.value !== ""){
            let value = inputValue.substring(0, inputValue.length -1);
            if(!selections.some(checkForOperator)){
                /* Check for parameter in suggestions */
                if(suggestions.parameters.some(item => item === value)){
                    /* Add value in selection array */
                    addTag('parameter', value);
                }
                /* Check for operator in suggestions */
                if(suggestions.operators.some(item => item === value)){
                    /* Add value in selection array */
                    addTag('operator', value);
                }
            }else{
                addTag('value', value);
            }
    
        }else if (event.key === 'Backspace' && event.target.value === ""){
            /* Remove last element in selection array */
            let lastItem = selections[selections.length - 1];
            setSelections(selections.filter(item => item.value !== lastItem.value))
        } if (event.key === "Enter" && event.target.value !== "") {
            /* Add query string */
        }else{
            setShowSuggestions(true);
        }
        
    };

    const addTagOfSuggestion = (value, type) => {
        addTag(type, value);
        setShowSuggestions(false);
        if(type === 'operator'){
            onOperatorChange(value);
        }
    }

    const removeTags = ({key, type}) => {
        setSelections([...selections.filter(tag => selections.indexOf(tag) !== key)]);
    } 

    return (<>
        <div className="tags-input">
            <ul id="tags">
                {selections.map((selection, key) => (<Fragment key={key}>
                    <Tag 
                        tag={selection.value} 
                        type={selection.type} 
                        keyInArray={key}
                        remove={removeTags}
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