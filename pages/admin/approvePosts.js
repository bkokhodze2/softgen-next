import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/styles";
import { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { AdminLayout } from "../../components/AdminLayout";
const useStyles = makeStyles(() => ({
	root: {
		alignItems: "center",
		lineHeight: "24px",
		width: "100%",
		height: "100%",
		position: "relative",
		display: "flex",
		"& .cellValue": {
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis",
		},
	},
}));

function isOverflown(element) {
	return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
	const { width, value } = props;
	const wrapper = React.useRef(null);
	const cellDiv = React.useRef(null);
	const cellValue = React.useRef(null);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const classes = useStyles();
	const [showFullCell, setShowFullCell] = React.useState(false);
	const [showPopper, setShowPopper] = React.useState(false);

	const handleMouseEnter = () => {
		const isCurrentlyOverflown = isOverflown(cellValue.current);
		setShowPopper(isCurrentlyOverflown);
		setAnchorEl(cellDiv.current);
		setShowFullCell(true);
	};

	const handleMouseLeave = () => {
		setShowFullCell(false);
	};

	React.useEffect(() => {
		if (!showFullCell) {
			return undefined;
		}

		function handleKeyDown(nativeEvent) {
			// IE11, Edge (prior to using Bink?) use 'Esc'
			if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
				setShowFullCell(false);
			}
		}

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [setShowFullCell, showFullCell]);

	return (
		<div ref={wrapper} className={classes.root} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<div
				ref={cellDiv}
				style={{
					height: 1,
					width: 500,
					display: "block",
					position: "absolute",
					top: 0,
				}}
			/>
			<div ref={cellValue} className="cellValue">
				{value}
			</div>
			{showPopper && (
				<Popper open={showFullCell && anchorEl !== null} anchorEl={anchorEl} style={{ width: 500, marginLeft: -17 }}>
					<Paper elevation={1} style={{ minHeight: wrapper.current.offsetHeight - 3 }}>
						<Typography variant="body2" style={{ padding: 8 }}>
							{value}
						</Typography>
					</Paper>
				</Popper>
			)}
		</div>
	);
});

GridCellExpand.propTypes = {
	value: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
	return <GridCellExpand value={params.value ? params.value.toString() : ""} width={params.colDef.computedWidth} />;
}

renderCellExpand.propTypes = {
	colDef: PropTypes.any.isRequired,
	value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.object, PropTypes.string, PropTypes.bool]),
};

export default function RenderExpandCellGrid() {
	const [newPost, setNewPost] = useState([]);

	const API_HOST = "http://localhost:4200";
	const INVENTORY_API_URL = `${API_HOST}/newPosts`;

	async function loadNewPost() {
		const response = await fetch(INVENTORY_API_URL);
		const newPosts = await response.json();
		setNewPost(newPosts);
	}

	useEffect(() => {
		loadNewPost();
		// setLoading(false);
	}, []);

	const columns = [
		{ field: "id", headerName: "postID", width: 150 },
		{ field: "userId", headerName: "userId", width: 150 },
		{ field: "title", headerName: "title", width: 300 },
		{ field: "body", headerName: "body", width: 300, renderCell: renderCellExpand },
	];

	return (
		<AdminLayout title="new posts" keyWords="blog new posts admin">
			<div style={{ height: 400, width: "100%" }}>
				<DataGrid columns={columns} checkboxSelection disableSelectionOnClick pageSize={5} rows={newPost} />
			</div>
		</AdminLayout>
	);
}
