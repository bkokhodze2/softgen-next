import React from "react";
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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import PostAddIcon from "@material-ui/icons/PostAdd";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Link from "next/link";
import style from "../styles/index.module.scss";
import { useRouter } from "next/router";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
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

export function AdminLayout({ children, title = "blog", userId }) {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	const router = useRouter();
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
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
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
				</div>
				<Divider />
				<List>
					<Link href={"/admin/posts"}>
						<ListItem button>
							<ListItemIcon>
								<MailIcon />
							</ListItemIcon>
							<ListItemText primary="posts" />
						</ListItem>
					</Link>
					<Link className={router.pathname == "/admin/allPostTable" ? "active-nav" : ""} href={"/admin/allPostTable"}>
						<ListItem button>
							<ListItemIcon>
								<MailIcon />
							</ListItemIcon>
							<ListItemText primary="postTable" />
						</ListItem>
					</Link>
					<Link href={"/admin/approvePosts2"}>
						<ListItem button>
							<ListItemIcon>
								<PostAddIcon />
							</ListItemIcon>
							<ListItemText primary="approve posts" />
						</ListItem>
					</Link>
					<Link href={"/admin/newUser"}>
						<ListItem button>
							<ListItemIcon>
								<GroupAddIcon />
							</ListItemIcon>
							<ListItemText primary="new users" />
						</ListItem>
					</Link>
				</List>
				<Divider />
				<List>
					<ListItem button>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary="setting" />
					</ListItem>
					<Link href={"/"}>
						<ListItem button>
							<ListItemIcon>
								<ExitToAppIcon />
							</ListItemIcon>
							<ListItemText primary="log out" />
						</ListItem>
					</Link>
				</List>
			</Drawer>
			<main className={`${classes.content} ${style.main}`}>{children}</main>
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
