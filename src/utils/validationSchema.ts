import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("ایمیل را به درستی وارد نمایید")
    .required("وارد کردن ایمیل الزامیست")
    .matches(/^[a-z0-9-]+(.[a-z0-9-]+)@[a-z0-9-]+(.[a-z0-9-]+)*\.(.[a-z]{1,4})$/g, "ایمیل را به درستی وارد نمایید"),
  password: yup
    .string()
    .min(8, "کلمه عبور باید حداقل 8 کاراکتر باشد")
    // .matches(/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,20}$/g, "کلمه عبور باید حداقل 8 کاراکتر و شامل حروف انگلیسی بزرگ يا کوچک، عدد و كاراكتر خاص باشد")
    .required("وارد کردن کلمه عبور الزامیست"),
});

export const registerValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("ایمیل را به درستی وارد نمایید")
    .required("وارد کردن ایمیل الزامیست")
    .matches(/^[a-z0-9-]+(.[a-z0-9-]+)@[a-z0-9-]+(.[a-z0-9-]+)*\.(.[a-z]{1,4})$/g, "ایمیل را به درستی وارد نمایید"),
  password: yup
    .string()
    .min(8, "کلمه عبور باید حداقل 8 کاراکتر باشد")
    .matches(/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,20}$/g, "کلمه عبور باید حداقل 8 کاراکتر و شامل حروف انگلیسی بزرگ يا کوچک، عدد و كاراكتر خاص باشد")
    .required("وارد کردن کلمه عبور الزامیست"),
  mobile: yup
    .string()
    .matches(/^09(0[1-9]|1[0-9]|2[0-9]|3[0-9]|9[0-9])-?[0-9]{7}/g, "موبایل را به درستی وارد نمایید")
    .max(11, "حداکثر 11 عدد را وارد نمایید")
    .required("وارد کردن موبایل الزامیست"),
});

export const adValidationSchema = yup.object().shape({
  title: yup.string().min(7, "حداقل باید 7 حرف باشد").required("وارد کردن عنوان الزامیست"),
  description: yup.string().min(10, "حداقل باید 10 حرف باشد").required("وارد کردن توضیحات الزامیست"),
  address: yup.string().min(10, "حداقل باید 10 حرف باشد").required("وارد آدرس الزامیست"),
  // location: yup.string().required("انتخاب نقطه مکانی الزامیست"),
});
