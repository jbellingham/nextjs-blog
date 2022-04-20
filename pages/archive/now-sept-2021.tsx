import Head from "next/head";
import Link from "next/link";
import React from "react";
import Layout from "../../components/layout";
import styles from "./page.module.css";

export default function NowPage(): JSX.Element {
    return (
        <Layout home={false}>
            <Head>
                <title>Jesse Bellingham | What I&apos;m doing now</title>
            </Head>
            <article className={styles.page}>
                <p>
                    This is a{" "}
                    <Link href="https://nownownow.com/about">
                        <a target="_blank" rel="noreferrer">
                            now page
                        </a>
                    </Link>
                    . Now pages are like a snapshot of the things I care about
                    right now.
                </p>
                <p>
                    Currently busy raising an awesome 1 year old, working from
                    home at{" "}
                    <Link href="https://thoughtworks.com">
                        <a target="_blank" rel="noreferrer">
                            Thoughtworks
                        </a>
                    </Link>{" "}
                    and loving it.
                </p>
                <h3>Reading</h3>
                <p>
                    <Link href="https://www.goodreads.com/book/show/44919.Working_Effectively_with_Legacy_Code">
                        <a target="_blank" rel="noreferrer">
                            Working Effectively With Legacy Code
                        </a>
                    </Link>{" "}
                    by Michael Feathers
                </p>
                <h3>Read</h3>
                <p>
                    <Link href="https://www.goodreads.com/book/show/39996759-a-philosophy-of-software-design">
                        <a target="_blank" rel="noreferrer">
                            A Philosphy of Software Design
                        </a>
                    </Link>{" "}
                    by John Ousterhout
                </p>
                <h3>Playing</h3>
                <p>
                    Forza Horizon 5, Yakuza: Like a Dragon, Red Dead Redemption
                    2
                </p>
                <h3>Listening to</h3>
                <iframe
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1EpnSM9bvYwiED?utm_source=generator"
                    width="100%"
                    height="380"
                    frameBorder="0"
                    allowFullScreen={false}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
            </article>
        </Layout>
    );
}
