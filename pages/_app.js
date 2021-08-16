import NextNprogress from "nextjs-progressbar";
import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import theme from "../src/theme";

import { Provider } from "next-auth/client";

export default function MyApp(props) {
	const { Component, pageProps } = props;
	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<Provider session={pageProps.session}>
			<>
				<Head>
					<title>My page</title>
					<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
				</Head>
				<NextNprogress color="#cacc51" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}

					<Component {...pageProps} />
				</ThemeProvider>
				<style jsx global>
					{`
						body {
							font-family: "Roboto", sans-serif;
							margin:0px;
						}
						a {
							color: inherit;
							text-decoration: none;
						}
					`}
				</style>
			</>
		</Provider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};
