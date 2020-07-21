import React from 'react';
import SuggestionColumn from './suggestionsColumn';
import {
    filterSuggestion,
    getTypeItemsToStringArray as getSelections
} from './utils';

function Suggestions({selections, suggestions, onChange}){
    const checkForParams = selection => selection.type === 'parameter';
    const checkForOperator = selection => selection.type === 'operator';

    /* If All empty show only params */    
    /* If params empty show only params */

    /* If parameter not empty but operator and value empty, show param and value only */

    /* If theres and operator show only vlaues */
    /* If non is empty show only values */

    return(<>
    
        <div className="suggestions-wrapper" >
            {(selections.length === 0 || selections.some(checkForOperator) === false) && suggestions.parameters.length > 0 &&
            <SuggestionColumn 
                title='Parameters' 
                keyName='parameter' 
                suggestions={
                    filterSuggestion(
                        suggestions.parameters, 
                        getSelections(selections, 'parameter')
                    )
                } 
                onChange={(a,b) => onChange(a,b)}
            />}
            {selections.some(checkForParams) && selections.some(checkForOperator) === false &&
                <SuggestionColumn 
                    title='Operators' 
                    keyName='operator' 
                    suggestions={filterSuggestion(
                        suggestions.operators, 
                        getSelections(selections, 'operator')
                    )} 
                    onChange={(a,b) => onChange(a,b)}
            />}
            {selections.some(checkForOperator) &&
                <SuggestionColumn 
                    title='Values' 
                    keyName='value' 
                    suggestions={
                        filterSuggestion(
                            suggestions.values, 
                            getSelections(selections, 'value')
                        )
                    } 
                    onChange={(a,b) => onChange(a,b)}
            />}
        </div>
    </>)
}
export default Suggestions;