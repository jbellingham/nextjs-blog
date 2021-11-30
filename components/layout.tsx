import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Socials from "./socials";
import Pages from "./pages";

export const siteTitle = "Jesse Bellingham / Full Stack Developer";

export default function Layout({
    children,
    home,
}: {
    children: React.ReactNode;
    home: boolean;
}) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Personal website of Jesse Bellingham"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header className={styles.header}>
                <div className={styles.links}>
                    <Pages />
                    <Socials />
                </div>
                {home ? (
                    <>
                        <Image
                            priority
                            src="/images/profile.jpeg"
                            className={utilStyles.borderCircle}
                            height={144}
                            width={144}
                            alt="profile picture"
                        />
                        <h1 className={utilStyles.heading2Xl}>
                            Hello! My name is Jesse
                        </h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <a>
                                <Image
                                    priority
                                    src="/images/profile.jpeg"
                                    className={utilStyles.borderCircle}
                                    height={108}
                                    width={108}
                                    alt="profile picture"
                                />
                            </a>
                        </Link>
                    </>
                )}
            </header>
            <main className={styles.content}>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
        </div>
    );
}
