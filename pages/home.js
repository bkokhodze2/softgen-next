import Link from "next/link";
import { MainLayout } from "../components/MainLayout";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export default function Index() {
	const { t, i18n } = useTranslation("common");
	return (
		<MainLayout title={"main page"}>
			<h1>{t("readmore")}</h1>
			<p>lorem</p>
		</MainLayout>
	);
}

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ["common"])),
			// Will be passed to the page component as props
		},
	};
}
