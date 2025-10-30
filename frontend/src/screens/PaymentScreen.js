import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import CheckoutStep from '../components/CheckoutStep'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {

    const navigate = useNavigate()
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])


    const [paymentMethod, setPaymentMethod] = useState('Bank Transfer')
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutStep step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                </Form.Group>
                <Col>
                    <div className="mb-2">
                        <Form.Check
                            type="radio"
                            label="Bank Transfer"
                            id="BankTransfer"
                            name="paymentMethod"
                            value="Bank Transfer"
                            checked={paymentMethod === 'Bank Transfer'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="d-flex align-items-center gap-2"
                        />
                    </div>

                    <div className="mb-2">
                        <Form.Check
                            type="radio"
                            label="Cash on Delivery"
                            id="CashOnDelivery"
                            name="paymentMethod"
                            value="Cash on Delivery"
                            checked={paymentMethod === 'Cash on Delivery'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="d-flex align-items-center gap-2"
                        />
                    </div>
                </Col>


                <Button type='submit' variant='primary' className='mt-3'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
