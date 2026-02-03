import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">

      <div className="flex justify-between items-center bg-blue-600 p-4 text-white">
        <h1 className="text-xl font-bold">
          Money Management App
        </h1>
      </div>

      <Dashboard />

    </div>
  );
}

export default App;
