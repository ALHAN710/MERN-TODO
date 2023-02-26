import { TCredentials, TUser } from "../../types/@userType";
import { TUserModel } from "../../types/models/@user";
import { apiUsersSignInUrl, apiUsersSignUpUrl } from "../../utils/config";
import { CustomeError } from "../../utils/error";

type TMessageNotification = {
  toastMessage: string;
  alertMessage: string;
  success: boolean;
}
export type TResultSignIn = TMessageNotification & {
  token: string;
};

export type TResultSignUp = TMessageNotification & {
  id: string;
  email: string;
  token: string;
};

export const signIn = async (data: TCredentials): Promise<TResultSignIn> => {
  // console.log(data);
  try {
    // console.log("apiUsersSignInUrl", apiUsersSignInUrl);
    const response = await fetch(apiUsersSignInUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (response.ok) {
      
      const { token } = await response.json();
  
      return {
        token,
        toastMessage: "You're now connected 👌 !",
        alertMessage: "",
        success: true,
      };
    } else {
      const result = await response.json();
      const error = new CustomeError(
        response.status,
        result.errors[0]?.message,
        result.errors
      );
      console.log(result);
      // return Promise.reject(result);
      throw error;
    }

  } catch (error: any) {
    console.log(error);
    let toastMessage = "Something went wrong 🤔 !";
    let alertMessage = "Oops, Something went wrong, please try again later !";
    if (error.message) {
      switch (error.message) {
        case "Account disabled":
          console.log("======= Account disabled Error =========");
          toastMessage = "User Account disabled 😴 !";
          alertMessage =
            "Sorry, your account is disabled, please contact the administrator for more details !";
          break;

          case "Invalid credentials":
            toastMessage = "Incorrect User credentials 😪 !";
            alertMessage =
              "Your credentials are incorrect, please modify something and submit again !";
            
          default:
          break;
      }
    }
    
    return Promise.reject({
      toastMessage,
      alertMessage,
      success: false,
    });

  }
};

export const signUp = async (data: TUserModel): Promise<TResultSignUp> => {
  // console.log(data);
  try {
    // console.log("apiUsersSignUpUrl", apiUsersSignUpUrl);
    const response = await fetch(apiUsersSignUpUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (response.ok) {
      
      const result = await response.json();
  
      return {
        ...result,
        toastMessage: "You're now connected 👌 !",
        alertMessage: "",
        success: true,
      };
    } else {
      const result = await response.json();
      const error = new CustomeError(
        response.status,
        result.errors[0]?.message,
        result.errors
      );
      console.log(result);
      // return Promise.reject(result);
      throw error;
    }

  } catch (error: any) {
    console.log(error);
    let toastMessage = "Something went wrong 🤔 !";
    let alertMessage = "Oops, Something went wrong, please try again later !";
    /*if (error.message) {
      switch (error.message) {
        case "Account disabled":
          console.log("======= Account disabled Error =========");
          toastMessage = "User Account disabled 😴 !";
          alertMessage =
            "Sorry, your account is disabled, please contact the administrator for more details !";
          break;

          case "Invalid credentials":
            toastMessage = "Incorrect User credentials 😪 !";
            alertMessage =
              "Your credentials are incorrect, please modify something and submit again !";
            
          default:
          break;
      }
    }*/
    
    return Promise.reject({
      toastMessage,
      alertMessage,
      success: false,
    });

  }
};

