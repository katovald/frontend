import React, { useState, useEffect } from "react";
import axios from "axios";

const Production = () => {
  const [orders, setOrders] = useState([]);
  const [orderNumber, setOrderNumbers] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3001/production", {
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
        "http://localhost:3001/production",
        {
          orderNumber,
          product,
          quantity,
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
      <h2>Produccion</h2>
      <input
        type="text"
        placeholder="Numero de Orden"
        onChange={(e) => setOrderNumbers(e.target.value)}
      />
      <input
        type="text"
        placeholder="Producto"
        onChange={(e) => setProduct(e.target.value)}
      />
      <input
        type="text"
        placeholder="Cantidad"
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={createOrder}>Crear orden</button>
      <h3>Ordenes</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Order Number: {order.orderNumber}</p>
            <p>Product: {order.product}</p>
            <p>Quantity: {order.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Production;
