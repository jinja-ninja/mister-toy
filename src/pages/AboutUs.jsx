import { useNavigate } from "react-router-dom"

export function AboutUs() {

    const navigate = useNavigate()

    function onClick() {
        navigate('/')
    }

    return (
        <section>
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>
            <button onClick={onClick}>Back</button>
        </section>
    )
}



