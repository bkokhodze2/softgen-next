import { useRouter } from "next/dist/client/router";
import { MainLayout } from "../../../components/MainLayout";
import Post from "../post";
import { useState, useEffect } from "react";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function post({ post: serverPost }) {
	const [post, setPost] = useState(serverPost);
	const router = useRouter();

	const { t, i18n } = useTranslation("common");
	useEffect(() => {
		async function load() {
			const response = await fetch(`http://localhost:4200/posts/${router.query.id}`);
			const data = await response.json();
			setPost(data);
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
	return <Post full user={post.userId} id={post + 1} key={post.id} title={post.title} body={post.body} />;
}

export async function getServerSideProps({ query, req, locale }) {
	if (!req) {
		return { post: null };
	}
	const response = await fetch(`http://localhost:4200/posts/${query.id}`);
	const post = await response.json();

	console.log(post);

	return {
		props: {
			post,
			...(await serverSideTranslations(locale, ["common"])),
			// Will be passed to the page component as props
		},
	};
}

// export async function getStaticProps({ locale }) {
// 	return {
// 		props: {

// 			// Will be passed to the page component as props
// 		},
// 	};
// }
