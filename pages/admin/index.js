// import Link from "next/link";
// import { MainLayout } from "../../components/MainLayout";
// import { AdminLayout } from "../../components/AdminLayout";
// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import classes from "../../styles/index.module.scss";
// import Post from "../../components/post";

// export default function Dashboard({ posts: serverPosts }) {
// 	const [posts, setPostss] = useState(serverPosts);

// 	const router = useRouter();
// 	const role = 1;

// 	async function load() {
// 		const response = await fetch("http://localhost:4200/posts");
// 		const data = await response.json();
// 		setPostss(data);
// 	}
// 	useEffect(() => {
// 		if (role == 0) {
// 			router.push("/");
// 		}
// 		if (!serverPosts) {
// 			load();
// 		}
// 	}, []);

// 	if (!posts) {
// 		return (
// 			<MainLayout>
// 				<p>loading...</p>
// 			</MainLayout>
// 		);
// 	}

// 	return (
// 		<AdminLayout>
// 			<ul className={classes.ul}>
// 				{posts.map((item, index) => (
// 					<Post admin load={load} user={item.userId} id={item.id} key={index} title={item.title} body={item.body} />
// 				))}
// 				{/* {JSON.stringify(posts)} */}
// 			</ul>
// 		</AdminLayout>
// 	);
// }

// Dashboard.getInitialProps = async ({ req }) => {
// 	if (!req) {
// 		return { post: null };
// 	}
// 	const response = await fetch("http://localhost:4200/posts");
// 	const posts = await response.json();

// 	return {
// 		posts,
// 	};
// };
