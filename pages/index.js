import React, { useState, useEffect } from "react";
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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import LanguageIcon from "@material-ui/icons/Language";
const drawerWidth = 280;
const useStyles = makeStyles((theme) => ({
	ListItem: {
		marginTop: 20,
		display: "flex",
		justifyContent: "center",
	},
	formControl: {
		margin: theme.spacing(1),

		minWidth: 150,
	},
	inputLabel: {
		display: "flex",
		alignItems: "center",
		width: "max-content",
	},
	lanSvg: {
		marginLeft: 7,
	},
}));

const SignInOutContainer = () => {
	const router = useRouter();
	const classes = useStyles();
	const { t, i18n } = useTranslation("common");
	// i18n.changeLanguage("ka");
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const changeLan = (lan) => {
		i18n.changeLanguage(lan);

		// you can do interpolation
		router.push(router.pathname, router.query, { locale: `${lan}` });
		localStorage.setItem("lan", lan);
	};

	function getDefaultLan() {
		const ISSERVER = typeof window === "undefined";
		let defaultValueIndex;
		if (!ISSERVER) {
			var currentLan = localStorage.getItem("lan");
		}
		switch (currentLan) {
			case "en":
				defaultValueIndex = 1;
				console.log("en", defaultValueIndex);
				break;
			case "ka":
				defaultValueIndex = 2;
				console.log("ka", defaultValueIndex);
				break;
			case "ru":
				defaultValueIndex = 3;
				console.log("ru", defaultValueIndex);
				break;
			default:
				console.log("...");
		}
		return defaultValueIndex;
	}

	useEffect(() => {
		if (localStorage.getItem("lan") == null) {
			localStorage.setItem("lan", i18n.language);
		}
		let currentLan = localStorage.getItem("lan");
		// alert(currentLan);
		router.push(router.pathname, router.query, { locale: `${currentLan}` });
		getDefaultLan();
	}, []);

	const paperStyle = { width: 340, margin: "20px auto", paddingTop: "10px" };
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
			<div className={classes.ListItem} button>
				<FormControl className={classes.formControl}>
					<InputLabel className={classes.inputLabel} htmlFor="grouped-select">
						{t("changeLanguage")} <LanguageIcon className={classes.lanSvg} />
					</InputLabel>
					<Select defaultValue={getDefaultLan} id="grouped-select">
						<MenuItem onClick={() => changeLan("en")} value={1}>
							ENG
						</MenuItem>
						<MenuItem onClick={() => changeLan("ka")} value={2}>
							GEO
						</MenuItem>
						<MenuItem onClick={() => changeLan("ru")} value={3}>
							RUS
						</MenuItem>
					</Select>
				</FormControl>
			</div>

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
