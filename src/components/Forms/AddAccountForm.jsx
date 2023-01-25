import * as React from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "react-toastify/dist/ReactToastify.css";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Autocomplete, Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "../../components/common/Theme";
import { ToastContainer, toast } from "react-toastify";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { addaccount, groupList } from "../../redux-implementation/actions";

function AddAccountForm({ addaccount, state, groupList }) {
  React.useMemo(() => {
    groupList();
  }, [groupList]);
  console.log(state.groupsList);

  const [credit, setCredit] = React.useState(0);
  const [debit, setDebit] = React.useState(0);
  const [selectore, setSelectore] = React.useState("");
  function getCurrentbalance() {
    let x;
    credit !== 0 || debit !== 0 ? (x = debit - credit) : (x = 0);
    return x;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("group", selectore);

    const body = JSON.stringify({
      name: data.get("name"),
      group: data.get("group"),
      phone: data.get("phone"),
    });
    if (
      data.get("name") === "" ||
      data.get("group") === "" ||
      data.get("phone") === ""
    ) {
      toast.error(body);
    } else {
      toast.success(body);
      const group = state.groupsList.filter(
        (group) => group.name === data.get("group")
      );
      const groupid = group[0].group_id;
      addaccount(data.get("name"), groupid, data.get("phone"));
    }
  };

  function addaccountgroup(list) {}

  return (
    <ThemeProvider theme={Theme}>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Account Name"
              type="text"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              style={{ alignItems: "center" }}
            >
              <Grid item xs={6} md={10}>
                <Autocomplete
                  label="Group"
                  sx={{ width: "auto" }}
                  options={state.groupsList && state.groupsList}
                  getOptionLabel={(option) => option.name}
                  id="group"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a Group"
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
              <Grid item xs={6} md={1}>
                <Link to="/accounts/add-groups/" style={{ color: "#00A619" }}>
                  <AddCircleIcon />
                </Link>
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone Number"
              type="text"
              id="phone"
            />

            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6} md={4}>
                <p>Opening Balance: {getCurrentbalance()}</p>
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  margin="normal"
                  name="credit"
                  label="Opening Balance"
                  type="number"
                  id="credit"
                  // value={openi}
                  disabled
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Account
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  state: state,
});
export default connect(mapStateToProps, { addaccount, groupList })(
  AddAccountForm
);
