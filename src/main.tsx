import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store } from './redux/store';
import './index.css'
import { theme } from './theme/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </Provider>
)
