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
    selections.forEach(x => {
        if(x.type === type){
            itemsArray.push(x.value)
        }
    });
    return itemsArray;
}   