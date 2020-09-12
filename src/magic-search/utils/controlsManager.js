function controlsManager(event, inputValue, selections, suggestions, addTag, removeTag, setShowSuggestions, pushQuery){
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
        }else if (event.key === "Enter" && event.target.value === "") {
            /* Add query string */
            if(selections.some(checkForOperator)){
                pushQuery();
            }
        }else if(event.key === 'Escape'){
            setShowSuggestions(false);
        }else{
            setShowSuggestions(true);
        }
}
export default controlsManager;