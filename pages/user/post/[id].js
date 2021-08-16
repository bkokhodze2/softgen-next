import { useRouter } from "next/dist/client/router";
import { MainLayout } from "../../../components/MainLayout";
import Post from ".";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function post({ post: serverPost }) {
	const [post, setPost] = useState(serverPost);
	const router = useRouter();
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

post.getInitialProps = async ({ query, req }) => {
	if (!req) {
		return { post: null };
	}
	const response = await fetch(`http://localhost:4200/posts/${query.id}`);
	const post = await response.json();

	console.log(post);

	return {
		post,
	};
};
