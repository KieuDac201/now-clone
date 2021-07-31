import * as yup from "yup";

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
  password: yup.string().required("Vui lòng nhập password"),
});

export const schemaSignUp = yup.object().shape({
  firstName: yup.string().required("Vui lòng nhập họ"),
  lastName: yup.string().required("Vui lòng nhập tên"),
  phone: yup.string().required("Vui lòng nhập số điện thoại"),
  district: yup.string().required("Vui lòng chọn quận / huyện"),
  city: yup.string().required("Vui lòng chọn thành phố"),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Mật khẩu tối thiếu 6 ký tự"),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Vui lòng nhập xác nhận mật khẩu"),
});
