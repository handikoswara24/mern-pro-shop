import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state: RootStateOrAny) => state.productList);

    const { error, loading, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <>
            <h1>Lastest Product</h1>
            {loading ? <h1>Loading...</h1> :
                error ? <h3>{error}</h3> :
                    <Row>
                        {
                            products.map((product: any) => (
                                <Col sm="12" md="6" lg="4" xl="3" key={product?._id}>
                                    <Product product={product}></Product>
                                </Col>
                            ))
                        }
                    </Row>}

        </>
    );
}

export default HomeScreen;