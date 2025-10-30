import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderPlacedScreen = () => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const savedOrder = localStorage.getItem("latestOrder");
        if (savedOrder) {
            setOrder(JSON.parse(savedOrder));
        }
    }, []);

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-lg text-center p-4">
                        <Card.Body>
                            <h2 className="text-success mb-3">✅ Order Placed Successfully!</h2>
                            <p className="lead">
                                Your order has been placed successfully and will be delivered soon.
                            </p>

                            {order && (
                                <Card.Text className="fw-bold text-primary">
                                    Order ID: #{order._id}
                                    <br />
                                    Payment Method: {order.paymentMethod}
                                    <br />
                                    Total: Rs. {order.totalPrice}
                                </Card.Text>
                            )}

                            <p className="text-muted mt-3">
                                You can view your order details in your profile anytime.
                            </p>

                            <Link to="/">
                                <Button variant="primary" className="mt-3 px-4">
                                    Back to Home
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderPlacedScreen;
