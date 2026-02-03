import { useState } from "react";
import API from "../services/api";

const categories = [
  "Fuel","Movie","Food","Loan","Medical","Shopping","Other"
];

export default function AddModal({ close, onSaved }) {

  const [tab, setTab] = useState("INCOME");

  const [data, setData] = useState({
    type: "INCOME",
    amount: "",
    category: "Food",
    division: "Personal",
    description: "",
    dateTime: new Date().toISOString(),
    userId: JSON.parse(localStorage.getItem("user")).id   
  });

  const submit = async () => {
    await API.post("/add", data);
    onSaved();
    close();
  };

  const changeTab = (t) => {
    setTab(t);
    setData({...data, type:t});
  };
  

  return (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">

   <div className="bg-white p-4 w-96">

    {/* TABS */}
    <div className="flex mb-3">
      <button
        className={`flex-1 p-2 ${tab==="INCOME"?"bg-green-500 text-white":""}`}
        onClick={()=>changeTab("INCOME")}
      >
        Income
      </button>

      <button
        className={`flex-1 p-2 ${tab==="EXPENSE"?"bg-red-500 text-white":""}`}
        onClick={()=>changeTab("EXPENSE")}
      >
        Expense
      </button>
    </div>

    <input
      type="number"
      className="border w-full mb-2"
      placeholder="Amount"
      onChange={e=>setData({...data,amount:e.target.value})}
    />

    {/* CATEGORY DROPDOWN */}
    <select
      className="border w-full mb-2"
      onChange={e=>setData({...data,category:e.target.value})}
    >
      {categories.map(c=>
        <option key={c}>{c}</option>
      )}
    </select>

    {/* DIVISION */}
    <select
      className="border w-full mb-2"
      onChange={e=>setData({...data,division:e.target.value})}
    >
      <option>Personal</option>
      <option>Office</option>
    </select>

    <input
      className="border w-full mb-2"
      placeholder="Description"
      onChange={e=>setData({...data,description:e.target.value})}
    />

    <button
      className="bg-green-500 text-white p-2 w-full"
      onClick={submit}
    >
      Save
    </button>

   </div>
  </div>);
}
