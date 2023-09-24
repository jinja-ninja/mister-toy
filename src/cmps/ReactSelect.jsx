import React, { useState } from 'react'

import Select from 'react-select'

export function ReactSelect({ data = [], name, handleSelection }) {

    return (
        <>
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={data[0]}
                name={name}
                options={data}
                onChange={(selection) => handleSelection(selection, name)}
            />

            <div
                style={{
                    color: 'hsl(0, 0%, 40%)',
                    display: 'inline-block',
                    fontSize: 12,
                    fontStyle: 'italic',
                    marginTop: '1em',
                }}
            >
            </div>
        </>
    )
} 
