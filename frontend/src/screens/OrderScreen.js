import React, { useEffect } from 'react'
import { getFullImageUrl } from '../utils/imageHelper';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'

const OrderScreen = () => {
    const { id: orderId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;


    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [dispatch, orderId])

    // 🧠 Don't try to access order properties if it's still undefined
    if (loading) return <Loader />
    if (error) return <Message variant='danger'>{error}</Message>
    if (!order) return null // wait for order to load

    // ✅ Calculate prices safely
    const addDecimals = (num) => Number((Math.round(num * 100) / 100).toFixed(2))
    order.itemsPrice = addDecimals(
        order.orderItems?.reduce((acc, item) => acc + item.price * item.qty, 0)
    )

    return (
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong>{order.user?.name} <br />
                                <strong>Email: </strong>
                                <a href={`mailto:${order.user?.email}`}>{order.user?.email}</a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress?.address}, {order.shippingAddress?.city},{' '}
                                {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
                            </p>
                            {userInfo && userInfo.isAdmin ? (
                                order.isDelivered ? (
                                    <Message variant='success'>Order is Delivered {order.deliveredAt}</Message>
                                ) : (
                                    <Message variant='danger'>Not Delivered</Message>
                                )
                            ) : null}

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p><strong>Method:</strong> {order.paymentMethod}</p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='danger'>Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems?.length === 0 ? (
                                <Message>Order is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={getFullImageUrl(item.image)} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x Rs {item.price} = Rs {item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>Rs {order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>Rs {order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>Rs {order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>Rs {order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen
