import {useNavigate,Link} from "react-router-dom"


export default function New ()
{
    // const nav=useNavigate()
    
    // const handleClick=()=>{
    //     nav('/p1')
    // }
    return(
        <>
        <h1>hey</h1>
        {/* <button onClick={handleClick}>navigate to page1/2</button> */}
        <Link to='/p1'>go to p1</Link>
        </>
    );
}