export const filterSuggestion = (suggestions, selected) => {
    let suggestionsArray  = suggestions.length > 0 ? suggestions : [];
    if(selected.length > 0 ){
        suggestionsArray = suggestions.filter(function(e) {
            return this.indexOf(e) < 0;
          },
          selected)
    }
    return suggestionsArray;
}

export const filterParamSuggestion = (suggestions, selected) => {
    let parameterSuggestion = [];
    if(selected.length > 0){
        parameterSuggestion = suggestions
            .filter(suggestion => suggestion.type === selected[0].type)
    }else{
        parameterSuggestion = suggestions
    }
    return filterSuggestion(parameterSuggestion, selected) 
}
export const filterOperatorSuggestion = (rules, suggestions, selectedParameters, selectedOperators) => {
    let parameterType = selectedParameters.length > 0 && selectedParameters[0].type;
    let ruleForParameter = rules.filter(rule => rule.type === parameterType);
    let operatorsSuggestions = suggestions.filter(function(e){
        return this.indexOf(e.value) >= 0;
    }, ruleForParameter[0].operators);
    return filterSuggestion(operatorsSuggestions, selectedOperators) 
}
export const getTypeItemsToStringArray = (selections, type) => {
    let itemsArray = [];
    selections.forEach(selection => {
        if(selection.type === type){
            itemsArray.push(selection.value)
        }
    });
    return itemsArray;
}   