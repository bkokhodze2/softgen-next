import React, { useState, useEffect } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";
import theme from "../src/theme";
const ISSERVER = typeof window === "undefined";

if (!ISSERVER) {
	var currentLan = localStorage.getItem("lan");
}
export default class MyDocument extends Document {
	constructor(props) {
		super(props);
		this.state = { lan: currentLan };
	}

	render() {
		return (
			<Html lang={this.state.lan}>
				<Head>
					<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
					<meta name="theme-color" content={theme.palette.primary.main} />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
					<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
MyDocument.getInitialProps = async (ctx) => {
	// Render app and page and get the context of the page with collected side effects.
	const sheets = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
		});

	const initialProps = await Document.getInitialProps(ctx);

	return {
		...initialProps,
		styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
	};
};
