import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listOrders, cancelOrder } from "../actions/adminOrderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const AdminOrderListScreen = () => {
    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.adminOrdersList);
    const { loading, error, orders } = orderList;

    const orderCancel = useSelector((state) => state.adminOrderCancel);
    const { success: successCancel } = orderCancel;

    useEffect(() => {
        dispatch(listOrders());
    }, [dispatch, successCancel]);

    const cancelHandler = (id) => {
        if (window.confirm("Cancel this order?")) {
            dispatch(cancelOrder(id));
        }
    };

    return (
        <>
            <h1>All Orders (Admin)</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Cancelled</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o) => (
                            <tr key={o._id}>
                                <td>{o._id}</td>
                                <td>{o.user?.name}</td>
                                <td>Rs {o.totalPrice}</td>
                                <td>{o.isPaid ? "Yes" : "No"}</td>
                                <td>{o.isCancelled ? "Yes" : "No"}</td>
                                <td>
                                    <Link to={`/order/${o._id}`} className="btn btn-sm btn-light">
                                        Details
                                    </Link>{" "}
                                    {!o.isCancelled && (
                                        <Button
                                            variant="danger"
                                            className="btn-sm"
                                            onClick={() => cancelHandler(o._id)}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default AdminOrderListScreen;
