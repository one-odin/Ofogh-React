import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import GlobalContext from "../../context/globalContext";
import { Formik } from "formik";
import { ToastContainer } from "react-toastify";
import { showToastError, showToastSuccess } from "../../utils/ShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { adValidationSchema } from "../../utils/validationSchema";
import { adPropsTypes, adTypes } from "../../types/adTypes";
import SelectMapModalEdit from "../../components/SelectMapModalEdit/SelectMapModalEdit";

const AdEdit: React.FC = () => {
  const [adDetail, setAdDetail] = useState<adPropsTypes>();
  const [showErrorLocation, setShowErrorLocation] = useState<boolean>(false);
  const [lat, setLat] = useState<string>("");
  const [lng, setLng] = useState<string>("");
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  const globalContext = useContext(GlobalContext);
  const navigate = useNavigate();
  const adID = useParams();

  useEffect(() => {
    if (!globalContext.isLoggedIn) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/ads/${adID.id}`)
      .then((res) => res.json())
      .then((data) => {
        setAdDetail(data);
        setLat(data.lat);
        setLng(data.lng);
      });
  }, [adID]);

  let initialValues = { title: "", address: "", description: "" };
  if (adDetail) {
    initialValues = { title: adDetail.title, address: adDetail.address, description: adDetail.description };
  }

  const editHandler = async (values: adTypes): Promise<void> => {
    const newData = {
      title: values.title,
      address: values.address,
      description: values.description,
      lat: lat,
      lng: lng,
      mobile: globalContext.userInfo?.mobile,
    };

    await fetch(`http://localhost:3000/ads/${adID.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    }).then((res) => {
      if (!res.ok) {
        setIsFormSubmit(false);
        showToastError("ارسال با خطا مواجه شد، مجددا تلاش نمایید");
      } else {
        setIsFormSubmit(false);
        showToastSuccess("با موفقیت ثبت گردید");
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      }
    });
  };

  return (
    <>
      <Header />
      <div className="container max-w-md mx-auto text-center my-20 border border-1 border-gray-300 rounded-2xl px-12 pt-10 pb-14 bg-white dark:bg-slate-800 dark:border-gray-700">
        <ToastContainer limit={1} />
        <div className="text-2xl font-bold text-right text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-sky-400">
          ویرایش آگهی
          <p className="mt-1 text-sm font-normal text-gray-500">اطلاعات خواسته شده را تکمیل نمایید.</p>
        </div>
        <div className="text-right">
          <Formik
            validationSchema={adValidationSchema}
            initialValues={initialValues}
            enableReinitialize
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values) => {
              if (lat.length == 0) {
                setShowErrorLocation(true);
              } else {
                setIsFormSubmit(true);
                editHandler(values);
              }
            }}
          >
            {(props) => {
              return (
                <form onSubmit={props.handleSubmit} className="mx-auto mt-8 w-full">
                  <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      عنوان
                    </label>
                    <input
                      className={`border ${
                        props.touched.title && Boolean(props.errors.title) && "border-red-500 dark:border-red-500"
                      } border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-gray-50 focus:border-gray-50 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-500 dark:text-gray-300`}
                      type="string"
                      id="title"
                      {...props.getFieldProps("title")}
                    />
                    {props.touched.title && props.errors.title && <div className="invalid-feedback mt-1 text-sm font-light text-red-500">{props.errors.title}</div>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      آدرس
                    </label>
                    <textarea
                      className={`border ${
                        props.touched.address && Boolean(props.errors.address) && "border-red-500 dark:border-red-500"
                      } border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-gray-50 focus:border-gray-50 block w-full p-2.5  dark:bg-slate-700 dark:border-slate-500 dark:text-gray-300`}
                      rows={2}
                      id="address"
                      {...props.getFieldProps("address")}
                    />
                    {props.touched.address && props.errors.address && <div className="invalid-feedback mt-1 text-sm font-light text-red-500">{props.errors.address}</div>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      توضیحات
                    </label>
                    <textarea
                      className={`border ${
                        props.touched.description && Boolean(props.errors.description) && "border-red-500 dark:border-red-500"
                      } border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-gray-50 focus:border-gray-50 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-500 dark:text-gray-300`}
                      rows={3}
                      id="description"
                      {...props.getFieldProps("description")}
                    />
                    {props.touched.description && props.errors.description && <div className="invalid-feedback mt-1 text-sm font-light text-red-500">{props.errors.description}</div>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      نقطه مکانی
                    </label>
                    <div className="flex gap-2">
                      <div className="w-full">
                        <div className="border border-gray-300 dark:border-gray-500 dark:bg-slate-700 w-full h-5 rounded-md mb-1 text-gray-900 dark:text-gray-300 text-sm px-2">{lat}</div>
                        <div className="border border-gray-300 dark:border-gray-500 dark:bg-slate-700 w-full h-5 rounded-md text-gray-900 dark:text-gray-300 text-sm px-2">{lng}</div>
                      </div>
                      <SelectMapModalEdit setLatitude={setLat} setLongitude={setLng} lat={lat} lng={lng} />
                    </div>
                    {showErrorLocation && <div className="invalid-feedback mt-1 text-sm font-light text-red-500">نقطه مکانی را انتخاب نمایید</div>}
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
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdEdit;
