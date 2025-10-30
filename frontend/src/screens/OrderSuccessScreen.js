import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderSuccessScreen = () => {
    return (
        <div className="text-center mt-5">
            <h2>✅ Payment Successful!</h2>
            <p>Your order has been placed via Easypaisa (Dummy Bank Transfer).</p>
            <Link to="/">
                <Button variant="success" className="mt-3">
                    Back to Home
                </Button>
            </Link>
        </div>
    );
};

export default OrderSuccessScreen;
