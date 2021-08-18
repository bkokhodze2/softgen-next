import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Login from "../components/login";
import Signup from "../components/signup";
import Router from "next/router";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
const SignInOutContainer = () => {
	const router = useRouter();

	const { t, i18n } = useTranslation("common");
	// i18n.changeLanguage("ka");
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const paperStyle = { width: 340, margin: "20px auto" };
	function TabPanel(props) {
		const { children, value, index, ...other } = props;

		return (
			<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
				{value === index && (
					<Box>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		);
	}

	return (
		<Paper elevation={20} style={paperStyle}>
			<Tabs value={value} indicatorColor="primary" textColor="primary" variant="fullWidth" onChange={handleChange} aria-label="disabled tabs example">
				<Tab label={t("signIn")} />

				<Tab label={t("signUp")} />
			</Tabs>
			<TabPanel value={value} index={0}>
				<Login handleChange={handleChange} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Signup />
			</TabPanel>
		</Paper>
	);
};

export default SignInOutContainer;

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ["common"])),
			// Will be passed to the page component as props
		},
	};
}
