import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return (
        <article>
            <h4>{toy.name}</h4>
            <h1>🧸</h1>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {toy.owner && <p>Owner: <span>{toy.owner.fullname}</span></p>}
            <p>Labels: {toy.labels.join(', ')}</p>
            {toy.inStock ? <p>IN STOCK</p> : <p>Out of Stock</p>}
            <Link to={`/toy/${toy._id}`}>Details</Link>
        </article>
    )
}