import React from "react";
import { Formik, Form, Field } from "formik";
import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import classes from "../styles/login.module.scss";
import { MainLayout } from "../components/MainLayout";
export default function MyForm() {
	return (
		<MainLayout title={"about page"}>
			<Formik
				initialValues={{ email: "", password: "" }}
				validate={(values) => {
					// Your client-side validation logic
				}}
				onSubmit={(values, { setSubmitting }) => {
					// Call your API
				}}
			>
				{({ isSubmitting }) => (
					<div className={classes.login}>
						<Form method="POST" action="/home" className={classes.form}>
							<Input placeholder="mail" type="email" name="email" component="TextField" />
							<Input className={classes.input} placeholder="password" type="password" name="password" component="TextField" />
							<Button type="submit" fullWidth variant="contained" color="primary">
								Submit
							</Button>
						</Form>
					</div>
				)}
			</Formik>
		</MainLayout>
	);
}
