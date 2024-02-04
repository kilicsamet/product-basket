import { createRoot } from 'react-dom/client'; 
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
const root = document.getElementById('root');
const rootElement = createRoot(root);

rootElement.render(
  <Router>
    <App />
  </Router>
);