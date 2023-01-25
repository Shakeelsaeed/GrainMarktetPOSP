import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "react-toastify/dist/ReactToastify.css";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "../common/Theme";
import { ToastContainer, toast } from "react-toastify";
import { Autocomplete, Grid } from "@mui/material";
import { connect } from "react-redux";
import {
  accountList,
  addwheatpurchase,
} from "../../redux-implementation/actions";

function AddWheatPurchaseForm({ state, accountList, addwheatpurchase }) {
  React.useEffect(() => {
    accountList();
  }, [accountList]);

  const [bouri, setBouri] = React.useState(0);
  const [thela, setThela] = React.useState(0);
  const [firstweight, setFirstWeight] = React.useState(0);
  const [kat, setKat] = React.useState(0);
  const [netweight, setNetWeight] = React.useState(0);

  const calculateNetWeight = () => {
    if (firstweight !== 0 && kat !== 0) {
      // setNetWeight(firstweight-kat);
      return firstweight - kat;
    } else {
      return firstweight;
    }
  };

  const [purchaseAmmount, setPurchaseAmmount] = React.useState(0);
  const [barDana, setBarDana] = React.useState(0);
  const [vehicalRent, setVehicalRent] = React.useState(0);
  const [totalAmmount, setTotalAmmount] = React.useState(0);
  const [netAmmount, setNetAmmount] = React.useState(0);

  function getTotalAmmount() {
    if (purchaseAmmount !== 0) {
      const perkg = purchaseAmmount / 40;
      const weight = calculateNetWeight();
      // setTotalAmmount(perkg * weight);
      return perkg * weight;
    } else {
      // setTotalAmmount(0);
      return 0;
    }
  }

  function getNetAmmount() {
    if (purchaseAmmount !== 0 && barDana !== 0 && vehicalRent !== 0) {
      // setNetAmmount(totalAmmount - (vehicalRent - barDana));
      return getTotalAmmount() - (vehicalRent - barDana);
    } else {
      // setNetAmmount(totalAmmount);
      return totalAmmount;
    }
  }

  const [purchaser, setPurchaser] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [product, setProduct] = React.useState("Wheat");
  // function getCurrentbalance() {
  //   let x;
  //   credit !== 0 || debit !== 0 ? (x = debit - credit) : (x = 0);
  //   return x;
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setNetAmmount(getNetAmmount());
    setTotalAmmount(getTotalAmmount());
    setNetWeight(calculateNetWeight());

    addwheatpurchase(
      purchaser,
      bouri,
      thela,
      data.get("date"),
      data.get("phone"),
      data.get("vehical"),
      firstweight,
      kat,
      product,
      purchaseAmmount,
      parseInt(getTotalAmmount()),
      company,
      calculateNetWeight(),
      barDana,
      vehicalRent,
      parseInt(getNetAmmount())
    );
    toast.success("All Done");
  };

  return (
    <ThemeProvider theme={Theme}>
      <ToastContainer />
      <Container>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Purchase Wheat</h2>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6} md={6}>
                <TextField
                  required
                  fullWidth
                  id="date"
                  label="Select Date"
                  type="date"
                  name="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <Autocomplete
                  required
                  id="purchaser"
                  label="Purchaser Name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: "auto" }}
                  options={state.accountsList && state.accountsList}
                  autoHighlight
                  getOptionLabel={(option) => option.account_name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Purchaser Name"
                      inputProps={{
                        ...params.inputProps,
                        // autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                      onChange={(e) => setPurchaser(e.target.value)}
                      onSelect={(e) => setPurchaser(e.target.value)}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ mt: 1 }}
            >
              <Grid item xs={6} md={4}>
                <Autocomplete
                  id="company"
                  required
                  label="Company Name"
                  sx={{ width: "auto" }}
                  options={state.accountsList && state.accountsList}
                  autoHighlight
                  getOptionLabel={(option) => option.account_name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Company Name"
                      inputProps={{
                        ...params.inputProps,
                        // autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                      onChange={(e) => setCompany(e.target.value)}
                      onSelect={(e) => setCompany(e.target.value)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  type="text"
                  id="phone"
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  fullWidth
                  name="product"
                  label="Product Name"
                  type="text"
                  id="product"
                  value={product}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6} md={2}>
                <TextField
                  required
                  margin="normal"
                  name="bouri"
                  label="Bouri"
                  type="number"
                  id="bouri"
                  value={bouri}
                  onChange={(e) => setBouri(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  margin="normal"
                  required
                  name="thela"
                  label="Thela"
                  type="number"
                  id="thela"
                  value={thela}
                  onChange={(e) => setThela(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  margin="normal"
                  required
                  name="weight"
                  label="1st Weight"
                  type="number"
                  id="weight"
                  value={firstweight}
                  onChange={(e) => setFirstWeight(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  margin="normal"
                  required
                  name="kat"
                  label="Kat"
                  type="number"
                  id="kat"
                  value={kat}
                  onChange={(e) => setKat(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  margin="normal"
                  required
                  name="netweight"
                  label="Net Weight"
                  type="number"
                  id="netweight"
                  value={calculateNetWeight()}
                  disabled
                  onChange={(e) => setNetWeight(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  margin="normal"
                  required
                  name="purchase"
                  label="Purchase Ammount"
                  type="number"
                  id="purchase"
                  value={purchaseAmmount}
                  onChange={(e) => setPurchaseAmmount(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6} md={2}>
                <TextField
                  margin="normal"
                  required
                  name="bardana"
                  label="BarDana Rs."
                  type="number"
                  id="bardana"
                  value={barDana}
                  onChange={(e) => setBarDana(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  margin="normal"
                  required
                  name="totalammount"
                  label="Total Amount"
                  type="number"
                  id="totalammount"
                  disabled
                  value={getTotalAmmount()}
                  onChange={(e) => setTotalAmmount(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  margin="normal"
                  name="rent"
                  label="Vehical Rent"
                  type="number"
                  id="rent"
                  value={vehicalRent}
                  onChange={(e) => setVehicalRent(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  margin="normal"
                  name="vehical"
                  label="Vehical Number"
                  type="text"
                  id="vehical"
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  margin="normal"
                  name="netammount"
                  label="Net Ammount"
                  type="number"
                  id="netammount"
                  aria-readonly
                  value={getNetAmmount()}
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
export default connect(mapStateToProps, { accountList, addwheatpurchase })(
  AddWheatPurchaseForm
);
