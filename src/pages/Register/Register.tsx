import React, { useContext, useState } from "react";
import { Formik } from "formik";
import { ToastContainer } from "react-toastify";
import { showToastError, showToastSuccess } from "../../utils/ShowToast";
import { Link, useNavigate } from "react-router-dom";
import { registerValidationSchema } from "../../utils/validationSchema";
import { registerType } from "../../types/Auth.types";
import GlobalContext from "../../context/globalContext";

const Register: React.FC = () => {
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);

  const initialValues = { email: "", password: "", mobile: "" };

  const registerHandler = async (values: registerType): Promise<void> => {
    const userData = {
      email: values.email,
      password: values.password,
      mobile: values.mobile,
    };

    await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) {
          setIsFormSubmit(false);
          showToastError("اطلاعات از قبل وجود دارد، مجددا تلاش نمایید");
        } else {
          return res.json();
        }
      })
      .then((result) => {
        setIsFormSubmit(false);
        showToastSuccess("با موفقیت ثبت نام شدید");
        setTimeout(() => {
          navigate("/");
        }, 1000);
        globalContext.login(result.user, result.accessToken);
      });
  };

  return (
    <div className="container max-w-md mx-auto text-center my-20 border border-1 border-gray-300 rounded-2xl px-12 pt-10 pb-14 bg-white dark:bg-slate-800 dark:border-gray-700">
      <ToastContainer limit={1} />
      <Link to="/">
        {/* logo */}
        <svg className="h-6 w-auto m-auto mb-8" viewBox="0 0 256 150">
          <defs>
            <linearGradient id="logosMeilisearch0" x1="153.821%" x2="19.172%" y1="-7.638%" y2="89.239%">
              <stop offset="0%" stopColor="#ff5caa"></stop>
              <stop offset="100%" stopColor="#ff4e62"></stop>
            </linearGradient>
            <linearGradient id="logosMeilisearch1" x1="117.325%" x2="-17.323%" y1="-7.638%" y2="89.238%">
              <stop offset="0%" stopColor="#ff5caa"></stop>
              <stop offset="100%" stopColor="#ff4e62"></stop>
            </linearGradient>
            <linearGradient id="logosMeilisearch2" x1="80.828%" x2="-53.821%" y1="-7.638%" y2="89.238%">
              <stop offset="0%" stopColor="#ff5caa"></stop>
              <stop offset="100%" stopColor="#ff4e62"></stop>
            </linearGradient>
          </defs>
          <path fill="url(#logosMeilisearch0)" d="M0 149.288L47.297 28.277A44.462 44.462 0 0 1 88.708 0h28.515L69.926 121.012a44.462 44.462 0 0 1-41.411 28.276z"></path>
          <path fill="url(#logosMeilisearch1)" d="m69.386 149.289l47.297-121.012A44.462 44.462 0 0 1 158.095 0h28.514l-47.297 121.012a44.462 44.462 0 0 1-41.411 28.277z"></path>
          <path fill="url(#logosMeilisearch2)" d="m138.777 149.289l47.297-121.012A44.46 44.46 0 0 1 227.484 0H256l-47.297 121.012a44.463 44.463 0 0 1-41.412 28.277z"></path>
        </svg>
      </Link>
      <div className="text-2xl font-bold text-right text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-sky-400">
        ثبت نام
        <p className="mt-1 text-sm font-normal text-gray-500">اطلاعات خواسته شده را تکمیل نمایید.</p>
      </div>
      <div className="text-right">
        <Formik
          validationSchema={registerValidationSchema}
          initialValues={initialValues}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={(values) => {
            setIsFormSubmit(true);
            registerHandler(values);
          }}
        >
          {(props) => {
            return (
              <form onSubmit={props.handleSubmit} className="mx-auto mt-8 w-full">
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    ایمیل
                  </label>
                  <input
                    className={`border ${
                      props.touched.email && Boolean(props.errors.email) && "border-red-500 dark:border-red-500"
                    } border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-gray-50 focus:border-gray-50 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-500 dark:text-gray-300`}
                    type="string"
                    id="email"
                    {...props.getFieldProps("email")}
                  />
                  {props.touched.email && props.errors.email && <div className="invalid-feedback mt-1 text-sm font-light text-red-500">{props.errors.email}</div>}
                </div>
                <div className="mb-4">
                  <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    موبایل
                  </label>
                  <input
                    className={`border ${
                      props.touched.mobile && Boolean(props.errors.mobile) && "border-red-500 dark:border-red-500"
                    } border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-gray-50 focus:border-gray-50 block w-full p-2.5  dark:bg-slate-700 dark:border-slate-500 dark:text-gray-300`}
                    type="text"
                    id="mobile"
                    {...props.getFieldProps("mobile")}
                  />
                  {props.touched.mobile && props.errors.mobile && <div className="invalid-feedback mt-1 text-sm font-light text-red-500">{props.errors.mobile}</div>}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    کلمه عبور
                  </label>
                  <input
                    className={`border ${
                      props.touched.password && Boolean(props.errors.password) && "border-red-500 dark:border-red-500"
                    } border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-gray-50 focus:border-gray-50 block w-full p-2.5  dark:bg-slate-700 dark:border-slate-500 dark:text-gray-300`}
                    type="text"
                    id="password"
                    {...props.getFieldProps("password")}
                  />
                  {props.touched.password && props.errors.password && <div className="invalid-feedback mt-1 text-sm font-light text-red-500">{props.errors.password}</div>}
                </div>
                <div className="text-center mt-10">
                  {isFormSubmit ? (
                    <button
                      disabled
                      type="button"
                      className="text-white bg-gradient-to-br from-green-400 to-green-600 focus:ring-4 focus:ring-green-200 dark:text-slate-900 dark:focus:ring-slate-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center"
                    >
                      <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      تاييد ...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      id="submit-button"
                      className="text-white bg-gradient-to-br from-green-400 to-green-600 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-green-200 rounded-lg text-sm px-10 py-2 dark:text-slate-900 dark:focus:ring-slate-500"
                    >
                      تایید
                    </button>
                  )}
                </div>
                <div className="text-center mt-8">
                  <Link to={"/register"} className="text-gray-900 dark:text-gray-400">
                    قبلا ثبت نام کرده اید؟{" "}
                  </Link>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
