import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Couffin() {
  const [couffins, setCouffins] = useState([]);

  useEffect(() => {
    const getCouffins = async () => {
      try {
        const response = await axios.get('http://localhost:4000/Couffin');
        console.log(response.data.coffinList);
        setCouffins(response.data.coffinList); // Mettre à jour l'état avec les données récupérées
      } catch (error) {
        console.error("Erreur lors de la récupération des couffins :", error);
      }
    }
    getCouffins();
  }, []); // Le tableau vide [] signifie que cet effet s'exécutera une seule fois au montage

  return (
    <div>
      <nav>
        <Link to="/categories">Accueil</Link> 
      </nav>
      <h1>Liste des Couffins</h1>
      <ul className="couffin-list">
        {couffins.length > 0 ? (
          couffins.map((couffin, index) => (
            <li key={index} className="couffin-item">
              <div className="couffin-item-content">
                <img src={process.env.PUBLIC_URL + '/image1.png'} alt="Image 1" className="couffin-image" />
                <div className="couffin-details">
                  <strong>Description:</strong> {couffin.desc}<br />
                  <strong>Prix:</strong> {couffin.price}<br />
                  <strong>Propriétaire:</strong> {couffin.owner}<br />
                  <strong>Numéro:</strong> {couffin.num}
                </div>
              </div>
            </li>
          ))
        ) : (
          <li>Aucun couffin trouvé.</li>
        )}
      </ul>
    </div>
  );
}
