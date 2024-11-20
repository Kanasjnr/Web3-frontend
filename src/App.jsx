import "./config/connection";
import Layout from "./components/Layout";
import "./index.css";
import CreateTodoModal from "./components/CreateTodoModal";
import Todos from "./components/Todos";


const App = () => {
  return (
    <Layout>
      <CreateTodoModal />
      <Todos />
    </Layout>
  );
};

export default App;
