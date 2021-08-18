import { useAuth0 } from "@auth0/auth0-react"

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    if (!user || !isAuthenticated)
        return null;
    
    const { name, picture } = user;

    return (
        <div>
            <img src={picture} alt={name} title={`${name} logged in!`} />
        </div>
    )
}

export default Profile
