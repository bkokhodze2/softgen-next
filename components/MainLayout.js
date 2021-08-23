import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InputLabel from "@material-ui/core/InputLabel";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Link from "next/link";
import FormControl from "@material-ui/core/FormControl";
import style from "../styles/index.module.scss";
import { useRouter } from "next/router";
import Head from "next/head";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { useTranslation } from "next-i18next";

const drawerWidth = 290;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 140,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export function MainLayout({ children, title = "user blog", keyWords = "blog" }) {
	const styles = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);
	const router = useRouter();
	const [userId, setUserId] = useState("");
	const { t, i18n } = useTranslation("common");
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const changeLan = (lan) => {
		i18n.changeLanguage(lan);
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

	const getUserId = () => {
		setUserId(localStorage.getItem("user"));
	};

	useEffect(() => {
		getDefaultLan();
		getUserId();
	}, []);

	return (
		<div className={styles.root}>
			<Head>
				<title>{title}</title>
				<meta name="keywords" content={keyWords}></meta>
				<meta name="description" content="this is admin page"></meta>
			</Head>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(styles.appBar, {
					[styles.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(styles.menuButton, {
							[styles.hide]: open,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Typography style={{ display: "flex", justifyContent: "space-between", width: "100%" }} className="header" variant="h6" noWrap>
						<span>userID:{userId}</span>

						<div style={{ display: "flex", alignItems: "center" }}>
							{/* <span>more options</span>
							<span>logo222</span> */}
						</div>
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				className={clsx(styles.drawer, {
					[styles.drawerOpen]: open,
					[styles.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[styles.drawerOpen]: open,
						[styles.drawerClose]: !open,
					}),
				}}
			>
				<div className={styles.toolbar}>
					<IconButton onClick={handleDrawerClose}>{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button>
						<ListItemIcon>
							<GroupAddIcon />
						</ListItemIcon>
						<ListItemText primary={t("newUsers")} />
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem button>
						<FormControl className={styles.formControl}>
							<InputLabel htmlFor="grouped-select">{t("changeLanguage")}</InputLabel>
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
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary={t("settings")} />
					</ListItem>
					<Link href={"/"}>
						<ListItem button>
							<ListItemIcon>
								<ExitToAppIcon />
							</ListItemIcon>
							<ListItemText primary={t("logOut")} />
						</ListItem>
					</Link>
				</List>
			</Drawer>
			<main className={`${styles.content} ${style.main}`}>{children}</main>
			<style jsx>{`
				nav {
					position: fixed;
					height: 60px;
					left: 0;
					right: 0;
					top: 0;
					background: darkblue;
					display: flex;
					justify-content: space-around;
					align-items: center;
					z-index: 1;
				}
				.header {
					display: flex;
					justify-content: sapce-between;
				}
				li {
					list-style-type: none;
				}
				body {
					margin: 0;
				}
				.active-nav {
					background: black;
				}
				.active-nav a {
					color: #ff1414;
					font-weight: bold;
				}
				nav a {
					color: white;
					text-transform: uppercase;
					text-decoration: none;
				}
				main {
					margin-top: 60px;
					padding: 1rem;
				}
			`}</style>
		</div>
	);
}
