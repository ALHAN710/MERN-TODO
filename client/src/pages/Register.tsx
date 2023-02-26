import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiUsersSignUpUrl, signIn, todosPath } from "../utils/config";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { create } from "../services/api/crud";
import { toast } from "react-toastify";
import { TUserModel } from "../types/models/@user";
import { signUp, TResultSignUp } from "../services/auth/auth";
import Input from "../components/bootstrap/Input";

const registerSchema = yup.object({
  firstName: yup
    .string()
    .min(3, "The first name must be at least 3 caracters !")
    .required("The first name is required !"),
  lastName: yup
    .string()
    .min(3, "The last name must be at least 3 caracters !")
    .required("The last name is required !"),
  email: yup
    .string()
    .email("Invalid format address email !")
    .required("The address email is required !"),
  password: yup
    .string()
    .min(8, "The password must be at least 8 characters")
    .required("The password is required !"),
  confirmPassword: yup
    .string()
    .test(
      "password-match",
      "The confirmation password don't match with the password",
      function (value) {
        return this.parent.password === value;
      }
    ),
});

type FormData = yup.InferType<typeof registerSchema>;

const defaultValues = {
  firstName: "Pascal",
  lastName: "ALHADOUM",
  email: "alhadoumpascal@gmail.com",
  password: "password",
  confirmPassword: "password",
};

export const Register = () => {
  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(registerSchema),
  });

  React.useEffect(() => {
    window.document.body.classList.add("form");

    return () => {
      window.document.body.classList.remove("form");
      reset(defaultValues);
    };
  }, []);

  // React router dom navigate hook for changing the url location
  const navigate = useNavigate();

  // Using to get the origin url location if it exists to redirect after login successfull
  const location = useLocation();

  // ========= React Query Mutation Initialize for create user =========
  const registerMutation = useMutation({
    mutationFn: async (createUser: TUserModel) => {
      return await signUp(createUser);
    },
    onMutate: (createUser: TUserModel) => {
      console.log("============== START onMutate Creating ==============");
    },
    onError: (err, _, context) => {
      // console.log("onError register User Mutation");

      toast.error("Failed to register the user. 😭");
    },
    onSuccess: (data: TResultSignUp) => {
      // Display a toast success connexion message
      toast.success("Successfully registering the user ! 😃");
      toast.info(data.toastMessage);

      // Store the token and expiration time in the local storage
      window.localStorage.setItem("authToken", data.token);

      //Redirect to the origin or tasks page
      const origin = location.state?.from?.pathname || todosPath;
      const url = origin !== signIn ? origin : todosPath;
      console.log(url);
      navigate(url);
    },
  });

  const onSubmit = React.useCallback(async (data: FormData) => {
    try {
      const createUser = { ...data };
      delete createUser.confirmPassword;

      console.log("Register user", createUser);
      await registerMutation.mutateAsync(createUser);
    } catch (e) {}
  }, []);

  return (
    <div className="auth-container d-flex">
      <div className="container mx-auto align-self-center">
        <div className="row">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center mx-auto">
            <div className="card mt-3 mb-3">
              <div className="card-body">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  
                >
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <h2>Sign Up</h2>
                      <p>Enter your email and password to register</p>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <Input
                          type={"text"}
                          name_="firstName"
                          formState={formState}
                          register={register}
                          label={"First Name"}
                          className="add-billing-address-input"
                        />
                        {/* <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control add-billing-address-input"
                        /> */}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <Input
                          type={"text"}
                          name_="lastName"
                          formState={formState}
                          register={register}
                          label={"Last Name"}
                          className="add-billing-address-input"
                        />
                        {/* <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control add-billing-address-input"
                        /> */}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <Input
                          type={"email"}
                          name_="email"
                          formState={formState}
                          register={register}
                          label={"Email"}
                        />
                        {/* <label className="form-label">Email</label>
                        <input type="email" className="form-control" /> */}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <Input
                          type={"password"}
                          name_="password"
                          formState={formState}
                          register={register}
                          label={"Password"}
                        />
                        {/* <label className="form-label">Password</label>
                        <input type="password" className="form-control" /> */}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                      <Input
                          type={"password"}
                          name_="confirmPassword"
                          formState={formState}
                          register={register}
                          label={"Confirm Password"}
                        />
                        {/* <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" /> */}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="my-4">
                        <button
                          className="btn btn-secondary w-100"
                          type={"submit"}
                        >
                          <span
                            className={`spinner-border text-white me-2 align-self-center loader-sm ${
                              !formState.isSubmitting ? "d-none" : ""
                            }`}
                          ></span> Sign Up !
                        </button>
                      </div>
                    </div>

                    {/* <div className="col-12 mb-4">
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

                    <div className="col-sm-4 col-12">
                      <div className="mb-4">
                        <button className="btn  btn-social-login w-100 ">
                          <img
                            src="/img/google-gmail.svg"
                            alt=""
                            className="img-fluid"
                          />
                          <span className="btn-text-inner">Google</span>
                        </button>
                      </div>
                    </div>

                    <div className="col-sm-4 col-12">
                      <div className="mb-4">
                        <button className="btn  btn-social-login w-100">
                          <img
                            src="/img/github-icon.svg"
                            alt=""
                            className="img-fluid"
                          />
                          <span className="btn-text-inner">Github</span>
                        </button>
                      </div>
                    </div>

                    <div className="col-sm-4 col-12">
                      <div className="mb-4">
                        <button className="btn  btn-social-login w-100">
                          <img
                            src="/img/twitter.svg"
                            alt=""
                            className="img-fluid"
                          />
                          <span className="btn-text-inner">Twitter</span>
                        </button>
                      </div>
                    </div> */}

                    <div className="col-12">
                      <div className="text-center">
                        <p className="mb-0">
                          Already have an account ?{" "}
                          <Link to={signIn} className="text-warning">
                            Sign in
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
      </div>
    </div>
  );
};
