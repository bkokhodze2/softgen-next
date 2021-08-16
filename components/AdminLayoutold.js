import { children } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { AdminLayout2 } from "./AdminLayout";
export function AdminLayout({ children, title = "blog" }) {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="keywords" content="admin blog posts"></meta>
				<meta name="description" content="this is admin page"></meta>
			</Head>
			{/* <nav>
				<li className={router.pathname == "/admin" ? "active-nav" : ""}>
					<Link href={"/admin"}>
						<a>admin</a>
					</Link>
				</li>
				<li className={router.pathname == "/admin/editPost" ? "active-nav" : ""}>
					<Link href={"/admin/editPost"}>
						<a>edit posts</a>
					</Link>
				</li>
				<li className={router.pathname == "/admin/newPost" ? "active-nav" : ""}>
					<Link href={"/admin/newPost"}>
						<a>new posts</a>
					</Link>
				</li>
			</nav> */}
			<AdminLayout2 />
			<main>{children}</main>
			<style jsx>{`
				nav {
					position: fixed;
					height: 60px;
					left: 0;
					right: 0;
					top: 0;
					background: #5f5f61;
					display: flex;
					justify-content: space-around;
					align-items: center;
					z-index: 1;
				}
				li {
					list-style-type: none;
				}
				.body {
					margin: 0;
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
					margin-top: 70px;
				}
			`}</style>
		</>
	);
}
