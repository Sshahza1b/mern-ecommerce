import axios from "axios";
import {
    ORDERS_LIST_REQUEST,
    ORDERS_LIST_SUCCESS,
    ORDERS_LIST_FAIL,
    ORDER_CANCEL_REQUEST,
    ORDER_CANCEL_SUCCESS,
    ORDER_CANCEL_FAIL,
} from "../constants/adminOrderConstants";

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDERS_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        };

        const { data } = await axios.get("/api/orders/admin", config);

        dispatch({ type: ORDERS_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ORDERS_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const cancelOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CANCEL_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        };

        const { data } = await axios.put(`/api/orders/${orderId}/cancel`, {}, config);

        dispatch({ type: ORDER_CANCEL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ORDER_CANCEL_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
