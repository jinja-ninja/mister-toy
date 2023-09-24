import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'


import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'

import { LoginSignup } from './LoginSignup.jsx'

export function AppHeader() {

    const dispatch = useDispatch()
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
            <h1 className='logo'>Mister Toy</h1>
            <nav className='navbar'>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink> |

            </nav>
            {user && <section className="user-info">
                <p>
                    {user.fullname} <span>${user.score.toLocaleString()}</span>
                </p>
                <button className='btn btn-logout' onClick={onLogout}>Logout</button>
            </section>}
            {!user && <section className="user-info">
                <LoginSignup />
            </section>}
        </header>
    )
}

