import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, Input, Row } from 'reactstrap';

const Header = () => {
    return (
        <>
        <Row className='m-4'>
          <Col xs={12}>
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0">Ürünler</h4>
  
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">Anasayfa</li>
                  <li className="breadcrumb-item active">Ürünler</li>
                </ol>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
};

export default Header;