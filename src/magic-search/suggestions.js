import React from 'react';
import SuggestionsColumn from './suggestionsColumn';
import {
    filterSuggestion,
    filterParamSuggestion,
    filterOperatorSuggestion,
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
            <SuggestionsColumn 
                title='Parametros' 
                keyName='parameter' 
                suggestions={
                    filterParamSuggestion(
                        suggestions.parameters, 
                        getSelections(selections, 'parameter')
                    )
                } 
                onChange={(a,b) => onChange(a,b)}
            />}
            {selections.some(checkForParams) && selections.some(checkForOperator) === false &&
                <SuggestionsColumn 
                    title='Operadores' 
                    keyName='operator' 
                    suggestions={
                        filterOperatorSuggestion(
                            suggestions.rules,
                            suggestions.operators, 
                            getSelections(selections, 'parameter'),
                            getSelections(selections, 'operator')
                    )} 
                    onChange={(a,b) => onChange(a,b)}
            />}
            {selections.some(checkForOperator) && suggestions.values.length > 0 &&
                <SuggestionsColumn 
                    title='Valores' 
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