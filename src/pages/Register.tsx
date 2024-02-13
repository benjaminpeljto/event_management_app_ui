import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { type RegisterFormType } from "../utils/types";
import { useAuthDispatch, useAuthSelector } from "../store/hooks";
import { logout, registerUser } from "../store/auth-slice";
import { Id, toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  username: Yup.string().required("Username is required"),
  address: Yup.string().required("Address is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(12, "Password must be maximum 12 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .nullable()
    .required("Confirm of the entered password above is required"),
});

export default function Register() {
  const { loading, userToken, error, success } = useAuthSelector(
    (state) => state.auth
  );
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const toasterIdRef = useRef<Id>();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      address: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: RegisterFormType) => {
      dispatch(registerUser(values));
    },
  });

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      toasterIdRef.current = toast.loading("Please wait...", {
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
        toast.update(toasterIdRef.current, {
          render: "Registration successful.",
          type: "success",
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        toast.success("Please check your inbox.");
      }
      if (userToken) {
        navigate("/home");
      }
      navigate("/login");
    }
  }, [loading, error, success, userToken, navigate]);

  return (
    <>
      <Box width='40%' m='80px auto'>
        <Box textAlign='center'>
          <Typography variant='h2' mb={3} sx={{ fontWeight: "bold" }}>
            Register here
          </Typography>
          <Typography fontSize='0.9rem'>
            After sucessful register on <b>buyticket.ba</b>, you will recieve an
            email on the provided email address and you will need to confirm
            your email address by clicking on the link contained in the email.
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box mt={6} display='flex' flexDirection='column' alignItems='center'>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel
                    htmlFor='fname_reg_field'
                    sx={{ paddingRight: "8px" }}
                  >
                    First Name*
                  </InputLabel>
                  <OutlinedInput
                    id='fname_reg_field'
                    label='First Name'
                    name='firstName'
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                  />
                  <FormHelperText sx={{ fontSize: "0.7rem" }} error>
                    {formik.touched.firstName && formik.errors.firstName}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel
                    htmlFor='lname_reg_field'
                    sx={{ paddingRight: "8px" }}
                  >
                    Last Name*
                  </InputLabel>
                  <OutlinedInput
                    id='lname_reg_field'
                    label='Last Name'
                    name='lastName'
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                  />
                  <FormHelperText sx={{ fontSize: "0.7rem" }} error>
                    {formik.touched.lastName && formik.errors.lastName}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel
                htmlFor='username_reg_field'
                sx={{ paddingRight: "8px" }}
              >
                Username*
              </InputLabel>
              <OutlinedInput
                id='username_reg_field'
                label='Username'
                name='username'
                onChange={formik.handleChange}
                value={formik.values.username}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
              />
              <FormHelperText error sx={{ fontSize: "0.7rem" }}>
                {formik.touched.username && formik.errors.username}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel
                htmlFor='address_reg_field'
                sx={{ paddingRight: "8px" }}
              >
                Address*
              </InputLabel>
              <OutlinedInput
                id='address_reg_field'
                label='Address'
                name='address'
                onChange={formik.handleChange}
                value={formik.values.address}
                error={formik.touched.address && Boolean(formik.errors.address)}
              />
              <FormHelperText error sx={{ fontSize: "0.7rem" }}>
                {formik.touched.address && formik.errors.address}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel
                htmlFor='email_reg_field'
                sx={{ paddingRight: "8px" }}
              >
                Email*
              </InputLabel>
              <OutlinedInput
                id='email_reg_field'
                label='Email'
                type='email'
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
                htmlFor='password_reg_field'
                sx={{ paddingRight: "8px" }}
              >
                Password*
              </InputLabel>
              <OutlinedInput
                id='password_reg_field'
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
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel
                htmlFor='confirm_password_reg_field'
                sx={{ paddingRight: "8px" }}
              >
                Confirm Password*
              </InputLabel>
              <OutlinedInput
                id='confirm_password_reg_field'
                label='Confirm Password'
                type='password'
                name='confirmPassword'
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
              />
              <FormHelperText error sx={{ fontSize: "0.7rem" }}>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword}
              </FormHelperText>
            </FormControl>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='large'
            >
              Register
            </Button>
          </Box>
        </form>
        <Box mt={4} textAlign='center'>
          <Typography variant='h6'>
            Already have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
            .
          </Typography>
        </Box>
      </Box>
    </>
  );
}
