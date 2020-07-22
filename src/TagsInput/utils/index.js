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
export const getTypeItemsToStringArray = (selections, type) => {
    let itemsArray = [];
    selections.forEach(selection => {
        if(selection.type === type){
            itemsArray.push(selection.value)
        }
    });
    return itemsArray;
}   