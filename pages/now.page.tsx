import Head from "next/head";
import React from "react";
import Layout from "../components/layout";
import styles from "./page.module.css";

export default function NowPage(): JSX.Element {
    return (
        <Layout home={false}>
            <Head>
                <title>What I&apos;m doing now</title>
            </Head>
            <article className={styles.page}>
                <p>
                    This is a{" "}
                    <a
                        href="https://nownownow.com/about"
                        target="_blank"
                        rel="noreferrer"
                    >
                        now page
                    </a>
                </p>
                <p>
                    Currently busy raising an awesome 1 year old, working from
                    home at <a href="https://thoughtworks.com">Thoughtworks</a>{" "}
                    and loving it.
                </p>
                <h2>Reading</h2>
                <p>
                    <a href="https://www.goodreads.com/book/show/44919.Working_Effectively_with_Legacy_Code">
                        Working Effectively With Legacy Code
                    </a>{" "}
                    by Michael Feathers
                </p>
                <h2>Read</h2>
                <p>
                    <a href="https://www.goodreads.com/book/show/39996759-a-philosophy-of-software-design">
                        A Philosphy of Software Design
                    </a>{" "}
                    by John Ousterhout
                </p>
                <h2>Playing</h2>
                <h2>Played</h2>
                <h2>Learning</h2>
                <p>(Neo)Vim</p>
            </article>
        </Layout>
    );
}
