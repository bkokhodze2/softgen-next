import Link from "next/link";
import classes from "../styles/error.module.scss";

export default function ErorPage() {
	return (
		<>
			<h1 className={classes.error__h2}>error 404 custom page</h1>
			<Link href={"/"}>
				<a>go back</a>
			</Link>
		</>
	);
}
