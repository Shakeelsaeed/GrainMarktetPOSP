import * as React from "react";
import { nanoid } from "nanoid";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import { Theme } from "../../../common/Theme";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import BasicTable from "../Tables/GeneralVoucherTable";
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  accountList,
  addgeneralvoucher,
} from "../../../../redux-implementation/actions";
import { useNavigate } from "react-router-dom";

function Credit({ state, accountList, addgeneralvoucher }) {
  React.useMemo(() => {
    accountList();
  }, [accountList]);
  const [totalCredit, setTotalCredit] = React.useState(0);
  const [totalDebit, setTotalDebit] = React.useState(0);
  const [creditDataList, setCreditDataList] = React.useState([]);
  const [debitDataList, setDebitDataList] = React.useState([]);
  function checkBalance() {
    if (totalCredit === totalDebit) {
      if (totalCredit === 0 || totalDebit === 0) return true;
      else return false;
    }
    return true;
  }
  const [selectore, setSelectore] = React.useState("");
  const [list, setList] = React.useState([]);
  const [editFormData, setEditFormData] = React.useState({
    account: "",
    credit: "",
    debit: "",
    date: "",
    description: "",
  });
  const [value, setValue] = React.useState("credit");

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };
  const [editContactId, setEditContactId] = React.useState(null);
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    let editedContact = {
      id: editContactId,
      account: editFormData.account,
      credit: editFormData.credit,
      debit: editFormData.debit,
      date: editFormData.date,
      description: editFormData.description,
    };

    const newList = [...list];

    const index = list.findIndex((list) => list.id === editContactId);
    console.log(index);

    newList[index] = editedContact;

    setList(newList);
    setEditContactId(null);
    let sumcredit = 0;
    let sumdebit = 0;
    for (let i = 0; i < newList.length; i++) {
      sumcredit = sumcredit + parseInt(newList[i].credit);
      sumdebit = sumdebit + parseInt(newList[i].debit);
    }
    setTotalCredit(sumcredit);
    setTotalDebit(sumdebit);
  };
  const handleEditClick = (event, data) => {
    event.preventDefault();
    setEditContactId(data.id);

    const formValues = {
      account: data.account,
      credit: data.credit,
      debit: data.debit,
      date: data.date,
      description: data.description,
    };

    setEditFormData(formValues);
  };
  const handleCancelClick = () => {
    setEditContactId(null);
  };
  const handleDeleteClick = (id) => {
    const newList = [...list];

    const index = list.findIndex((contact) => contact.id === id);

    newList.splice(index, 1);

    setList(newList);
  };
  const navigate = useNavigate();
  const handlePost = (event) => {
    addgeneralvoucher(creditDataList, debitDataList);

    navigate("/transactions");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("account", selectore);
    let body = {};
    let credit = {};
    let debit = {};
    const account = state.accountsList.filter(
      (account) => account.account_name === data.get("account")
    );
    const accountid = account[0].account_id;
    // console.log(account);
    if (data.get("radio") === "credit") {
      body = {
        id: nanoid(),
        account: data.get("account"),
        credit: data.get("credit"),
        debit: 0,
        date: data.get("date"),
        description: data.get("description"),
      };

      credit = {
        account_id: accountid,
        amount: parseInt(data.get("credit")),
        date: data.get("date"),
        description: data.get("description"),
      };
      const newCreditList = [...creditDataList, credit];
      setCreditDataList(newCreditList);
    } else {
      body = {
        id: nanoid(),
        account: data.get("account"),
        credit: 0,
        debit: data.get("credit"),
        date: data.get("date"),
        description: data.get("description"),
      };
      debit = {
        account_id: accountid,
        amount: parseInt(data.get("credit")),
        date: data.get("date"),
        description: data.get("description"),
      };
      const newDebitList = [...debitDataList, debit];
      setDebitDataList(newDebitList);
    }
    if (
      data.get("account") === "" ||
      data.get("credit") === "" ||
      data.get("date") === "" ||
      data.get("description") === ""
    ) {
      toast.error("Denied");
    } else {
      toast.success("Success");
      const newList = [...list, body];
      setList(newList);
      let sumcredit = 0;
      let sumdebit = 0;
      for (let i = 0; i < newList.length; i++) {
        sumcredit = sumcredit + parseInt(newList[i].credit);
        sumdebit = sumdebit + parseInt(newList[i].debit);
      }
      setTotalCredit(sumcredit);
      setTotalDebit(sumdebit);
    }
  };
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  return (
    <ThemeProvider theme={Theme}>
      <ToastContainer />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ width: "auto" }}
        >
          <Grid item md={4}>
            <TextField
              sx={{ width: "90%", margin: "0 10px" }}
              required
              id="credit"
              label="Total Credit"
              type="number"
              name="credit"
              value={totalCredit}
              disabled
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              sx={{ width: "90%", margin: "0 10px" }}
              required
              id="debit"
              label="Total Debit"
              type="number"
              name="debit"
              value={totalDebit}
              disabled
            />
          </Grid>
          <Grid item md={4}>
            <Button
              variant="contained"
              disabled={checkBalance()}
              onClick={handlePost}
              sx={{ mt: 1, mb: 1, ml: 2, mr: 2 }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ width: "auto" }}
          >
            <Grid item md={4}>
              <Autocomplete
                label="Account"
                autofocus
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ width: "90%", margin: "0 10px" }}
                options={state.accountsList && state.accountsList}
                getOptionLabel={(option) => option.account_name}
                id="account"
                name="account"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a Account"
                    inputProps={{
                      ...params.inputProps,
                      // autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    onChange={(e) => setSelectore(e.target.value)}
                    onSelect={(e) => setSelectore(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                sx={{ width: "90%", margin: "0 10px" }}
                required
                id="credit"
                label="Ammount Credit"
                type="number"
                name="credit"
                autoComplete="credit"
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                sx={{ width: "90%", margin: "0 10px" }}
                required
                name="date"
                label="Date"
                type="date"
                id="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                sx={{ width: "90%", margin: "0 10px", mt: 3, mb: 1 }}
                required
                name="description"
                label="Description"
                type="text"
                id="description"
              />
            </Grid>
            <Grid item md={4}>
              <FormControl
                sx={{ width: "90%", margin: "0 10px", mt: 3, mb: 1 }}
              >
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Add As
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="radio"
                  name="radio"
                  value={value}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="credit"
                    control={<Radio />}
                    label="Credit"
                  />
                  <FormControlLabel
                    value="debit"
                    control={<Radio />}
                    label="Debit"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 4, mb: 1, ml: 2, mr: 2 }}
              >
                Add Debit
              </Button>
            </Grid>
          </Grid>
        </Box>
        <form onSubmit={handleEditFormSubmit} style={{ width: "100%" }}>
          <BasicTable
            rows={list}
            editContactId={editContactId}
            editFormData={editFormData}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
            handleEditFormChange={handleEditFormChange}
            handleCancelClick={handleCancelClick}
            accountList={state.accountsList && state.accountsList}
          />
        </form>
      </Box>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  state: state,
});
export default connect(mapStateToProps, { accountList, addgeneralvoucher })(
  Credit
);
