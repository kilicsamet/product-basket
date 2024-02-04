import React from 'react';
import { Button, Col, Input, Row } from 'reactstrap';
import Select from "react-select";
import { useProductViewModel } from '../viewModel/ProductViewModel';
import { Link } from 'react-router-dom';
const Products = () => {
    const {
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
    } = useProductViewModel();

    return (
        <div >
            <Row>
                {Array.from({ length: defaultBasketLength }).map((_, index) => (
                    <React.Fragment key={index}>
                        <Col lg={6} className='mb-3'>
                            <Row>
                                <Col lg={12}>  <Select
                                    options={options}
                                    value={selectedOptions[index]}
                                    onChange={(selected) => handleChange(selected, index)}
                                    onInputChange={handleInputChange}
                                    onMenuOpen={() => setOptions([])}
                                    isSearchable
                                    placeholder="Ürün Arama"
                                    noOptionsMessage={() => optionMessage}
                                /></Col>
                                <Col>
                                    {
                                        selectedDetails[index] ?
                                            <div style={{ backgroundColor: "#90EE90", color: "white", borderRadius: "5px" }}>
                                                <div>{selectedDetails[index].stok_bilgileri[0].yer_baslik + ":" + selectedDetails[index].stok_bilgileri[0].stok_adet + " pcs in stocks"}</div>
                                                <div>{selectedDetails[index].stok_bilgileri[1].yer_baslik + ":" + selectedDetails[index].stok_bilgileri[1].stok_adet + " pcs in stocks"}</div>
                                            </div>

                                            : null
                                    }
                                </Col>

                            </Row>
                        </Col>
                        <Col lg={3} className='mb-3'>
                            <Col lg={12}>     <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button className="btn btn-danger" onClick={() => handleDecrement(index)} style={{ marginRight: '8px' }}>-</Button>
                                <Input type="number" value={values[index]} onChange={(e) => setValues((prevValues) => [...prevValues.slice(0, index), parseInt(e.target.value) || 0, ...prevValues.slice(index + 1)])} />
                                <Button className="btn btn-success" onClick={() => handleIncrement(index)} style={{ marginLeft: '8px', marginRight: '8px' }}>+</Button>

                                {selectedDetails[index]?.stok_satis &&
                                    "   $" + selectedDetails[index]?.stok_satis}
                            </div></Col>
                            <Col>
                                {
                                    selectedDetails[index] && values[index] > 0 ?
                                        <div style={{ backgroundColor: "#90EE90", color: "white", borderRadius: "5px" }}>
                                            {addBox[index] ?
                                                values[index] <= selectedDetails[index].kutu_bilgileri[2]?.boxkayit_kutuadet
                                                    ?
                                                    <>    <div>{values[index] + " boxes from " + selectedDetails[index].stok_bilgileri[0].yer_baslik}</div>


                                                    </>
                                                    :
                                                    <div style={{ backgroundColor: "red", color: "white", borderRadius: "5px" }}>{values[index] + " boxes will be added to your backorder list"}</div>




                                                :
                                                values[index] <= selectedDetails[index].stok_bilgileri[0].stok_adet + selectedDetails[index].stok_bilgileri[1].stok_adet
                                                    ?
                                                    <>
                                                        {
                                                            values[index] <= selectedDetails[index].stok_bilgileri[0].stok_adet ?
                                                                <div>{selectedDetails[index].stok_bilgileri[0].yer_baslik + ":" + values[index] + " pcs in stocks"}</div>
                                                                :

                                                                <>
                                                                    <div>{selectedDetails[index].stok_bilgileri[0].yer_baslik + ":" + selectedDetails[index].stok_bilgileri[0].stok_adet + " pcs in stocks"}</div>
                                                                    <div>{selectedDetails[index].stok_bilgileri[1].yer_baslik + ":" + (values[index] - selectedDetails[index].stok_bilgileri[0].stok_adet) + " pcs in stocks"}</div>

                                                                </>

                                                        }

                                                    </>


                                                    :
                                                    <div style={{ backgroundColor: "red", color: "white", borderRadius: "5px" }}>{values[index] + " pcs will be added to your backorder list"}</div>
                                            }

                                        </div>

                                        : null
                                }
                            </Col>

                        </Col>
                        {
                            selectedDetails[index]?.productBoxQuantitiesCount > 0 ?
                                <Col lg={3} className='mb-3'>
                                    <div>

                                        <input type="checkbox" name="Box" onChange={(e) => handleBox(index, e)} />
                                        <label className='m-1 p-1'>
                                            Add Box?
                                        </label>
                                    </div>

                                </Col>

                                : null
                        }
                    </React.Fragment>
                ))}
            </Row>
                <Row>
                    <Link to={`/productBasket`}>
                        <Button className="btn btn-success" disabled={basketValues.length > 0 ? false : true} onClick={handleAdd} style={{ marginLeft: '8px', marginRight: '8px', width: "80%" }}>
                            Add To Card
                        </Button>
                    </Link>
                </Row>
            
        </div>
    );
};

export default Products;
