
import { Button, Card, CardBody, CardHeader, Col, Input, Row } from 'reactstrap';
import { useProductBasketViewModel } from '../viewModel/ProductBasketViewModel';
const ProductBasket = () => {
  const {
    productDetail,
    subTotal,
    productValue
} = useProductBasketViewModel();
  return (
    <Row>
      <Col xl={9}>
        <Card>

          {productDetail.length > 0 ?
            <CardBody>
              <div className="table-responsive table-card">
                <table className="table table-nowrap align-middle table-borderless mb-0">
                  <thead className="table-light text-muted">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Unit Price</th>
                      <th scope="col">Quantitiy</th>
                      <th scope="col">Sub Total</th>
                      <th scope="col" className="text-end">Update/Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productDetail.map((product, index) => (
                      <tr key={index}>
                        <td><img src={product.product_image} alt="" width="100px" /></td>
                        <td>
                          <div>
                            <p>
                              {product.full_name}
                            </p>
                            <p className='fw-bold'>
                              {product.id}
                            </p>
                            {
                              product.productBoxQuantitiesCount > 0 ?
                                <p>
                                  {"Box Quantity:" + product.productBoxQuantities[2].boxkayit_kutuadet}
                                </p>
                                : ""
                            }
                          </div>
                        </td>
                        <td className='fw-bold'>{"$ " + product.stok_satis}</td>
                        <td>

                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button className="btn btn-danger" disabled style={{ marginRight: '8px' }}>-</Button>
                            <Input type="number" value={productValue[index]} disabled />
                            <Button className="btn btn-success" disabled style={{ marginLeft: '8px', marginRight: '8px' }}>+</Button>
                          </div>
                          <div>
                            {productValue[index] <= product.m_stok_diger_bilgiler[0].stok_adet + product.m_stok_diger_bilgiler[1].stok_adet
                              ?
                              <>
                                {
                                  productValue[index] <= product.m_stok_diger_bilgiler[0].stok_adet ?
                                    <div>{productValue[index] + " from " + product.m_stok_diger_bilgiler[0].yer_baslik}</div>
                                    :
                                    <>
                                      <div>{product.m_stok_diger_bilgiler[0].stok_adet + " from " + product.m_stok_diger_bilgiler[0].yer_baslik}</div>
                                      <div>{(productValue[index] - product.m_stok_diger_bilgiler[0].stok_adet) + " from " + product.m_stok_diger_bilgiler[1].yer_baslik}</div>

                                    </>

                                }

                              </>


                              :
                              <div style={{ backgroundColor: "red", color: "white", borderRadius: "5px" }}>{productValue[index] + " pcs will be added to your backorder list"}</div>
                            }
                          </div>

                        </td>
                        <td className='fw-bold'>{"$ " + (product.stok_satis * productValue[index]).toFixed(2)}</td>

                        <td className="text-end">
                          <div>
                            <button className="btn btn-success me-2">Update</button>
                            <button className="btn btn-danger">Delete</button>
                          </div>
                          Save For Later
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid" }}>
                  <button className="btn btn-primary mt-2">Continue Shopping</button>
                  <button className="btn btn-danger mt-2">Clear Shopping Cart</button>
                </div>
              </div>
            </CardBody>
            : <CardBody>
              <div className="d-flex align-items-center justifity-content-beetween m-2">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-center text-uppercase fw-medium  mb-2">{("Veri Bulunamadı")}</p>
                </div>

              </div>
            </CardBody>}

        </Card>
      </Col>
      <Col xl={3}>
        <Card>
          <CardBody>
            <div className="d-flex justify-content-center align-items-center m-2">
              <button className="btn btn-primary">Add More Products</button>
            </div>
          </CardBody>


        </Card>
        <Card>
          <CardBody>
            <div className="d-flex flex-column justify-content-center align-items-center m-2">
              <p className="text-start fw-medium mb-2">
                {("Enter The coupon code below")}
              </p>
              <Input type='text' placeholder='Coupon Code' style={{ borderRadius: "10px" }} />
              <button className="btn btn-danger mt-2">Apply Coupon</button>
            </div>

          </CardBody>

        </Card>
        <Card>
          <CardHeader>
            <div className="d-flex align-items-center">
              <h5 className="card-title fw-bold">{("Proceed to Checkout")}</h5>

            </div>
          </CardHeader>
          <CardBody>
            <p>Cart Total</p>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ textAlign: 'left' }}>Card Subtotal:</p>
                <p style={{ textAlign: 'right' }}>{subTotal}</p>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ textAlign: 'left' }}>Grand Total:</p>
                <p style={{ textAlign: 'right' }}>{subTotal}</p>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ textAlign: 'left' }}>Main WareHouse:</p>
                <p style={{ textAlign: 'right' }}>{subTotal}</p>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ textAlign: 'left' }}>Shipping:</p>
                <p style={{ textAlign: 'right' }}>{"Free Shipping"}</p>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ textAlign: 'left' }}>Grand Total:</p>
                <p style={{ textAlign: 'right' }}>{subTotal}</p>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-primary mt-2">Checkout</button>

              </li>
            </ul>

          </CardBody>

        </Card>
      </Col>
    </Row>
  );
};

export default ProductBasket;
