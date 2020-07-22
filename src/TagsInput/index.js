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
        const checkForOperator = selection => selection.type === 'operator';
        
        if (event.key === ',' && event.target.value !== ""){
            let dirtyValue = inputValue.substring(0, inputValue.length -1);
            let value = inputValue.substring(0, inputValue.length -1).toLowerCase();
            if(!selections.some(checkForOperator)){
                /* Check for parameter in suggestions */
                const findValue = item => item.label.toLowerCase() === value;
                let tag = {};
                let type = undefined;
                if(suggestions.parameters.some(findValue)){
                    type = 'parameter';
                    tag = suggestions.parameters.find(findValue);
                    /* Add value in selection array */
                }
                /* Check for operator in suggestions */
                else if(suggestions.operators.some(findValue)){
                    /* Add value in selection array */
                    type = 'operator';
                    tag = suggestions.operators.find(findValue);
                }
                if (type !== undefined) addTag(type, tag);
            }else{
                addTag('value', {label: dirtyValue, type: 'string', value:dirtyValue});
            }
    
        }else if (event.key === 'Backspace' && event.target.value === ""){
            /* Remove last element in selection array */
            let lastItem = selections.length - 1;
            removeTag({key: lastItem, type: 'operator'});
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