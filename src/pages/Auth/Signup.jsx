import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "../../components/common/Theme";
import { ToastContainer, toast } from "react-toastify";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CopyRightFooter from "../../components/common/CoyRightFooter";
import { Grid, Link } from "@mui/material";
import { connect } from "react-redux";
import { signup } from "../../redux-implementation/actions";

function Signup({ signup, isAuthenticated, error }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      data.get("username") === "" ||
      data.get("email") === "" ||
      data.get("password") === "" ||
      data.get("cpassword") === ""
    ) {
      toast.error("Sorry Please Fill All The Fields");
    } else if (data.get("password") !== data.get("cpassword")) {
      toast.warning("Please entre both passwords same.");
    } else {
      toast.success("You are all done.");
      signup(
        data.get("email"),
        data.get("username"),
        data.get("password")
      );
    }
  };

  return (
    <ThemeProvider theme={Theme}>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
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
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              type="text"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="cpassword"
              label="Confirm Password"
              type="password"
              id="cpassword"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="forget-password" variant="body1">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signin" variant="body2">
                  {"Have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <CopyRightFooter sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  error: state.error,
});
export default connect(mapStateToProps, { signup })(Signup);
