import { useRouter } from "next/dist/client/router";
import { MainLayout } from "../../../../components/MainLayout";
import Post from "../../post";
import { useState, useEffect } from "react";
import Link from "next/link";
import classes from "/styles/post.module.scss";
import Image from "next/image";
import img from "/public/famele.jpg";
import img1 from "/public/male.jpg";
import styles from "/styles/editPost.module.scss";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Menu from "@material-ui/core/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faArrowLeft, faTrashAlt, faEllipsisV, faEdit } from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function post({post}) {
	console.log("postonj", post);
	// const [post2, setPost2] = useState();
	const [userinfo, setUserinfo] = useState([]);
	const [newBody, setNewBody] = useState("");
	const [newTitle, setNewTitle] = useState("");
	const { t, i18n } = useTranslation("common");
	const router = useRouter();
	async function load() {
		// const response = await fetch(`http://localhost:4200/posts/${router.query.id}`);
		// const data = await response.json();
		// setPost2(data);

		setNewBody(post.body);
		setNewTitle(post.title);
		const responseUsers = await fetch(`http://localhost:4200/users/${post.userId}`);
		const userjson = await responseUsers.json();
		setUserinfo(userjson);
	}

	useEffect(() => {
		// if (!serverPost) {
		load();
		// }
	}, []);

	const API_HOST = "http://localhost:4200";
	const INVENTORY_API_URL = `${API_HOST}/posts`;

	// if (!post) {
	// 	return (
	// 		<MainLayout>
	// 			<p>loading ...</p>
	// 		</MainLayout>
	// 	);
	// }
	const save = () => {
		fetch(`${INVENTORY_API_URL}/${post.id}`, {
			method: "PATCH",
			body: JSON.stringify({
				body: newBody,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((json) => {});
		fetch(`${INVENTORY_API_URL}/${post.id}`, {
			method: "PATCH",
			body: JSON.stringify({
				title: newTitle,
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

	const savebnt = () => {
		if (newBody != post.body || newTitle != post.title) {
			return (
				<Button variant="contained" color="primary" size="small" onClick={save} className={classes.button} startIcon={<SaveIcon />}>
					Save
				</Button>
			);
		}
	};

	return (
		<>
			<div className={classes.goBack}>
				<Button onClick={() => Router.back()} className={classes.goBack__Btn} variant="contained">
					<a>
						{" "}
						<FontAwesomeIcon className={classes.icon} icon={faArrowLeft}></FontAwesomeIcon>
						{t("goBackToPosts")}
					</a>
				</Button>
			</div>

			<div className={classes.post}>
				<div className={classes.head}>
					<h1 style={{ outline: "none" }} suppressContentEditableWarning={true} contentEditable="true" className={classes.title} onInput={(e) => setNewTitle(e.currentTarget.textContent)}>
						{post.title}
					</h1>

					<div className={classes.imgWrap}>
						<span className={classes.name}>{userinfo.name}</span>
						<div className={classes.img}>{userinfo.male == "true" ? <Image src={img1} /> : <Image src={img} />}</div>
					</div>
				</div>
				<p style={{ outline: "none" }} contentEditable="true" suppressContentEditableWarning={true} onInput={(e) => setNewBody(e.currentTarget.textContent)} className={classes.paragraph}>
					{post.body}
				</p>

				{savebnt()}

				{/* <div className={classes.details}>{renderAuthButton()}</div> */}

				{/* {userinfo.role ? <p>admin {userinfo.role}</p> : <p>user role {userinfo.role}</p>} */}
			</div>
		</>
	);
}

export async function getServerSideProps({ query, req, locale }) {
	// if (!req) {
	// 	return { post: null };
	// }
	const response = await fetch(`http://localhost:4200/posts/${query.id}`);
	const post = await response.json();

	return {
		props: {
			post,
			...(await serverSideTranslations(locale, ["common"])),
		},
	};
}
