import './App.css';

import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import GrapgEditor from '@/features/graphPanel';

function App() {
  return (
    <Provider store={store}>
      <div className="app"></div>
      <GrapgEditor />
    </Provider>
  );
}

export default App;
