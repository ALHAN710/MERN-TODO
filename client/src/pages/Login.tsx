import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TCredentials } from "../types/@userType";
import "../assets/css/light/authentication/auth-boxed.css";
import "../assets/css/dark/authentication/auth-boxed.css";
import Input from "../components/bootstrap/Input";
import DarkModeBtn from "../components/bootstrap/DarkModeBtn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as config from "../utils/config";
import { signIn } from "../services/auth/auth";
import { toast } from "react-toastify";
import AlertNotification from "../components/bootstrap/AlertNotification";
import { TResultSignIn } from "../services/auth/auth";
import Footer from "../components/bootstrap/Footer";

export const Login = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const loginSchema = yup.object({
    email: yup
      .string()
      .required("Email address is required")
      .email("Email address must be a valid email"),
    password: yup.string().required("Password is required"),
  });

  React.useEffect(() => {
    if (!window.document.body.classList.contains("form")) {
      // window.document.body.classList.add("form");
    }

    return () => {
      window.document.body.classList.remove("form");
    };
  }, []);

  const { handleSubmit, formState, register, setError } = useForm<TCredentials>(
    {
      defaultValues: {
        email: "demo@mern-todolist.com",
        password: "password",
      },
      resolver: yupResolver(loginSchema),
    }
  );

  // console.log("isSubmitting", formState.isSubmitting);

  // React router dom navigate hook for changing the url location
  const navigate = useNavigate();

  // Using to get the origin url location if it exists to redirect after login successfull
  const location = useLocation();

  const loginMutation = useMutation({
    mutationFn: signIn /*async (credentials: TCredentials) => {
      console.log('loginMutation');
      return await signIn(credentials);
    },*/,
    onSuccess: (data: TResultSignIn, variables, _) => {
      const token = data.token;

      // Store the token and expiration time in the local storage
      window.localStorage.setItem("authToken", token);
      // window.localStorage.setItem("authExp", exp!);

      // Display a toast success connexion message
      toast.success(data.toastMessage);

      //Redirect to the origin or tasks page
      const origin = location.state?.from?.pathname || config.todosPath;
      const url = origin !== config.signIn ? origin : config.todosPath;
      console.log(url);
      navigate(url);
    },
    onError: (error: any, variables, context) => {
      console.log("========= onError ==========");
      // const err = JSON.parse(error);
      const err = error;
      console.log(err);
      // Switch On the alert notification
      setOpen(true);
      // Set the alert notification message
      setMessage(error.alertMessage);
      // Display a toast error connexion message
      toast.error(error.toastMessage);
      return Promise.reject(error);
    },
  });

  const onSubmit = React.useCallback(async (data: TCredentials) => {
    setOpen(false);
    console.log(data);
    try {
      await loginMutation.mutateAsync(data);
    } catch (error) {}
  }, []);

  return (
    <div className="auth-container d-flex flex-col">
      <div className="container mx-auto align-self-center">
        <div className="row">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center mx-auto">
            <div className="card mt-3 mb-3">
              <div className="card-body">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className={`needs-validation ${
                    Object.keys(formState.errors).length > 0
                      ? "was-validated"
                      : ""
                  }`}
                  noValidate
                >
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="flex justify-between">
                        <h2>Sign In</h2>
                        <div className="md:hidden">
                          <DarkModeBtn />
                        </div>
                      </div>
                      <p>Enter your email and password to login</p>
                      <AlertNotification
                        color={`danger`}
                        open={open}
                        setOpen={setOpen}
                        message={message}
                      />
                    </div>

                    <div className="col-md-12">
                      <div className="mb-3">
                        <Input<TCredentials>
                          type={"email"}
                          name_="email"
                          formState={formState}
                          register={register}
                          label={"Email address"}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-4">
                        <Input<TCredentials>
                          type={"password"}
                          name_={"password"}
                          label={"Password"}
                          register={register}
                          formState={formState}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="my-4">
                        <button
                          className="btn btn-secondary w-100 flex justify-center items-center gap-[2px]"
                          type={"submit"}
                        >
                          <div
                            className={`spinner-border text-white me-2 align-self-center loader-sm ${
                              !formState.isSubmitting ? "d-none" : ""
                            }`}
                          ></div>{" "}
                          <span>Sign In !</span>
                        </button>
                      </div>
                    </div>

                    <div className="col-12 mb-4">
                      <div className="">
                        <div className="seperator">
                          <hr />
                          <div className="seperator-text">
                            {" "}
                            <span>Or continue with</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-6 col-12">
                      <div className="mb-4">
                        <button className="btn btn-social-login w-100" type="button">
                          <img
                            src="/img/google-gmail.svg"
                            alt="google-gmail signin icon"
                            className="img-fluid"
                          />
                          <span className="btn-text-inner">Google</span>
                        </button>
                      </div>
                    </div>

                    {/* <div className="col-sm-4 col-12">
                                          <div className="mb-4">
                                              <button className="btn  btn-social-login w-100">
                                                  <img src="/img/github-icon.svg" alt="github signin icon" className="img-fluid" />
                                                  <span className="btn-text-inner">Github</span>
                                              </button>
                                          </div>
                                      </div> */}

                    <div className="col-sm-6 col-12">
                      <div className="mb-4">
                        <button className="btn  btn-social-login w-100" type="button">
                          <img
                            src="/img/twitter.svg"
                            alt="twitter signin icon"
                            className="img-fluid"
                          />
                          <span className="btn-text-inner">Twitter</span>
                        </button>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="text-center">
                        <p className="mb-0">
                          Dont't have an account ?{" "}
                          <Link to={config.signUp} className="text-warning">
                            Sign Up
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* <!--  BEGIN FOOTER  --> */}
        {/* <Footer /> */}
        {/* <!--  END FOOTER  --> */}
      </div>
    </div>
  );
};
