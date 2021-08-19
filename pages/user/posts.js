import { useState, useEffect } from "react";
import CustomizedSnackbars from "../../components/alert";
import Router from "next/router";
import { useRouter } from "next/router";
import Head from "next/head";
import { MainLayout } from "./../../components/MainLayout";
import Post from "./post";
import React from "react";
import classes from "../../styles/index.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import { AdminLayout } from "./../../components/AdminLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function posts({ posts: serverPosts }) {
	const [posts, setPostss] = useState(serverPosts);
	const [userInfo, setUserInfo] = useState([]);

	const [isOpen, setIsOpen] = useState(false);
	const [newBody, setNewBody] = useState("");
	const [newTitle, setNewTitle] = useState("");
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [isAlertSuccess, setIsAlertSuccess] = useState(false);
	const { t, i18n } = useTranslation("common");

	const router = useRouter();
	const userId = router.query.userId;
	console.log(userId);
	const role = userInfo.role;
	const API_HOST = "http://localhost:4200";
	const useStyles = makeStyles((theme) => ({
		root: {
			"& > *": {
				margin: theme.spacing(1),
				width: "25ch",
			},
		},
	}));
	const style = useStyles();

	async function load() {
		const response = await fetch("http://localhost:4200/posts");
		const data = await response.json();
		setPostss(data);
	}
	async function loadUserInfo() {
		const response = await fetch(`${API_HOST}/users/${userId}`);
		const userInfo = await response.json();
		setUserInfo(userInfo);
	}

	useEffect(() => {
		if (role == 1) {
			Router.push("/admin");
		}
		if (!serverPosts) {
			load();
			loadUserInfo();
		}
	}, []);

	const submit = () => {
		function CheckError(response) {
			if (response.status >= 200 && response.status <= 299) {
				setNewTitle("");
				setNewBody("");
				setOpenAlert(true);
				setIsAlertSuccess(true);
				setAlertMessage("posti warmatebit daemata");
				return response.json();
			} else {
				setOpenAlert(true);
				setIsAlertSuccess(false);
				setAlertMessage("shecdoma,posti ver daemata");
			}
		}
		fetch(`${API_HOST}/newPosts`, {
			method: "POST",
			body: JSON.stringify({
				id: new Date().getTime(),
				userId: userId,
				title: newTitle,
				body: newBody,
				date: new Date().getTime(),
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		}).then((response) => {
			CheckError(response);
		});
		setOpenAlert(false);
		setIsOpen(false);
	};

	if (!posts) {
		return (
			<MainLayout>
				<p>loading...</p>
			</MainLayout>
		);
	}
	{
		return (
			<MainLayout userId={userId}>
				{openAlert && <CustomizedSnackbars message={alertMessage} success={isAlertSuccess} />}

				<div className={classes.addBtn}>
					<Button onClick={() => setIsOpen(!isOpen)} variant="contained">
						{isOpen ? t("close") : t("addNewPost")}
					</Button>
				</div>
				{isOpen && (
					<div className={classes.formWrap}>
						<form className={`${style.root}  ${classes.form}`} noValidate autoComplete="off">
							<TextField value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className={classes.input} id="filled-basic" label={t("postTitle")} variant="filled" rows="2" />
							<TextField value={newBody} onChange={(e) => setNewBody(e.target.value)} className={classes.input} id="filled-basic" label={t("postBody")} variant="filled" rows="2" />
							<Button onClick={submit} variant="contained" color="primary">
								{t("submit")}
							</Button>
						</form>
					</div>
				)}

				<ul className={classes.ul}>
					{posts.map((item, index) => (
						<Post load={load} currentUSer={userId} user={item.userId} id={item.id} key={index} title={item.title} body={item.body} />
					))}
				</ul>
			</MainLayout>
		);
	}
}

export async function getStaticProps({ req, locale }) {
	// if (!req) {
	// 	return { post: null };
	// }
	const response = await fetch("http://localhost:4200/posts");
	const posts = await response.json();

	const responseUsers = await fetch("http://localhost:4200/users");
	const user = await responseUsers.json();

	return {
		props: {
			posts,
			user,
			...(await serverSideTranslations(locale, ["common"])),
		},
	};
}
