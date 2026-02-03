export default function TransactionList({ transactions, onEdit }) {
  return (
    <table className="table-auto w-full">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 text-left">Type</th>
          <th className="px-4 py-2 text-left">Amount</th>
          <th className="px-4 py-2 text-left">Category</th>
          <th className="px-4 py-2 text-left">Division</th>
          <th className="px-4 py-2 text-left">Description</th>
          <th className="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr key={t.id} className="hover:bg-gray-100 transition">
            <td className="border px-4 py-2">{t.type}</td>
            <td
              className={`border px-4 py-2 ${
                t.type === "INCOME" ? "text-green-600" : "text-red-600"
              }`}
            >
              ₹ {t.amount}
            </td>
            <td className="border px-4 py-2">{t.category}</td>
            <td className="border px-4 py-2">{t.division}</td>
            <td className="border px-4 py-2">{t.description}</td>
            <td className="border px-4 py-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                onClick={() => onEdit(t)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
