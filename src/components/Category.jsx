import { Link } from "react-router-dom";
import  '../App.css';

export default function Category() {
  return (
    <div className="category-container">
      <h1>Les Artisanats de Menzel Horr</h1>
      <div className="category-links">
        <Link className="category-link" to='/couffin'>Les Couffins</Link>
        <Link className="category-link" to='/poetrie'>Les Poteries</Link>
      </div>
    </div>
  );
}
