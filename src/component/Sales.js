import React, { useState, useEffect } from "react";
import axios from "axios";

const Sales = () => {
  const [orders, setOrders] = useState([]);
  const [orderNumber, setOrderNumbers] = useState("");
  const [costumers, setCostumer] = useState("");
  const [items, setItems] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3001/sales", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  const createOrder = async () => {
    try {
      await axios.post(
        "http://localhost:3001/sales",
        {
          orderNumber,
          costumers,
          items,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Orden creada correctamente");
    } catch (error) {
      alert("Error al crear orden");
    }
  };

  return (
    <div>
      <h2>Ventas</h2>
      <input
        type="text"
        placeholder="Numero de Orden"
        onChange={(e) => setOrderNumbers(e.target.value)}
      />
      <input
        type="text"
        placeholder="Cliente"
        onChange={(e) => setCostumer(e.target.value)}
      />
      <input
        type="text"
        placeholder="Productos"
        onChange={(e) => setItems(e.target.value)}
      />
      <button onClick={createOrder}>Crear Orden</button>
      <h3>Ordenes</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.orderNumber} - {order.costumers} - {order.items}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sales;
