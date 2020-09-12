import React, { useState, Fragment, useEffect } from "react";
import Suggestions from './suggestions';
import Tag from './tag';
import controlsManager from "./utils/controlsManager";

function TagsInput ({queryTags, queryArray, suggestions, onOperatorChange, removeQueryTag}) {
    const [selections, setSelections] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);

    useEffect(() => {
        setFilteredSuggestions(suggestions)
    }, [suggestions])

    const addTag = (type, value) => {
        setSelections([...selections, {type: type, value: value}]);
        
        if(type === 'operator'){
            onOperatorChange(value, selections);
        }
        setInputValue('');
    }
    
    const removeTag = ({key, type}) => {
        setSelections([...selections.filter(tag => selections.indexOf(tag) !== key)]);
    } 

    const pushQuery = () =>  {
        queryTags(selections);
        setSelections([]);
        setShowSuggestions(false);
    };

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

    const handleControls = event => {
        controlsManager(
            event, inputValue, 
            selections, suggestions, 
            addTag, removeTag, setShowSuggestions, pushQuery)
    };

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
                onFocus={() => setShowSuggestions(true)}
                onKeyUp={handleControls}
                onChange={searchForInput}
                placeholder="Press enter to add tags"
            />  
        </div>
        {showSuggestions && 
            <Suggestions 
                selections={selections}
                suggestions={filteredSuggestions} 
                onChange={addTag}
            />
        }
        {queryArray && queryArray.length > 0 &&
        <div className="tags-global">
        <ul id="tags">
            {queryArray.map((tag, key) => <Fragment key={key}>
                <Tag 
                    tag={tag} 
                    type={'global'} 
                    keyInArray={key}
                    remove={removeQueryTag}
                />
            </Fragment>)}
        </ul>
        </div>
        }
    </>);
};
export default TagsInput;