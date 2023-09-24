
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { setToySortBy } from "../store/actions/toy.actions.js"
import { ReactMultiSelect } from "./ReactMultiSelect.jsx"
import { ReactSelect } from "./ReactSelect.jsx"


export function ToyFilter({ filterBy, onSetFilter }) {

    const toyLabels = toyService.getToyLabels()
    const inStockSelections = [
        { value: '', label: 'All' },
        { value: 'available', label: 'In Stock' },
        { value: 'unavailable', label: 'Out of Stock' }
    ]
    const sortSelections = [
        { value: 'nameAsc', label: 'Name (A-Z)' },
        { value: 'nameDesc', label: 'Name (Z-A)' },
        { value: 'priceAsc', label: 'Price (Low to High)' },
        { value: 'priceDesc', label: 'Price (High to Low)' },
    ]

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const dispatch = useDispatch()

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? (+value || '') : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleSelection(selection, field) {
        let value
        if (selection.length) value = Array.from(selection, (option) => option.value)
        else value = selection.value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleSortChange(selection) {
        dispatch(setToySortBy(selection.value))
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice}
                    onChange={handleChange}
                />
            </form>

            <ReactSelect data={sortSelections} name="sortBy" handleSelection={handleSortChange} />
            <ReactSelect data={inStockSelections} name="inStock" handleSelection={handleSelection} />
            <ReactMultiSelect data={toyLabels} name="labels" handleSelection={handleSelection} />

        </section>
    )
}