import React from 'react';

import Select from 'react-select';
// import { colourOptions } from '../data';

export function ReactMultiSelect({ data = [], name, handleSelection }) {
    const refactoredData = data.map(element => ({ value: element, label: element }))

    return <Select
        // defaultValue={''}
        isMulti
        name={name}
        options={refactoredData}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(selection) => handleSelection(selection, name)}
    />
}