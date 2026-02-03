import { useState, useEffect } from "react";
import API from "../services/api";

const categories = [
  "Fuel", "Movie", "Food", "Loan", "Medical", "Shopping", "Other"
];

export default function UpdateModel({ transaction, close, onUpdated }) {
  const [data, setData] = useState({
    type: "INCOME",
    amount: "",
    category: "Food",
    division: "Personal",
    description: "",
    dateTime: new Date().toISOString(),
  });


  useEffect(() => {
    if (transaction) {
      setData({
        type: transaction.type || "INCOME",
        amount: transaction.amount || "",
        category: transaction.category || "Food",
        division: transaction.division || "Personal",
        description: transaction.description || "",
        dateTime: transaction.dateTime || new Date().toISOString(),
      });
    }
  }, [transaction]);

  const submit = async () => {
    if (!transaction?.id) {
      alert("Invalid transaction. Cannot update.");
      return;
    }
    if (!data.amount) {
      alert("Enter amount");
      return;
    }
    try {
      const res = await API.put(`/api/update/${transaction.id}`, data);
      console.log("Updated:", res.data);
      alert("Transaction Updated Successfully");
      if (typeof onUpdated === "function") onUpdated();
      if (typeof close === "function") close();
    } catch (err) {
      console.error("Error updating:", err.response || err);
      const msg = err.response?.data
        ? JSON.stringify(err.response.data)
        : err.message;
      alert("Backend Error: " + msg);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Update Transaction</h2>

        {/* Type */}
        <select
          className="border w-full mb-2 p-2 rounded"
          value={data.type}
          onChange={(e) => setData({ ...data, type: e.target.value })}
        >
          <option>INCOME</option>
          <option>EXPENSE</option>
        </select>

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          className="border w-full mb-2 p-2 rounded"
          value={data.amount}
          onChange={(e) => setData({ ...data, amount: e.target.value })}
        />

        {/* Category */}
        <select
          className="border w-full mb-2 p-2 rounded"
          value={data.category}
          onChange={(e) => setData({ ...data, category: e.target.value })}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* Division */}
        <input
          placeholder="Division (Personal/Office)"
          className="border w-full mb-2 p-2 rounded"
          value={data.division}
          onChange={(e) => setData({ ...data, division: e.target.value })}
        />

        {/* Description */}
        <input
          placeholder="Description"
          className="border w-full mb-2 p-2 rounded"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />

        {/* Buttons */}
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2 transition"
            onClick={submit}
          >
            Update
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            onClick={close}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
