import React, { useState } from 'react';
import TagsInput from './TagsInput';
const suggestionsMock = {
  parameters: [
    'name', 'last name', 'age', 'email', 'boss email', 'department', 'manager', 'status', 'country', 'region'
  ],
  operators: [
    '=', '==', '!=', 'rango de edades'
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
    setSuggestion({...suggestions, values: ['1']})
  }
  return (
    <div>
      <h1>Magic Search</h1>
      <TagsInput 
        suggestions={suggestions}
        queryTags={selectedTags}
        onOperatorChange={onOperatorChange}  />
    </div>
  );
}

export default App;
