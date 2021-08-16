import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CustomizedSnackbars from "../../components/alert";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styles from "../../styles/editPost.module.scss";
import { useEffect, useState, useRef } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faTrashAlt, faCheck, faBan } from "@fortawesome/free-solid-svg-icons";

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});

export default function newPostPage({ newpost: serverPosts }) {
	const API_HOST = "http://localhost:4200";
	const INVENTORY_API_URL = `${API_HOST}/newPosts`;

	const [newPost, setNewPost] = useState([]);
	const [loading, setLoading] = useState(false);

	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [isAlertSuccess, setIsAlertSuccess] = useState(false);

	const classes = useStyles();

	async function loadNewPost() {
		const response = await fetch(INVENTORY_API_URL);
		const newPosts = await response.json();
		setNewPost(newPosts);
	}

	useEffect(() => {
		loadNewPost();
		setLoading(false);
	}, []);

	if (!newPost) {
		return (
			<MainLayout>
				<p>loading...</p>
			</MainLayout>
		);
	}

	const onDelete = (id) => {
		deleteRowJson(id);
	};

	const onAdd = ({ id, title, userId, body }) => {
		console.log(id, title, userId, body);
		setLoading(true);
		fetch(`${API_HOST}/posts`, {
			method: "POST",
			body: JSON.stringify({
				id: new Date().getTime(),
				userId: userId,
				title: title,
				body: body,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((json) => {
				setOpenAlert(true);
				setIsAlertSuccess(true);
				setAlertMessage("პოსტი წარმატებით დადასტურდა");
				deleteRowJson(id);
			});
		setOpenAlert(false);
	};

	const deleteRowJson = (id) => {
		setLoading(true);
		fetch(`${INVENTORY_API_URL}/${id}`, {
			method: "DELETE",
			body: JSON.stringify({
				id: id,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((json) => {
				loadNewPost();
				setLoading(false);
			});
	};

	return (
		<AdminLayout>
			{/* {loading && <p>is loading...</p>} */}
			{openAlert && <CustomizedSnackbars message={alertMessage} success={isAlertSuccess} />}
			<TableContainer className={styles.tableWrap} component={Paper}>
				<Table className={styles.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>post#</StyledTableCell>
							<StyledTableCell align="center">title</StyledTableCell>
							<StyledTableCell align="center">body</StyledTableCell>
							<StyledTableCell align="center">userId</StyledTableCell>
							<StyledTableCell align="center">edit</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{newPost.map((row) => (
							<StyledTableRow key={row.id}>
								<StyledTableCell component="th" scope="row">
									{row.id}
								</StyledTableCell>
								<StyledTableCell align="left">{row.title.slice(0, 50)}</StyledTableCell>
								<StyledTableCell align="left">{row.body.slice(0, 100)}</StyledTableCell>
								<StyledTableCell align="center">{row.userId}</StyledTableCell>
								<StyledTableCell align="center" component="th" scope="row">
									<div className={styles.buttons}>
										<button className={styles.accept} onClick={() => onAdd({ id: row.id, title: row.title, userId: row.userId, body: row.body })}>
											<FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>accept
										</button>
										<button className={styles.reject} onClick={() => onDelete(row.id)}>
											<FontAwesomeIcon icon={faBan}></FontAwesomeIcon>reject
										</button>
									</div>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</AdminLayout>
	);
}

newPostPage.getInitialProps = async ({ req }) => {
	if (!req) {
		return { post: null };
	}
	const response = await fetch("http://localhost:4200/newPosts");
	const newpost = await response.json();

	return {
		newpost,
	};
};
