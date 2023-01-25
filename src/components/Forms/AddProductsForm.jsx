import * as React from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import "react-toastify/dist/ReactToastify.css";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "../../components/common/Theme";
import { ToastContainer, toast } from "react-toastify";
import { addtypesofproducts } from "../../redux-implementation/actions";

function addtypesofproductsForm({ addtypesofproducts }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("name") === "") {
      toast.error("You Are Not Good to Go");
    } else {
      toast.success("You Are Good to Go");
      addtypesofproducts(data.get("name"));
    }
  };

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
              label="Product Name"
              type="text"
              name="name"
              autoComplete="product"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Product
            </Button>
          </Box>
        </Box>
      </Container>
      {/* <EnhancedTable /> */}
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  state: state,
});

export default connect(mapStateToProps, { addtypesofproducts })(addtypesofproductsForm);
