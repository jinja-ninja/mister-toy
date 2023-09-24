

import { UserMsg } from './UserMsg.jsx'
import { useDispatch, useSelector } from 'react-redux'

export function AppFooter() {

    const toysCount = useSelector(storeState => storeState.toyModule.toys.length)

    return (
        <footer>
            <h5>
                Currently {toysCount} toys in the shop
            </h5>
            <p>
                Coffeerights to all
            </p>

            <UserMsg />
        </footer>
    )
}
