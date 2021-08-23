import React from "react";
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import Router, { withRouter } from "next/router";
import { useTranslation } from "next-i18next";
const Login = ({ handleChange }) => {
	const { t, i18n } = useTranslation("common");
	const paperStyle = { padding: 20, height: "73vh", width: 300, margin: "0 auto" };
	const avatarStyle = { backgroundColor: "#1bbd7e" };
	const btnstyle = { margin: "8px 0" };
	const initialValues = {
		username: "",
		password: "",
		remember: false,
	};
	const validationSchema = Yup.object().shape({
		username: Yup.string().email("please enter valid email").required("Required"),
		password: Yup.string().required("Required"),
	});
	async function onSubmit(values, props) {
		console.log(values);
		const response = await fetch(`http://localhost:4200/users?email=${values.username}`);

		const data = await response.json();
		console.log(data);
		if (data.length == 1) {
			console.log("datadan--", data[0].password, "valuedan", values.password);
			if (data[0].password == values.password) {
				const ISSERVER = typeof window === "undefined";
				if (!ISSERVER) {
					localStorage.setItem("user",data[0].userId);
				}


				if (data[0].role == 1) {
					Router.push({
						pathname: "/admin/posts",
						query: { userId: data[0].userId },
					});
				} else {
					Router.push({
						pathname: "/user/posts",
						query: { userId: data[0].userId },
					});
				}
			} else {
			}
		} else {
		}
	}

	useEffect(() => {}, []);

	return (
		<Grid>
			<Paper style={paperStyle}>
				<Grid align="center">
					<Avatar style={avatarStyle}>
						<LockOutlinedIcon />
					</Avatar>
					<h2>{t("signIn")}</h2>
				</Grid>
				<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
					{(props) => (
						<Form>
							<Field as={TextField} label={t("username")} name="username" placeholder={t("enterUsername")} fullWidth required helperText={<ErrorMessage name="username" />} />
							<Field as={TextField} label={t("password")} name="password" placeholder={t("enterpassword")} type="password" fullWidth required helperText={<ErrorMessage name="password" />} />
							<Field as={FormControlLabel} name="remember" control={<Checkbox color="primary" />} label={t("rememberMe")} />
							<Button type="submit" color="primary" variant="contained" disabled={props.isSubmitting} style={btnstyle} fullWidth>
								{props.isSubmitting ? t("loading") : t("signIn")}
							</Button>
						</Form>
					)}
				</Formik>
				<Typography>
					<Link href="#">{t("forgotPassword")}</Link>
				</Typography>
				<Typography>
					{" "}
					{t("haveAccount")}
					<Link href="#" onClick={() => handleChange("event", 1)}>
						{t("signUp")}
					</Link>
				</Typography>
			</Paper>
		</Grid>
	);
};

export default Login;
