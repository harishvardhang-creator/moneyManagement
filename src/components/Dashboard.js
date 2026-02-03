import { useState, useEffect } from "react";
import AddModal from "./AddModel";
import UpdateModal from "./UpdateModel";
import API from "../services/api";
import walletIcon from '../assests/wallet-icon.png'; // fixed spelling
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [period, setPeriod] = useState("MONTH");

  // Popup state
  const [success, setSuccess] = useState(false);

  const fetchTransactions = async () => {
    // const user = JSON.parse(localStorage.getItem("user"));
    // if (!user) return;

    try {
      const res = await API.get(`/all`);
      console.log(res.data);
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filterByPeriod = () => {
    const now = new Date();
    return transactions.filter(t => {
      const d = new Date(t.dateTime);

      if (period === "MONTH") return d.getMonth() === now.getMonth();
      if (period === "WEEK") return (now - d) / (1000 * 60 * 60 * 24) <= 7;
      if (period === "YEAR") return d.getFullYear() === now.getFullYear();

      return true;
    });
  };

  const data = filterByPeriod();

  const totalIncome = data
    .filter(t => t.type === "INCOME")
    .reduce((s, t) => s + t.amount, 0);

  const totalExpense = data
    .filter(t => t.type === "EXPENSE")
    .reduce((s, t) => s + t.amount, 0);

  // Handler for showing success popup
  const handleSaved = () => {
    fetchTransactions();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000); // hide after 2 seconds
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        {/* Logo + Title */}
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => window.location.reload()}
        >
          <img src={walletIcon} alt="Logo" className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Money Manager Tracker</h1>
        </div>

        {/* Add Transaction Button */}
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center bg-green-500 px-3 py-1 text-white rounded"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Transaction
        </button>
      </div>

      {/* PERIOD DROPDOWN */}
      <select
        className="border p-2 mb-4"
        value={period}
        onChange={e => setPeriod(e.target.value)}
      >
        <option value="MONTH">Month Wise</option>
        <option value="WEEK">Weekly</option>
        <option value="YEAR">Yearly</option>
      </select>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card title="Income" value={totalIncome} color="green" />
        <Card title="Expense" value={totalExpense} color="red" />
        <Card title="Balance" value={totalIncome - totalExpense} color="blue" />
      </div>

      {/* HISTORY TABLE */}
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Division</th>
            <th>Amount</th>
            <th>Desc</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map(t => (
            <tr key={t.id} className="text-center border-b">
              <td>{new Date(t.dateTime).toLocaleDateString()}</td>
              <td>{t.type}</td>
              <td>{t.category}</td>
              <td>{t.division}</td>
              <td>₹{t.amount}</td>
              <td>{t.description}</td>
              <td>
                <button
                  className="bg-blue-500 text-white px-2 rounded"
                  onClick={() => {
                    setSelected(t);
                    setShowUpdate(true);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* SUCCESS POPUP */}
      {success && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded shadow">
          Transaction saved successfully!
        </div>
      )}

      {showAdd && (
        <AddModal
          close={() => setShowAdd(false)}
          onSaved={handleSaved} // <-- pass new handler
        />
      )}

      {showUpdate && (
        <UpdateModal
          transaction={selected}
          close={() => setShowUpdate(false)}
          onUpdated={fetchTransactions}
        />
      )}
    </div>
  );
}

function Card({ title, value, color }) {
  const colorClass = {
    green: "text-green-600",
    red: "text-red-600",
    blue: "text-blue-600",
  }[color] || "text-black";

  return (
    <div className="bg-white p-3 rounded shadow">
      <h3>{title}</h3>
      <p className={`${colorClass} text-xl font-bold`}>₹{value}</p>
    </div>
  );
}
