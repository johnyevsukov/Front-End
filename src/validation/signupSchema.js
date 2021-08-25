import * as yup from "yup";

export default yup.object().shape({
  user_email: yup
    .string()
    .email("must be a valid email")
    .required("email is required"),
  username: yup
    .string()
    .required("username is required")
    .min(3, "must be at least 3 chars long"),
  password: yup
    .string()
    .required("password is required")
    .min(3, "must be at least 3 chars long"),
  re_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});
