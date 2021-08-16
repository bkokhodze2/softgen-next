import Link from "next/link";
import classes from "../../styles/post.module.scss";
import Image from "next/image";
import img from "../../public/famele.jpg";
import img1 from "../../public/male.jpg";
import styles from "../../styles/editPost.module.scss";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";

import MenuItem from "@material-ui/core/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faArrowLeft, faTrashAlt, faEllipsisV, faEdit } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import { useState, useEffect } from "react";
import Router from "next/router";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Post(props) {
	const { title, body, id, full, user, currentUSer, load, admin } = props;
	const [userinfo, setUserinfo] = useState([]);
	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setOpen] = useState(false);

	const API_HOST = "http://localhost:4200";
	const INVENTORY_API_URL = `${API_HOST}/posts`;

	const handleClickOpen = () => {
		setOpen(true);
	};

	const closeDialog = () => {
		setOpen(false);
		setAnchorEl(null);
	};

	const handleClose = (id) => {
		deleteRowJson(id);
		setAnchorEl(null);
		setOpen(false);
	};

	async function loadUser() {
		const response = await fetch(`http://localhost:4200/users/${user}`);
		const userjson = await response.json();
		setUserinfo(userjson);
		console.log(user, "userid");
	}
	useEffect(() => {
		loadUser();
	}, []);

	const handleClickMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};
	const onDelete = (id) => {
		setAnchorEl(null);
		deleteRowJson(id);
	};
	const deleteRowJson = (id) => {
		fetch(`${INVENTORY_API_URL}/${id}`, {
			method: "DELETE",
			body: JSON.stringify({
				id: id,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((json) => {
				load();
			});
	};

	const renderAuthButton = () => {
		console.log("user---", user, "currentUser---", currentUSer);
		if (admin || user == currentUSer) {
			return (
				<>
					<Button className={classes.postEdit} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickMenu}>
						edit
						<FontAwesomeIcon className={classes.icon} icon={faEllipsisV}></FontAwesomeIcon>
					</Button>

					<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseMenu}>
						<MenuItem className={classes.menuItem} onClick={() => handleClickOpen(id)}>
							<FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>delete
						</MenuItem>
						<MenuItem className={classes.menuItem}>
							<Link href={`editPost/[id]`} as={`editPost/${id}`}>
								<a>
									<FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>edit posts
								</a>
							</Link>
						</MenuItem>
					</Menu>
				</>
			);
		}
	};

	return (
		<>
			<Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{"are you sure ?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">delete this post ?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleClose(id)} color="primary">
						yes
					</Button>
					<Button onClick={closeDialog} color="primary" autoFocus>
						no
					</Button>
				</DialogActions>
			</Dialog>
			{full && (
				<div className={classes.goBack}>
					<Button className={classes.goBack__Btn} variant="contained">
						<a onClick={() => Router.back()}>
							{" "}
							<FontAwesomeIcon className={classes.icon} icon={faArrowLeft}></FontAwesomeIcon>go back to posts
						</a>
					</Button>
				</div>
			)}

			<div className={full ? `${classes.post}` : `${classes.post}`}>
				<div className={classes.head}>
					<h1 className={classes.title}>{title}</h1>

					<div className={classes.imgWrap}>
						<span className={classes.name}>{userinfo.name}</span>
						<div className={classes.img}>{userinfo.male == "true" ? <Image src={img1} /> : <Image src={img} />}</div>
					</div>
				</div>
				{full ? <p className={classes.paragraph}>{body}</p> : <p className={classes.paragraph}>{body.slice(0, 100)}...</p>}
				<div className={classes.details}>
					{full ? (
						<></>
					) : (
						<div className={classes.readMoreWrap}>
							<Link href={`post/[id]`} as={`post/${id}`} className={classes.btn}>
								<button className={styles.primary}>
									<a>read more</a>
								</button>
							</Link>
						</div>
					)}

					{renderAuthButton()}
				</div>

				{/* {userinfo.role ? <p>admin {userinfo.role}</p> : <p>user role {userinfo.role}</p>} */}
			</div>
		</>
	);
}
