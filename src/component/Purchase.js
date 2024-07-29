import React, { useState, useEffect } from "react";
import axios from "axios";

const Purchase = () => {
  const [orders, setOrders] = useState([]);
  const [orderNumber, setOrderNumbers] = useState("");
  const [suppliers, setSupplier] = useState("");
  const [items, setItems] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3001/purchase", {
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
        "http://localhost:3001/purchase",
        {
          orderNumber,
          suppliers,
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
      <h2>Compras</h2>
      <input
        type="text"
        placeholder="Numero de Orden"
        onChange={(e) => setOrderNumbers(e.target.value)}
      />
      <input
        type="text"
        placeholder="Proveedor"
        onChange={(e) => setSupplier(e.target.value)}
      />
      <input
        type="text"
        placeholder="Items"
        onChange={(e) => setItems(e.target.value)}
      />
      <button onClick={createOrder}>Crear Orden</button>
      <h3>Ordenes</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.orderNumber} - {order.suppliers} - {order.items}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Purchase;
