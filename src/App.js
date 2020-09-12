import React, { useState } from 'react';
import TagsInput from './magic-search';
const suggestionsMock = {
  parameters: [
    {label: 'Name', type: 'string', value:'name'}, 
    {label: 'Second name', type: 'string', value:'second_name'}, 
    {label: 'Last name', type: 'string', value:'last_name'}, 
    {label: 'Department', type: 'option', value:'department'}, 
    {label: 'Manager', type: 'option', value:'manager'}, 
    {label: 'Status', type: 'boolean', value:'status'}, 
    {label: 'Country', type: 'option', value:'country'}, 
    {label: 'Region', type: 'option', value:'region'}, 
  ],
  operators: [
    {label: 'Contains', value:'contains'}, 
    {label: 'Equals',  value:'exact'}, 
    {label: 'Not in',  value:'not_equal'}, 
    {label: 'Range',  value:'range'}, 
    {label: 'True',  value:'true'}, 
    {label: 'False',  value:'false'}, 
  ],
  rules: [
    {type: 'string', operators: ['contains', 'exact']},
    {type: 'boolean', operator: ['true', 'false']},
    {type: 'option', operator: ['equals']}
  ],
  values: []
}
function App() {
  const [suggestions, setSuggestion] = useState(suggestionsMock)
  const [queryArray, setQueryArray] = useState([]);
  const selectedTags = tags => {
		setQueryArray(tags);
  };
  const onOperatorChange = value => {
    console.log(queryArray);
    setSuggestion({...suggestions, values: [{label:'One', type:'string', value: '1'}]})
  }
  return (
    <div>
      <h1>Magic Search</h1>
      <TagsInput 
        queryTags={}
        queryArray={}
        removeQueryTag={}
        suggestions={suggestions}
        queryTags={selectedTags}
        onOperatorChange={onOperatorChange}  />
    </div>
  );
}

export default App;
