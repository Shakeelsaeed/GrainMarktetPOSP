import * as actions from "./actionTypes";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  error: null,
  user: null,
  loading: false,
  group: {},
  groupsList: [],
  account: {},
  accountsList: [],
  wheatPurchase: {},
  wheatSale: {},
  cottonPurchase: {},
  cottonSale: {},
  product: {},
  generalVoucher: {},
  balanceSheet: [],
};

export function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.AUTHENTICATED_START:
      return {
        error: null,
        loading: true,
      };
    case actions.GET_BALANCE_SHEET_SUCCESS:
      return {
        loading: false,
        balanceSheet: payload,
        error: null,
      };

    case actions.GET_BALANCE_SHEET_FAIL:
      return {
        loading: false,
        error: payload,
        balanceSheet: null,
      };

    case actions.ADD_GENERAL_VOUCHER_SUCCESS:
      return {
        loading: false,
        error: null,
        generalVoucher: payload.data,
      };

    case actions.ADD_GENERAL_VOUCHER_FAIL:
      return {
        loading: false,
        error: payload,
        generalVoucher: null,
      };

    case actions.ADDED_ACCOUNT_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        account: payload.data,
      };

    case actions.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        product: payload.data,
      };

    case actions.ADD_PRODUCT_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
        product: null,
      };

    case actions.ADD_ACCOUNT_FAIL:
      return {
        ...state,
        error: payload.error,
        loading: false,
        account: null,
      };

    case actions.ADD_WHEAT_PURCHASE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
        wheatPurchase: null,
      };
    case actions.ADD_WHEAT_SALE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
        wheatSale: null,
      };

    case actions.ADD_COTTON_PURCHASE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
        cottonPurchase: null,
      };

    case actions.ADD_COTTON_SALE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
        cottonSale: null,
      };

    case actions.ADD_COTTON_PURCHASE_SUCCESS:
      return {
        ...state,
        cottonPurchase: payload.data,
        loading: false,
        error: null,
      };

    case actions.ADD_COTTON_SALE_SUCCESS:
      return {
        ...state,
        cottonSale: payload.data,
        loading: false,
        error: null,
      };

    case actions.ADDGROUP_SUCCESS:
      return {
        ...state,
        group: payload,
        loading: false,
        error: null,
      };

    case actions.ADD_WHEAT_PURCHASE_SUCCESS:
      return {
        ...state,
        wheatPurchase: payload.data,
        loading: false,
        error: null,
      };

    case actions.ADD_WHEAT_SALE_SUCCESS:
      return {
        ...state,
        wheatSale: payload.data,
        loading: false,
        error: null,
      };

    case actions.GET_GROUPS_SUCCESS:
      return {
        ...state,
        groupsList: payload,
        loading: false,
        error: null,
      };

    case actions.GET_ACCOUNTS_LIST_SUCCESS:
      return {
        ...state,
        accountsList: payload.data,
        loading: false,
        error: null,
      };

    case actions.GET_ACCOUNTS_LIST_FAIL:
    case actions.GET_GROUPS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };

    case actions.AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case actions.AUTHENTICATED_FAIL:
      localStorage.removeItem("access");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.error,
      };
    case actions.LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access_token);
      localStorage.setItem("refresh", payload.refresh_token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
        user: payload.user,
        access: payload.access,
        refresh: payload.refresh,
      };
    case actions.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case actions.USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case actions.USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
    case actions.SIGNUP_FAIL:
    case actions.LOGIN_FAIL:
    case actions.LOGOUT:
      return {
        ...state,
        loading: false,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        error: action.error,
      };

    case actions.ADDGROUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
