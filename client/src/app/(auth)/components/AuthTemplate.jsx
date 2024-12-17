import { Container, Typography, Paper } from "@mui/material";
import AuthForm from "./AuthForm";

const AuthTemplate = ({ login, fields }) => {
  return (
    <Container component="main" maxWidth="xs" className="mb-6">
      <Paper elevation={3} className="mt-8 p-4 flex flex-col items-center">
        <Typography component="h1" variant="h5" className="mb-3">
          {login ? "Sign In" : "Create Account"}
        </Typography>

        <AuthForm login={login} fields={fields} />
      </Paper>
    </Container>
  );
};

export default AuthTemplate;
