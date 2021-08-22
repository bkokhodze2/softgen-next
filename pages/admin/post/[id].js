import { useRouter } from "next/dist/client/router";
import { MainLayout } from "../../../components/MainLayout";

import Image from "next/image";
import img from "../../../public/famele.jpg";
import img1 from "../../../public/male.jpg";
import { useState, useEffect } from "react";
import Link from "next/link";
import classes from "/styles/post.module.scss";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";


import { faArrowLeft, faTrashAlt, faEllipsisV, faEdit } from "@fortawesome/free-solid-svg-icons";
export default function post({ post: serverPost }) {
	const [post, setPost] = useState(serverPost);
	const [userinfo, setUserinfo] = useState([]);
	const router = useRouter();
	const { t, i18n } = useTranslation("common");

	useEffect(() => {
		async function load() {
			const response = await fetch(`http://localhost:4200/posts/${router.query.id}`);
			const data = await response.json();
			setPost(data);

			const responseuser = await fetch(`http://localhost:4200/users/${data.userId}`);
			const userjson = await responseuser.json();
			setUserinfo(userjson);
		}
		if (!serverPost) {
			load();
		}
	}, []);

	if (!post) {
		return (
			<MainLayout>
				<p>loading ...</p>
			</MainLayout>
		);
	}
	console.log(post);
	return (
		<>
			<div className={classes.goBack}>
				<Button className={classes.goBack__Btn} variant="contained">
					<a onClick={() => Router.back()}>
						{" "}
						<FontAwesomeIcon className={classes.icon} icon={faArrowLeft}></FontAwesomeIcon>
						{t("goBackToPosts")}
					</a>
				</Button>
			</div>
			<div className={classes.post}>
				<div className={classes.head}>
					<h1 className={classes.title}>{post.title}</h1>

					<div className={classes.imgWrap}>
						<span className={classes.name}>{userinfo.name}</span>
						<div className={classes.img}>{userinfo.male == "true" ? <Image src={img1} /> : <Image src={img} />}</div>
					</div>
				</div>
				<p className={classes.paragraph}>{post.body}</p>
				<div className={classes.details}>{/* {renderAuthButton()} */}</div>

				{/* {userinfo.role ? <p>admin {userinfo.role}</p> : <p>user role {userinfo.role}</p>} */}
			</div>
		</>
	);
}

export async function getServerSideProps({ locale, query }) {
	const response = await fetch(`http://localhost:4200/posts/${query.id}`);
	const post = await response.json();

	return {
		props: {
			post,
			...(await serverSideTranslations(locale, ["common"])),
			// Will be passed to the page component as props
		},
	};
}
