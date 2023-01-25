import * as React from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import "react-toastify/dist/ReactToastify.css";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import EnhancedTable from "../DataTables/Groups/DataTables";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "../../components/common/Theme";
import { ToastContainer, toast } from "react-toastify";
import { addgroup } from "../../redux-implementation/actions";
import { useNavigate } from "react-router-dom";
import GroupsList from "../DataTables/Groups/GroupsList";

function AddGroupForm({ addgroup }) {
  const [selectore] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("group", selectore);

    
    if (data.get("group") === "") {
      toast.error("Add group Please");
    } else {
      addgroup(data.get("group"));
      toast.success("Group Added Success Fully");
      navigate("/accounts/add-groups");
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
              id="group"
              label="Group Name"
              type="text"
              name="group"
              autoComplete="group"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Group
            </Button>
          </Box>
        </Box>
      </Container>
      <GroupsList />
    </ThemeProvider>
  );
}
const mapStateToProps = (state) => ({
  state: state,
});
export default connect(mapStateToProps, { addgroup })(AddGroupForm);
