import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [productBasket, setProductBasket] = useState([]);
    const [productValue, setProductValue] = useState([]);
    const [productAddBox, setProductAddBox] = useState([]);
    const [productArray, setProductArray] = useState([]);

    return (
        <ProductContext.Provider value={{ productBasket, setProductBasket, productValue, setProductValue, productAddBox, setProductAddBox, productArray, setProductArray }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    return useContext(ProductContext);
};