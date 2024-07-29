import React, { useState, useEffect } from "react";
import axios from "axios";

const Accounting = () => {
  const [transactions, setTransactions] = useState([]);
  const [trasactionId, setTransactionId] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:3001/accounting", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Error al obtener transacciones");
      }
    };

    if (token) {
      fetchTransactions();
    }
  }, [token]);

  const createTransaction = async () => {
    try {
      await axios.post(
        "http://localhost:3001/accounting",
        {
          trasactionId,
          amount,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Transaccion creada correctamente");
    } catch (error) {
      alert("Error al crear transaccion");
    }
  };

  return (
    <div>
      <h2>Contabilidad</h2>
      <input
        type="text"
        placeholder="ID de Transaccion"
        value={trasactionId}
        onChange={(e) => setTransactionId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tipo"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <button onClick={createTransaction}>Crear transaccion</button>

      <h3>Transacciones</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.id} - {transaction.amount} - {transaction.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accounting;
