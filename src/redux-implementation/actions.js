import axios from "axios";
import * as actions from "./actionTypes";
import { REQUEST_URL } from "./constatntURLS";

export const checkAuthenticated = () => async (dispatch) => {
  dispatch({
    type: actions.AUTHENTICATED_START,
  });
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  };
  await axios
    .get(REQUEST_URL + `welcome`, config)
    .then((res) => {
      dispatch({
        type: actions.AUTHENTICATED_SUCCESS,
      });
    })
    .catch((err) => {
      type: actions.AUTHENTICATED_FAIL;
    });
};

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: actions.AUTHENTICATED_START,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(REQUEST_URL + `login/`, body, config);
    dispatch({
      type: actions.LOGIN_SUCCESS,
      payload: res.data,
    });
    // dispatch(load_user());
  } catch (error) {
    console.log(error, "error");
    dispatch({
      error: error.response,
      type: actions.LOGIN_FAIL,
    });
  }
};

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer   ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    try {
      await axios.get(REQUEST_URL + `api/users/me/`, config).then((res) =>
        dispatch({
          type: actions.USER_LOADED_SUCCESS,
          payload: res.data,
        })
      );
    } catch (err) {
      console.log(err, "this is error while loading user");
      dispatch({
        type: actions.USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: actions.USER_LOADED_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("access");
  dispatch({
    type: actions.LOGOUT,
  });
  console.log(localStorage.getItem("token"));
};

export const addgroup = (name) => async (dispatch) => {
  dispatch({
    type: actions.REQUEST_START,
  });
  const body = JSON.stringify({
    // eslint-disable-next-line no-restricted-globals
    name,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  await axios
    .post(REQUEST_URL + `group/add/`, body, config)
    .then((res) => {
      dispatch({
        type: actions.ADDGROUP_SUCCESS,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((error) => {
      dispatch({
        error: error,
        type: actions.ADDGROUP_FAIL,
      });
    });
};

export const addgeneralvoucher =
  (credit_list, debit_list) => async (dispatch) => {
    dispatch({
      type: actions.REQUEST_START,
    });
    console.log(credit_list, debit_list);
    const body = JSON.stringify({
      // eslint-disable-next-line no-restricted-globals
      credit_list: credit_list,
      debit_list: debit_list,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    await axios
      .post(REQUEST_URL + `gernal/vocher/add/`, body, config)
      .then((res) => {
        dispatch({
          type: actions.ADD_GENERAL_VOUCHER_SUCCESS,
          payload: res.data,
        });
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          error: error,
          type: actions.ADD_GENERAL_VOUCHER_FAIL,
        });
      });
  };

export const groupList = () => async (dispatch) => {
  dispatch({
    type: actions.REQUEST_START,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  await axios
    .get(REQUEST_URL + `groups/`, config)
    .then((res) => {
      dispatch({
        type: actions.GET_GROUPS_SUCCESS,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((error) => {
      dispatch({
        error: error,
        type: actions.GET_GROUPS_FAIL,
      });
    });
};

export const accountList = () => async (dispatch) => {
  dispatch({
    type: actions.REQUEST_START,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  await axios
    .get(REQUEST_URL + `account/list/`, config)
    .then((res) => {
      dispatch({
        type: actions.GET_ACCOUNTS_LIST_SUCCESS,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((error) => {
      dispatch({
        error: error,
        type: actions.GET_ACCOUNTS_LIST_FAIL,
      });
    });
};

export const addaccount =
  (account_name, group_id, phone_number, opening_balance = 0) =>
  async (dispatch) => {
    dispatch({
      type: actions.REQUEST_START,
    });
    const body = JSON.stringify({
      // eslint-disable-next-line no-restricted-globals
      account_name,
      group_id,
      phone_number,
      opening_balance,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    await axios
      .post(REQUEST_URL + `account/add/`, body, config)
      .then((res) => {
        dispatch({
          type: actions.ADDED_ACCOUNT_SUCCESS,
          payload: res.data,
        });
        console.log(res);
      })
      .catch((error) => {
        dispatch({
          error: error,
          type: actions.ADD_ACCOUNT_FAIL,
        });
      });
  };

export const addwheatpurchase =
  (
    name,
    bouri,
    thela,
    date,
    phone_number,
    vechicle_number,
    weight,
    kat,
    product_name,
    purchase_amount,
    total_amount,
    company_name,
    net_weight,
    bar_dana,
    vechicle_rent,
    net_amount
  ) =>
  async (dispatch) => {
    dispatch({
      type: actions.REQUEST_START,
    });
    // console.log(body);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({
      name,
      bouri,
      thela,
      date,
      phone_number,
      vechicle_number,
      weight,
      kat,
      product_name,
      purchase_amount,
      total_amount,
      company_name,
      net_weight,
      bar_dana,
      vechicle_rent,
      net_amount,
    });
    console.log(body);
    await axios
      .post(REQUEST_URL + `wheat/purchase/add/`, body, config)
      .then((res) => {
        dispatch({
          type: actions.ADD_WHEAT_PURCHASE_SUCCESS,
          payload: res.data,
        });
        console.log(res);
      })
      .catch((error) => {
        dispatch({
          error: error,
          type: actions.ADD_WHEAT_PURCHASE_FAIL,
        });
      });
  };

export const addwheatsale =
  (
    name,
    gate_no,
    bouri,
    thela,
    date,
    phone_number,
    vechicle_number,
    weight,
    kat,
    product_name,
    sale_ammount,
    total_amount,
    company_name,
    net_weight,
    bar_dana,
    vechicle_rent,
    net_amount
  ) =>
  async (dispatch) => {
    dispatch({
      type: actions.REQUEST_START,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({
      name,
      gate_no,
      bouri,
      thela,
      date,
      phone_number,
      vechicle_number,
      weight,
      kat,
      product_name,
      sale_ammount,
      total_amount,
      company_name,
      net_weight,
      // bar_dana,
      vechicle_rent,
      net_amount,
    });
    console.log(body);
    await axios
      .post(REQUEST_URL + `wheat/sale/add/`, body, config)
      .then((res) => {
        dispatch({
          type: actions.ADD_WHEAT_SALE_SUCCESS,
          payload: res.data,
        });
        console.log(res);
      })
      .catch((error) => {
        dispatch({
          error: error,
          type: actions.ADD_WHEAT_SALE_FAIL,
        });
      });
  };

export const addcottonpurchase =
  (
    purchase_name,
    date,
    phone_number,
    vechicle_number,
    weight,
    kat,
    sangali,
    quantity,
    gate_no,
    product_name,
    purchase_amount,
    total_amount,
    company_name,
    commision,
    net_weight,
    vechicle_rent,
    net_amount
  ) =>
  async (dispatch) => {
    dispatch({
      type: actions.REQUEST_START,
    });
    // console.log(body);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({
      purchase_name,
      date,
      phone_number,
      vechicle_number,
      weight,
      kat,
      sangali,
      quantity,
      gate_no,
      product_name,
      purchase_amount,
      total_amount,
      company_name,
      commision,
      net_weight,
      vechicle_rent,
      net_amount,
    });
    console.log(body);
    await axios
      .post(REQUEST_URL + `cotton/purchase/add/`, body, config)
      .then((res) => {
        dispatch({
          type: actions.ADD_COTTON_PURCHASE_SUCCESS,
          payload: res.data,
        });
        console.log(res);
      })
      .catch((error) => {
        dispatch({
          error: error,
          type: actions.ADD_COTTON_PURCHASE_FAIL,
        });
      });
  };

export const addcottonsale =
  (
    saler_name,
    date,
    phone_number,
    vechicle_number,
    weight,
    kat,
    sangali,
    quantity,
    gate_no,
    product_name,
    sale_price,
    total_amount,
    company_name,
    commision,
    net_weight,
    vechicle_rent,
    net_amount
  ) =>
  async (dispatch) => {
    dispatch({
      type: actions.REQUEST_START,
    });
    // console.log(body);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({
      saler_name,
      date,
      phone_number,
      vechicle_number,
      weight,
      kat,
      sangali,
      quantity,
      gate_no,
      product_name,
      sale_price,
      total_amount,
      company_name,
      commision,
      net_weight,
      vechicle_rent,
      net_amount,
    });
    console.log(body);
    await axios
      .post(REQUEST_URL + `cotton/sale/add/`, body, config)
      .then((res) => {
        dispatch({
          type: actions.ADD_COTTON_SALE_SUCCESS,
          payload: res.data,
        });
        console.log(res);
      })
      .catch((error) => {
        dispatch({
          error: error,
          type: actions.ADD_COTTON_SALE_FAIL,
        });
      });
  };

export const getbalancesheet = (start, end) => async (dispatch) => {
  dispatch({
    type: actions.REQUEST_START,
  });

  const config = {
    headers: {
      Accept: "application/json",
      start: start,
      end: end,
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  };
  await axios
    .get(REQUEST_URL + `balance/sheet/`, config)
    .then((res) => {
      dispatch({
        type: actions.GET_BALANCE_SHEET_SUCCESS,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((error) => {
      dispatch({
        error: error,
        type: actions.GET_BALANCE_SHEET_FAIL,
      });
    });
};

export const addtypesofproducts = (name) => async (dispatch) => {
  dispatch({
    type: actions.REQUEST_START,
  });
  console.log(name);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  const body = JSON.stringify({
    name,
  });
  console.log(body);
  await axios
    .post(REQUEST_URL + `product/add/`, body, config)
    .then((res) => {
      dispatch({
        type: actions.ADD_PRODUCT_SUCCESS,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((error) => {
      dispatch({
        error: error,
        type: actions.ADD_PRODUCT_FAIL,
      });
    });
};

export const signup = (email, username, password) => async (dispatch) => {
  dispatch({
    type: actions.AUTHENTICATED_START,
  });
  const body = JSON.stringify({
    username,
    email,
    password,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  await axios
    .post(REQUEST_URL + `signup/`, body, config)
    .then((res) => {
      dispatch(login(email, password));
      dispatch({
        type: actions.SIGNUP_SUCCESS,
        payload: res.data,
      });
      console.log(res);
      dispatch(load_user());
    })
    .catch((error) => {
      dispatch({
        error: error,
        type: actions.SIGNUP_FAIL,
      });
    });
};
