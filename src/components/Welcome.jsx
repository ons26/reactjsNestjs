import { useLocation } from 'react-router-dom';
export default function Hello()
{  const location = useLocation();
    const { username } = location.state || {};
    return (
        <h1>welcome {username} </h1>

    )
}