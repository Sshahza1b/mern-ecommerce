import {
    ORDERS_LIST_REQUEST,
    ORDERS_LIST_SUCCESS,
    ORDERS_LIST_FAIL,
    ORDER_CANCEL_REQUEST,
    ORDER_CANCEL_SUCCESS,
    ORDER_CANCEL_FAIL,
} from "../constants/adminOrderConstants";

export const adminOrdersListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDERS_LIST_REQUEST:
            return { loading: true };
        case ORDERS_LIST_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDERS_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const adminOrderCancelReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CANCEL_REQUEST:
            return { loading: true };
        case ORDER_CANCEL_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case ORDER_CANCEL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
