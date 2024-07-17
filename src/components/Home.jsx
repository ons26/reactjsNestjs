import '../App.css'
import {useNavigate,Link} from "react-router-dom"
export default function Home (){ 
    const navToCateg=useNavigate()
    

    return (
        <>
      <div className='home'>
        <h1>Les Artisanats de Menzel Horr </h1>
        <Link to='/categories' className='ctg' >CATEGORIES</Link>
        </div>
        </>
    )
}