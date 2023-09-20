import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'


import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { logout } from '../store/actions/user.actions.js'

import { SET_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { SET_USER } from '../store/reducers/user.reducer.js'
import { LoginSignup } from './LoginSignup.jsx'

export function AppHeader() {

    const dispatch = useDispatch()
    const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logout successfully')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot logout')
            })
    }

    return (
        <header className="app-header">
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink> |
                <a href="#" onClick={(ev) => {
                    ev.preventDefault()
                    dispatch({ type: SET_CART_IS_SHOWN, isCartShown: !isCartShown })
                }}>
                    🛒 Cart
                </a>
            </nav>
            <h1>My App</h1>
            {user && <section className="user-info">
                <p>
                    {user.fullname} <span>${user.score.toLocaleString()}</span>
                </p>
                <button onClick={onLogout}>Logout</button>
            </section>}
            {!user && <section className="user-info">
                <LoginSignup />
            </section>}
        </header>
    )
}

