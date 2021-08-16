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
const API_HOST = "http://localhost:4200";
const INVENTORY_API_URL = `${API_HOST}/newUsers`;

export default function newUserPage({ newUsers: serverPosts }) {
	const [newUsers, setNewUsers] = useState([]);
	const [loading, setLoading] = useState(false);

	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [isAlertSuccess, setIsAlertSuccess] = useState(false);

	const classes = useStyles();

	async function loadNewUsers() {
		const response = await fetch(INVENTORY_API_URL);
		const newUserss = await response.json();
		setNewUsers(newUserss);
	}

	useEffect(() => {
		loadNewUsers();
		setLoading(false);
	}, []);

	if (!newUsers) {
		return (
			<MainLayout>
				<p>loading...</p>
			</MainLayout>
		);
	}

	const onDelete = (id) => {
		deleteRowJson(id);
	};

	const onAdd = ({ id, userId, role = 0, male, name, email, password }) => {
		console.log(id, userId, role, male, name, email, password);
		setLoading(true);
		fetch(`${API_HOST}/users`, {
			method: "POST",
			body: JSON.stringify({
				id: id,
				userId: id,
				role: role,
				male: "false",
				name: name,
				email: email,
				password: password,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((json) => {
				setOpenAlert(true);
				setIsAlertSuccess(true);
				setAlertMessage("მომხმარებელი წარმატებით დაემატა");
				deleteRowJson(id);
			});
		setOpenAlert(false);
	};

	const deleteRowJson = (id) => {
		alert(id);
		setLoading(true);
		fetch(`${INVENTORY_API_URL}/${id}`, {
			method: "DELETE",
			body: JSON.stringify({
				id: id,
			}),
			headers: {
				"Content-type": "application/jsonn; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((json) => {
				loadNewUsers();
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
							<StyledTableCell align="center">userId</StyledTableCell>
							<StyledTableCell align="center">male</StyledTableCell>
							<StyledTableCell align="center">name</StyledTableCell>
							<StyledTableCell align="center">email</StyledTableCell>
							<StyledTableCell align="center">password</StyledTableCell>
							<StyledTableCell align="center">aprove/reject</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{newUsers.map((row) => (
							<StyledTableRow key={row.id}>
								<StyledTableCell align="left">{row.id}</StyledTableCell>
								<StyledTableCell align="left">{row.male}</StyledTableCell>
								<StyledTableCell align="center">{row.name}</StyledTableCell>
								<StyledTableCell align="left">{row.email}</StyledTableCell>
								<StyledTableCell align="center">{row.password}</StyledTableCell>
								<StyledTableCell align="center" component="th" scope="row">
									<div className={styles.buttons}>
										<button className={styles.accept} onClick={() => onAdd({ id: row.id, userId: row.userId, male: row.male, name: row.name, email: row.email, password: row.password })}>
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

newUserPage.getInitialProps = async ({ req }) => {
	if (!req) {
		return { post: null };
	}
	const response = await fetch("http://localhost:4200/newUser");
	const newUsers = await response.json();

	return {
		newUsers,
	};
};
