import { useAuth0 } from "@auth0/auth0-react"

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    if (!user || !isAuthenticated)
        return null;
    
    const { nickname, name, picture } = user;

    return (
        <div>
            <img src={picture} alt={`${nickname || name} logged in!`} 
                title={`${nickname || name} logged in!`} />
        </div>
    )
}

export default Profile
