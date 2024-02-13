import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthDispatch, useAuthSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { LoginFormType } from "../utils/types";
import { useEffect, useRef } from "react";
import { Id, toast } from "react-toastify";
import { loginUser } from "../store/auth-slice";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email/Username is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(12, "Password must be maximum 12 characters long")
    .required("Password is required"),
});

const Login = () => {
  const { loading, userToken, error, success, userType } = useAuthSelector(
    (state) => state.auth
  );
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const toasterIdRef = useRef<Id>();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: LoginFormType) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (loading) {
      toasterIdRef.current = toast.loading("Logging you in...", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else if (error) {
      if (toasterIdRef.current) {
        toast.update(toasterIdRef.current, {
          render: `${error}`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } else if (success) {
      if (toasterIdRef.current) {
        if (userType === "ADMIN") {
          toast.update(toasterIdRef.current, {
            render: "Welcome ADMIN",
            type: "success",
            isLoading: false,
            autoClose: 300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        } else if (userType === "ORGANIZER") {
          toast.update(toasterIdRef.current, {
            render: "Welcome ORGANIZER",
            type: "success",
            isLoading: false,
            autoClose: 300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        } else {
          toast.update(toasterIdRef.current, {
            render: "Login successful.",
            type: "success",
            isLoading: false,
            autoClose: 300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      }
      if (userToken) {
        if (userType === "ADMIN") {
          navigate("/admin");
        } else if (userType === "ORGANIZER") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    }
  }, [loading, error, success, userToken, navigate, userType]);

  return (
    <>
      <Box width='40%' m='80px auto'>
        <Box textAlign='center'>
          <Typography variant='h2' mb={3} sx={{ fontWeight: "bold" }}>
            Login here
          </Typography>
          <Typography fontSize='0.9rem'>
            After sucessful register on <b>buyticket.ba</b>, you will recieve an
            email on the provided email address and you will need to confirm
            your email address by clicking on the link contained in the email.
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box mt={6} display='flex' flexDirection='column' alignItems='center'>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel
                htmlFor='emailUsername_login_field'
                sx={{ paddingRight: "20px" }}
              >
                Email/Username*
              </InputLabel>
              <OutlinedInput
                id='emailUsername_login_field'
                label='Email/Username'
                name='email'
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
              <FormHelperText error sx={{ fontSize: "0.7rem" }}>
                {formik.touched.email && formik.errors.email}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel
                htmlFor='password_login_field'
                sx={{ paddingRight: "8px" }}
              >
                Password*
              </InputLabel>
              <OutlinedInput
                id='password_login_field'
                label='Password'
                type='password'
                name='password'
                onChange={formik.handleChange}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              />
              <FormHelperText error sx={{ fontSize: "0.7rem" }}>
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
            </FormControl>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='large'
            >
              Login
            </Button>
          </Box>
        </form>
        <Box mt={4} textAlign='center'>
          <Typography variant='h6'>
            Don't have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
            .
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Login;
