import PropTypes from 'prop-types'

import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy }) {

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                        <button onClick={() => onEditToy(toy)}>Edit</button>
                    </div>
                </li>
            )}
        </ul>
    )
}
