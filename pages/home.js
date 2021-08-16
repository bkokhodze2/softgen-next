import Link from "next/link";
import { MainLayout } from "../components/MainLayout";
export default function Index() {
	return (
		<MainLayout title={"main page"}>
			<h1>hello next.js</h1>
			<p>lorem</p>
		</MainLayout>
	);
}
