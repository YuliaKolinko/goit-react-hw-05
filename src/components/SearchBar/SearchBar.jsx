import style from "./SearchBar.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function SearchBar({ onSearch }) {
  return (
    <div className={style.searchbar}>
      <Formik
        initialValues={{ search: "" }}
        validationSchema={Yup.object({
          search: Yup.string()
            .min(3, "Enter at least 3 characters")
            .max(50, "Too long")
            .required("Enter the name of the movie to search for"),
        })}
        onSubmit={(values, { resetForm }) => {
          const trimmed = values.search.trim();
          if (trimmed) {
            onSearch(trimmed.toLowerCase());
            resetForm();
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className={style.form}>
            <Field
              className={style.input}
              type="text"
              name="search"
              autoComplete="off"
              autoFocus
              placeholder="Search for movies"
            />
            <button type="submit" className={style.btn}>
              Search
            </button>
            {errors.search && touched.search && (
              <div className={style.error}>{errors.search}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
