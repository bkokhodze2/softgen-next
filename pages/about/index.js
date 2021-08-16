import Router from "next/router";
import Head from "next/head";
import { MainLayout } from "../../components/MainLayout";
export default function About() {
	const LinkHandler = () => {
		Router.push("/");
	};
	return (
		<MainLayout title={'about page'}>
			<h1>About page</h1>
			<button onClick={LinkHandler}>go back to home</button>
		</MainLayout>
	);
}
