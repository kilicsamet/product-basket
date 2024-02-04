import { useEffect, useState } from 'react';
import axios from 'axios';
import { useProductContext } from '../Context/ProductContext';
export const useProductViewModel = () => {
   
    const [defaultBasketLength, setDefaultBasketLength] = useState(5);
    const [products, setProducts] = useState([]);
    const [optionMessage, setOptionMessage] = useState("En az 2 karakter giriniz");
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/data.json');
                setProducts(response?.data?.items)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [basketValues, setBasketValues] = useState([]);
    const [selectedDetails, setselectedDetails] = useState([]);
    const [addBox, setAddBox] = useState([]);
    useEffect(() => {
        if (basketValues.length >= defaultBasketLength) {
            setDefaultBasketLength((prevLength) => prevLength + 5);
        }
    }, [basketValues]);
    const [values, setValues] = useState([]);
    const handleChange = (selected, index) => {
        setOptions([{
            value: selected.value,
            label: selected.label
        }]);
    
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = {
            value: selected.value,
            label: selected.value
        };
        setSelectedOptions(newSelectedOptions);
    
        const newBasketValues = [...basketValues];
        newBasketValues[index] = { name: selected.value };
        setBasketValues(newBasketValues);
    
        const selectedProduct = products.find((product) => product.full_name === selected.value);
        const newSelectedDetail = [...selectedDetails];
    
        if (selectedProduct) {
            newSelectedDetail[index] = {
                stok_satis: selectedProduct.stok_satis,
                stok_bilgileri: selectedProduct.m_stok_diger_bilgiler,
                productBoxQuantitiesCount: selectedProduct.productBoxQuantitiesCount,
                kutu_bilgileri: selectedProduct.productBoxQuantitiesCount > 0
                    ? selectedProduct.productBoxQuantities
                    : selectedProduct.productBoxQuantitiesCount
            }
            setselectedDetails(newSelectedDetail)
        }
    
    
    };
    
    const handleDecrement = (index) => {
        const newValue = Math.max(values[index] - 1, 0);
        setValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = newValue;
            return newValues;
        });
    };
    
    const handleIncrement = (index) => {
        const newValue = values[index] + 1;
        setValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = newValue;
            return newValues;
        });
    };
    const handleBox = (index, event) => {
        const newBox = [...addBox];
        newBox[index] = { boxType: event.target.checked };
        setAddBox(newBox);
    };
    const handleInputChange = (inputValue, { action }) => {
        if (action === 'input-change' && inputValue.length < 2) {
            setOptionMessage("En az 2 karakter giriniz")
            setOptions([])
        } else {
            if (inputValue.length !== 0) {
                const filteredOptions = products.filter((option) =>
                    option.id.toLowerCase().includes(inputValue.toLowerCase())
                );
    
                setOptions((prevOptions) => {
                    const newOptions = filteredOptions.filter((filter) => {
                        // Eğer basketValues içinde aynı full_name varsa, bu filter'i yeni options'a ekleme
                        return !basketValues.some((basketValue) => basketValue.name === filter.full_name);
                    });
    
                    return [
                        ...prevOptions,
                        ...newOptions.map((filter) => ({
                            value: filter.full_name,
                            label: (
                                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <div style={{ marginTop: '0px' }}>
                                        <img src={filter.product_image} alt="Product" style={{ width: '40px', marginRight: '8px', marginTop: '0px' }} />
                                    </div>
                                    <div style={{ marginLeft: '8px' }}>
                                        <p>{filter.id}</p>
                                        <p>{filter.full_name}</p>
                                        <p>Price: ${filter.stok_satis}</p>
                                        <p>{filter.m_stok_diger_bilgiler[0].stok_adet + " pcs in " + filter.m_stok_diger_bilgiler[0].yer_baslik}</p>
                                        <p>{filter.m_stok_diger_bilgiler[1].stok_adet + " pcs in " + filter.m_stok_diger_bilgiler[1].yer_baslik}</p>
                                    </div>
                                </div>
                            ),
                        })),
                    ];
                });
            }
    
            setOptionMessage("")
    
        }
    };
    const {  setProductBasket,setProductValue,setProductAddBox,setProductArray } = useProductContext();
    const handleAdd = () => {
        setProductBasket(basketValues)
        setProductValue(values)
        setProductAddBox(addBox)
        setProductArray(products)
    };
    return {
        defaultBasketLength,
        options,
        selectedOptions,
        handleChange,
        handleInputChange,
        setOptions,
        optionMessage,
        selectedDetails,
        handleDecrement,
        values,
        setValues,
        addBox,
        handleBox,
        basketValues,
        handleIncrement,
        handleAdd
    };
};



