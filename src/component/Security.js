import React, { useState, useEffect } from "react";
import axios from "axios";

const Security = () => {
  const [incidents, setIncidents] = useState([]);
  const [incidentId, setIncidentId] = useState("");
  const [description, setDescription] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/security", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIncidents(response.data);
      } catch (error) {
        console.error("Error al obtener incidentes");
      }
    };

    if (token) {
      fetchIncidents();
    }
  }, [token]);

  const createIncident = async () => {
    try {
      await axios.post(
        "http://localhost:3001/security",
        {
          incidentId,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Incidente creado correctamente");
    } catch (error) {
      alert("Error al crear incidente");
    }
  };

  return (
    <div>
      <h2>Seguridad</h2>
      <input
        type="text"
        placeholder="ID de Incidente"
        value={incidentId}
        onChange={(e) => setIncidentId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripcion"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={createIncident}>Crear Incidente</button>
      <h3>Incidentes</h3>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            {incident.id} - {incident.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Security;
