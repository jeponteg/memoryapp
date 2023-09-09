import "../src/main.css"
import Layout from "./layout/Layout"
import MemoryGame from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Layout>
        <MemoryGame />
      </Layout>
    </div>

  );
}

export default App;
