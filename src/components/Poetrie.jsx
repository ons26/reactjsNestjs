import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function Pottery() {
  const [potteries, setPotteries] = useState([]);

  useEffect(() => {
    const getPotteries = async () => {
      try {
        const response = await axios.get('http://localhost:4000/poetrie');
        console.log(response.data.potteryList);
        setPotteries(response.data.potteryList); // Mettre à jour l'état avec les données récupérées
      } catch (error) {
        console.error("Erreur lors de la récupération des poetries :", error);
      }
    }
    getPotteries();
  }, []); // Le tableau vide [] signifie que cet effet s'exécutera une seule fois au montage

  return (
    <div>
        <nav>
        <Link to="/categories">Accueil</Link> 
      </nav>
      <h1>Liste des potteries</h1>
      <ul className="couffin-list">
        {potteries.length > 0 ? (
          potteries.map((pottery, index) => (
            <li key={index}>
              <strong>Description:</strong> {pottery.desc}<br />
              <strong>Prix:</strong> {pottery.price}<br />
              <strong>Propriétaire:</strong> {pottery.owner}<br />
              <strong>Numéro:</strong> {pottery.num}
            </li>
          ))
        ) : (
          <li>Aucun pottery trouvé.</li>
        )}
      </ul>
    </div>
  );
}
