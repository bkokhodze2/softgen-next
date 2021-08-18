import Link from "next/link";
import { MainLayout } from "../../components/MainLayout";
import { AdminLayout } from "../../components/AdminLayout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import classes from "../../styles/index.module.scss";
import Post from "../admin/post";

export default function Dashboard({ posts }) {
	const { t, i18n } = useTranslation("common");

	const router = useRouter();

	const userId = router.query.userId;

	if (!posts) {
		return (
			<MainLayout>
				<p>loading...</p>
			</MainLayout>
		);
	}

	return (
		<AdminLayout userId={userId}>
			<ul className={classes.ul}>
				{posts.map((item, index) => (
					<Post admin load={false} user={item.userId} id={item.id} key={index} title={item.title} body={item.body} />
				))}
				{/* {JSON.stringify(posts)} */}
			</ul>
		</AdminLayout>
	);
}

export async function getStaticProps({ req, locale }) {
	// if (!req) {
	// 	return { props: { post: [] } };
	// }
	const response = await fetch("http://localhost:4200/posts");
	const posts = await response.json();

	return {
		props: {
			posts,
			...(await serverSideTranslations(locale, ["common"])),
		},
	};
}
