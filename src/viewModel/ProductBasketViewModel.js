import { useEffect, useState } from 'react';
import { useProductContext } from '../Context/ProductContext';
export const useProductBasketViewModel = () => {

    const { productBasket, productValue, productAddBox, productArray } = useProductContext();
    const [productDetail, setProductDetail] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    useEffect(() => {
        const filteredProducts = productArray.filter(basketItem => {
            const matchedProduct = productBasket.find(product => product.name === basketItem.full_name);

            return matchedProduct !== undefined;
        });
        filteredProducts.map((filter, key) => {
            setSubTotal((prev) =>(  prev + filter.stok_satis * productValue[key]).toFixed(2));
            return null;
        });
        setProductDetail(filteredProducts);
    }, [productBasket, productArray]);
return {
    productDetail,
    subTotal,
    productValue
};
};



