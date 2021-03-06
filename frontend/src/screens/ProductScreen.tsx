import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

// interface Product {
//     _id: string,
//     name: string,
//     image: string,
//     description: string,
//     brand: string,
//     category: string,
//     price: number,
//     countInStock: number,
//     rating: number,
//     numReviews: number,
// }

const ProductScreen = ({ history, match }: any) => {
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();

    const productDetails = useSelector((state: RootStateOrAny) => state.productDetails);

    const { error, product, loading } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    }

    return (
        <>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>
            {loading ? <Loader></Loader> : error ? <Message variant="danger">{error}</Message> : <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={` ${product.numReviews} reviews`}></Rating>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price : ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description : {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col>Price : </Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status : </Col>
                                <Col>
                                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Qty
                                    </Col>
                                    <Col>
                                        <Form.Control as="select" value={qty} onChange={(e: any) => setQty(e.target.value)}>
                                            {
                                                [...Array(product.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                            <Button className="btn-block" type="button" disabled={product.countInStock === 0} onClick={addToCartHandler}>
                                Add To Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            }
        </>
    )
}

export default ProductScreen;

