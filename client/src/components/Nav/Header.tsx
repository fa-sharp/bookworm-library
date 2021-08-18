import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton, LogoutButton, Profile } from '../Auth'
import styles from './header.module.scss'

interface Props {
    
}

const Header = (props: Props) => {

    const { isAuthenticated, isLoading } = useAuth0();

    return (
        <nav className={styles.header}>
            {!isLoading && 
                !isAuthenticated ? <LoginButton /> : <LogoutButton />}
            <Profile />
        </nav>
    )
}

export default Header
