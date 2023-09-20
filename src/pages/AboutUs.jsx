// import { PopupMenu } from "../cmps/PopupMenu"
import { utilService } from "../services/util.service"

function Text() {
    return (
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ipsam perspiciatis omnis eaque facilis assumenda dolores repellendus doloribus. Rem, repellendus doloribus at totam maxime minima aliquam ad repudiandae quam libero.</p>
    )
}

export function AboutUs() {

    function onClick() {

    }

    return (
        <section>
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>
            <img src={utilService.getAssetSrc('vite.svg')} alt="" />
            {/* <PopupMenu title={<h1>Welcome!</h1>}> */}
            {/* <Text /> */}
            <button onClick={onClick}>Back</button>
            {/* </PopupMenu> */}
        </section>
    )
}



