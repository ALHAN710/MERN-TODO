import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TCredentials } from "../types/@userType";
export const Login = () => {
  const loginSchema = yup.object({
    email: yup.string().required("Email address is required").email(),
    password: yup.string().required("Password is required"),
  });
  const { handleSubmit, formState, control, setError } = useForm<TCredentials>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="flex min-h-[100vh]">
      <div className="max-w-[1440px] mx-auto self-center">
        <Grid container >
          <Grid
            item
            xs={12}
            
            className="flex flex-col mx-auto self-center"
          >
            <Card sx={{ my: 3 }} elevation={1} className="">
              <CardContent>
                <Grid container>
                  <Grid md={12} sx={{ mb: 3 }} item>
                    <h2 className="text-left">Sign In</h2>
                    <p className="text-left">Enter your email and password to login</p>
                  </Grid>
                  <Grid md={12} item></Grid>
                  <Grid xs={12} item></Grid>
                  <Grid xs={12} item></Grid>
                  <Grid xs={12} item></Grid>
                  <Grid xs={12} sx={{ mb: 4 }} item></Grid>
                  <Grid xs={12} sm={4} item></Grid>
                  <Grid xs={12} sm={4} item></Grid>
                  <Grid xs={12} sm={4} item></Grid>
                  <Grid xs={12} item></Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
