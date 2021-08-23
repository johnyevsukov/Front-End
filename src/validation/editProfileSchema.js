import * as yup from "yup";

export default yup.object().shape({
  user_avatar: yup
    .string()
    .oneOf(["dog", "cat", "hamster", "lizard", "bird", "frog", "rodent", "fish", "spider", "turtle", "duck", "hedgehog", "horse", "monkey", "rabbit", "pig"], "avatar required"),
  user_species: yup
    .string()
    .required("species required"),
  user_location: yup
    .string()
    .required("location required"),
  user_birthday: yup
    .string()
    .required("birthday required"),
});
