import React, { Component, useState, useEffect } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import Button from "@material-ui/core/Button";
import MaterialTable from "material-table";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CustomizedSnackbars from "../../components/alert";
import classes from "../../styles/index.module.scss";

export default function ApprovePost({ newpost: serverPosts }) {
	const [newPost, setNewPost] = useState([]);
	const [openAlert, setOpenAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [isAlertSuccess, setIsAlertSuccess] = useState(false);

	const API_HOST = "http://localhost:4200";
	const INVENTORY_API_URL = `${API_HOST}/newPosts`;

	async function loadNewPost() {
		const response = await fetch(INVENTORY_API_URL);
		const newPosts = await response.json();
		setNewPost(newPosts);
	}
	const rejectPost = ({ id }) => {
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
				setAlertMessage("პოსტი უარყოფილია");
				loadNewPost();
			});
		setOpenAlert(false);
	};

	const approvePost = ({ id, title, userId, body, date }) => {
		fetch(`${API_HOST}/posts`, {
			method: "POST",
			body: JSON.stringify({
				id: id,
				userId: userId,
				title: title,
				body: body,
				date: date,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((json) => {
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
						setAlertMessage("პოსტი წარმატებით დადასტურდა");
						loadNewPost();
					});
				setOpenAlert(false);
			});
	};

	function ApproveBtns(props) {
		return (
			<div className={classes.approveBtns}>
				<Button style={{ background: "#4caf50", color: "#FFF" }} variant="contained" onClick={() => approvePost(props.data)} startIcon={<CheckCircleOutlineIcon />}>
					approve
				</Button>
				<Button style={{ background: "#f50057", color: "#FFF", marginLeft: "10px" }} onClick={() => rejectPost(props.data)} variant="contained" startIcon={<NotInterestedIcon />}>
					reject
				</Button>
			</div>
		);
	}
	useEffect(() => {
		loadNewPost();
		// setLoading(false);
	}, []);
	const columns = [
		{ title: "ID", field: "id", editable: false },
		{ title: "title", field: "title" },
		{ title: "body", field: "body" },
		{ title: "date", field: "date", render: (rowData) => new Date(rowData.date).toLocaleDateString() },
		{ title: "userId", field: "userId" },
		{
			title: "approve/reject",
			cellStyle: {
				textAlign: "center",
			},
			field: "userId",
			render: (row) => <ApproveBtns data={row} />,
			width: "100px",
		},
	];

	return (
		<AdminLayout>
			{openAlert && <CustomizedSnackbars message={alertMessage} success={isAlertSuccess} />}
			<div className="App">
				<h1 align="center">approve/reject post</h1>
				<MaterialTable title="Employee Data" data={newPost} columns={columns} />
			</div>
		</AdminLayout>
	);
}

ApprovePost.getInitialProps = async ({ req }) => {
	if (!req) {
		return { post: null };
	}
	const response = await fetch("http://localhost:4200/newPosts");
	const newpost = await response.json();

	return {
		newpost,
	};
};
