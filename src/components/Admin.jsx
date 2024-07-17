import { useLocation } from 'react-router-dom';
export default function Admin()
{  const location = useLocation();
    const { username } = location.state || {};
    return (
        <h1>welcome Admin {username} </h1>

    )
}