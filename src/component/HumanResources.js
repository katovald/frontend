import React, { useState, useEffect } from "react";
import axios from "axios";

const HumanResources = () => {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/human-resources",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error al obtener empleados");
      }
    };

    if (token) {
      fetchEmployees();
    }
  }, [token]);

  const addEmployee = async () => {
    try {
      await axios.post(
        "http://localhost:3001/human-resources",
        {
          name,
          position,
          salary,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Empleado agregado correctamente");
    } catch (error) {
      alert("Error al agregar empleado");
    }
  };

  return (
    <div>
      <h2>Recursos Humanos</h2>
      <input
        type="text"
        placeholder="Nombre"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Puesto"
        onChange={(e) => setPosition(e.target.value)}
      />
      <input
        type="number"
        placeholder="Salario"
        onChange={(e) => setSalary(e.target.value)}
      />
      <button onClick={addEmployee}>Agregar Empleado</button>
      <h3>Empleados</h3>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.position} - {employee.salary}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HumanResources;
