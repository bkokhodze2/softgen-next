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
import { useEffect, useState } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faTools, faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import TextField from "@material-ui/core/TextField";

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

export default function CustomizedTables({ posts: serverPosts }) {
	const classes = useStyles();
	const API_HOST = "http://localhost:4200";
	const INVENTORY_API_URL = `${API_HOST}/posts`;

	const [data, setData] = useState([]);
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [isAlertSuccess, setIsAlertSuccess] = useState(false);

	const fetchInventory = () => {
		fetch(`${INVENTORY_API_URL}`)
			.then((res) => res.json())
			.then((json) => setData(json));
	};
	useEffect(() => {
		fetchInventory();
	}, []);

	const [inEditMode, setInEditMode] = useState({
		status: false,
		rowKey: null,
	});
	const [inEditMode2, setInEditMode2] = useState({
		status: false,
		rowKey: null,
	});

	const [title, setTitle] = useState(null);
	const [title2, setTitle2] = useState(null);

	const onEdit = ({ id, currentTitle }) => {
		setInEditMode({
			status: true,
			rowKey: id,
		});

		setTitle(currentTitle);
	};
	const onEdit2 = ({ id, currentTitle }) => {
		setInEditMode2({
			status: true,
			rowKey: id,
		});

		setTitle2(currentTitle);
	};

	const onDelete = (id) => {
		deleteRowJson(id);
	};
	const deleteRowJson = (id) => {
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
				setOpenAlert(true);
				setIsAlertSuccess(true);
				setAlertMessage("წარმატებით წაიშალა");
				fetchInventory();
			});
		setOpenAlert(false);
	};

	const updateInventory = ({ id, newTitle }) => {
		fetch(`${INVENTORY_API_URL}/${id}`, {
			method: "PATCH",
			body: JSON.stringify({
				title: newTitle,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((json) => {
				setOpenAlert(true);
				setIsAlertSuccess(true);
				setAlertMessage("წარმატებით შეიცვალა");
				onCancel();

				fetchInventory();
			});
		setOpenAlert(false);
	};

	const updateInventory2 = ({ id, newBody }) => {
		fetch(`${INVENTORY_API_URL}/${id}`, {
			method: "PATCH",
			body: JSON.stringify({
				body: newBody,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((json) => {
				setOpenAlert(true);
				setIsAlertSuccess(true);
				setAlertMessage("წარმატებით შეიცვალა");
				onCancel2();
				fetchInventory();
			});
		setOpenAlert(false);
	};

	const onSave = ({ id, newTitle }) => {
		updateInventory({ id, newTitle });
	};
	const onSave2 = ({ id, newBody }) => {
		updateInventory2({ id, newBody });
	};
	const onCancel = () => {
		setInEditMode({
			status: false,
			rowKey: null,
		});
		setTitle(null);
	};

	const onCancel2 = () => {
		setInEditMode2({
			status: false,
			rowKey: null,
		});
		setTitle2(null);
	};

	return (
		<AdminLayout>
			{openAlert && <CustomizedSnackbars message={alertMessage} success={isAlertSuccess} />}
			<TableContainer component={Paper}>
				<Table className={styles.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>post#</StyledTableCell>
							<StyledTableCell align="center">title</StyledTableCell>
							<StyledTableCell align="center">edit title</StyledTableCell>
							<StyledTableCell align="center">body</StyledTableCell>
							<StyledTableCell align="center">edit body</StyledTableCell>
							<StyledTableCell align="center">delete</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row) => (
							<StyledTableRow key={row.id}>
								<StyledTableCell component="th" scope="row">
									{row.id}
								</StyledTableCell>

								<StyledTableCell align="left">
									{inEditMode.status && inEditMode.rowKey === row.id ? (
										<form className={classes.root} noValidate autoComplete="off">
											<TextField className={styles.field} id="outlined-basic" value={title} label="edit" variant="outlined" onChange={(event) => setTitle(event.target.value)} />
										</form>
									) : (
										row.title
									)}
								</StyledTableCell>

								<StyledTableCell className={styles.row} alignJustify align="justify">
									{inEditMode.status && inEditMode.rowKey === row.id ? (
										<div className={styles.btns}>
											<button className={styles.success} onClick={() => onSave({ id: row.id, newTitle: title })}>
												<FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
												Save
											</button>

											<button className={styles.secondary} style={{ marginLeft: 8 }} onClick={() => onCancel()}>
												<FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
												Cancel
											</button>
										</div>
									) : (
										<button className={styles.primary} onClick={() => onEdit({ id: row.id, currentTitle: row.title })}>
											<FontAwesomeIcon icon={faTools}></FontAwesomeIcon>
											Edit
										</button>
									)}
								</StyledTableCell>
								<StyledTableCell component="th" scope="row">
									{inEditMode2.status && inEditMode2.rowKey === row.id ? (
										<form className={classes.root} noValidate autoComplete="off">
											<TextField className={styles.field} id="outlined-basic" value={title2} label="edit" variant="outlined" onChange={(event) => setTitle2(event.target.value)} />
										</form>
									) : (
										row.body
									)}
								</StyledTableCell>

								<StyledTableCell className={styles.row} alignJustify align="justify">
									{inEditMode2.status && inEditMode2.rowKey === row.id ? (
										<div className={styles.btns}>
											<button className={styles.success} onClick={() => onSave2({ id: row.id, newBody: title2 })}>
												<FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
												Save
											</button>

											<button className={styles.secondary} style={{ marginLeft: 8 }} onClick={() => onCancel2()}>
												<FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
												Cancel
											</button>
										</div>
									) : (
										<button className={styles.primary} onClick={() => onEdit2({ id: row.id, currentTitle: row.body })}>
											<FontAwesomeIcon icon={faTools}></FontAwesomeIcon>
											Edit
										</button>
									)}
								</StyledTableCell>

								<StyledTableCell className={styles.row} align="center" component="th" scope="row">
									<button className={styles.delete} onClick={() => onDelete(row.id)}>
										<FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>delete
									</button>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</AdminLayout>
	);
}

CustomizedTables.getInitialProps = async ({ req }) => {
	if (!req) {
		return { post: null };
	}
	const response = await fetch("http://localhost:4200/posts");
	const posts = await response.json();

	return {
		posts,
	};
};
