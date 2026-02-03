import { useState } from "react";
import API from "../services/api";

const categories = [
  "Fuel", "Movie", "Food", "Loan", "Medical", "Shopping", "Other"
];

export default function AddModel({ close, onSaved }) {

  const [tab, setTab] = useState("INCOME");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [data, setData] = useState({
    type: "INCOME",
    amount: "",
    category: "Food",
    division: "Personal",
    description: "",
    dateTime: new Date().toISOString(),
    userId: user.id || "1"  
  });

  const submit = async () => {
    if (!data.amount) {
      alert("Amount cannot be empty.");
      return;
    }

    try {
      // Fixed endpoint to include /api
      const res = await API.post("/add", data);
      console.log("Transaction added:", res.data);
      onSaved();  // refresh table & show success
      close();    // close modal
    } catch (err) {
      console.error("Failed to add transaction:", err);
      alert("Failed to add transaction. Please try again.");
    }
  };

  const changeTab = (t) => {
    setTab(t);
    setData({ ...data, type: t });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-4 w-96">

        {/* TABS */}
        <div className="flex mb-3">
          <button
            className={`flex-1 p-2 ${tab === "INCOME" ? "bg-green-500 text-white" : ""}`}
            onClick={() => changeTab("INCOME")}
          >
            Income
          </button>
          <button
            className={`flex-1 p-2 ${tab === "EXPENSE" ? "bg-red-500 text-white" : ""}`}
            onClick={() => changeTab("EXPENSE")}
          >
            Expense
          </button>
        </div>

        {/* AMOUNT */}
        <input
          type="number"
          className="border w-full mb-2"
          placeholder="Amount"
          value={data.amount}
          onChange={e => setData({ ...data, amount: e.target.value })}
        />

        {/* CATEGORY DROPDOWN */}
        <select
          className="border w-full mb-2"
          value={data.category}
          onChange={e => setData({ ...data, category: e.target.value })}
        >
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>

        {/* DIVISION */}
        <select
          className="border w-full mb-2"
          value={data.division}
          onChange={e => setData({ ...data, division: e.target.value })}
        >
          <option>Personal</option>
          <option>Office</option>
        </select>

        {/* DESCRIPTION */}
        <input
          className="border w-full mb-2"
          placeholder="Description"
          value={data.description}
          onChange={e => setData({ ...data, description: e.target.value })}
        />

        {/* SAVE BUTTON */}
        <button
          className="bg-green-500 text-white p-2 w-full"
          onClick={submit}
        >
          Save
        </button>

      </div>
    </div>
  );
}
