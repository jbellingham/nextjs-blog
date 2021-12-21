import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import NavBar from "./navbar";
import profilePicture from "../public/images/profile.jpg";

export const siteTitle = "Jesse Bellingham / Software Developer";

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
                <link rel="icon" href="/favicon.png" />
                <meta
                    name="description"
                    content="Personal website of Jesse Bellingham"
                />
                <meta property="og:image" content="/images/profile.jpg" />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:image" content="/images/profile.jpg" />
            </Head>
            <header className={styles.header}>
                <NavBar />
                {home ? (
                    <>
                        <Image
                            priority
                            src={profilePicture}
                            className={utilStyles.borderCircle}
                            height={144}
                            width={144}
                            alt="It's me."
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
                                    src={profilePicture}
                                    className={utilStyles.borderCircle}
                                    height={108}
                                    width={108}
                                    alt="It's me."
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
