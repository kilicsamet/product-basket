// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductBasket from './pages/ProductBasket';
import Products from './pages/Products';
import { ProductProvider } from './Context/ProductContext'; 
import Header from './Components/Header';

function App() {
  return (
    <ProductProvider>
      <div>
      <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/productBasket" element={<ProductBasket />} />
        </Routes>
      </div>
    </ProductProvider>
  );
}

export default App;
