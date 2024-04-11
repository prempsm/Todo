import TodoForm from './TodoForm';
import { store } from './Redux/store';
import { Provider } from 'react-redux';
import List from './List';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TodoForm />
        <List />
        <ToastContainer />
      </Provider>
    </div>
  );
}

export default App;
