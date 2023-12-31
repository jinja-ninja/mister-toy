
import { useDispatch, useSelector } from 'react-redux'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy } from '../store/actions/toy.actions.js'
import { SET_FILTER_BY } from '../store/reducers/toy.reducer.js'
import { useEffect } from 'react'

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const { filterBy, isLoading, sortBy } = useSelector(storeState => storeState.toyModule)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy, sortBy])


    function onRemoveToy(toyId) {
        // removeToy(toyId)
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        saveToy(toyToSave)
            .then(savedToy => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                console.log('Cannot add toy', err)
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?', toy.price)
        const toyToSave = { ...toy, price }
        saveToy(toyToSave)
            .then(savedToy => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                console.log('Cannot update toy', err)
                showErrorMsg('Cannot update toy')
            })
    }


    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <button onClick={onAddToy}>Add Toy</button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />

                {!isLoading && <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                    onEditToy={onEditToy}
                    txt={'54'}
                    nums={[1, 2, 3]}
                />
                }

                {isLoading && <div>Loading...</div>}
                <hr />
            </main>
        </div>
    )

}