
import { useDispatch } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { checkout } from '../store/actions/user.actions.js'
import { REMOVE_TOY_FROM_CART } from '../store/reducers/toy.reducer.js'

export function ShoppingCart({ isCartShown, shoppingCart }) {
    const dispatch = useDispatch()

    const user = userService.getLoggedinUser()

    function removeFromCart(toyId) {
        dispatch({ type: REMOVE_TOY_FROM_CART, toyId })
    }

    function getCartTotal() {
        return shoppingCart.reduce((acc, toy) => acc + toy.price, 0)
    }

    function onCheckout() {
        const amount = getCartTotal()
        checkout(-amount)
            .then(() => {
                showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot checkout')
            })
    }

    if (!isCartShown) return <span></span>
    const total = getCartTotal()
    return (
        <section className="cart" >
            <h5>Your Cart</h5>
            <ul>
                {
                    shoppingCart.map((toy, idx) => <li key={idx}>
                        <button onClick={() => {
                            removeFromCart(toy._id)
                        }}>x</button>
                        {toy.vendor} | ${toy.price}
                    </li>)
                }
            </ul>
            <p>Total: ${total} </p>
            <button disabled={!user || !total} onClick={onCheckout}>Checkout</button>
        </section>
    )
}
