// Now page updated 20 Apr 2022

import Head from "next/head";
import Link from "next/link";
import React from "react";
import Layout from "../components/layout";
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
                    <Link href="https://www.goodreads.com/book/show/57345270-modern-software-engineering">
                        <a target="_blank" rel="noreferrer">
                            Modern Software Engineering: Doing What Works to
                            Build Better Software Faster
                        </a>
                    </Link>{" "}
                    by Dave Farley
                </p>
                <h3>Read</h3>
                <p>
                    <Link href="https://www.goodreads.com/book/show/35747076-accelerate?ref=nav_sb_noss_l_10">
                        <a target="_blank" rel="noreferrer">
                            Accelerate: Building and Scaling High-Performing
                            Technology Organizations
                        </a>
                    </Link>{" "}
                    by Nicole Forsgren, Jez Humble, &amp; Gene Kim
                </p>
                <h3>Playing</h3>
                <p>Elden Ring, Cyberpunk 2077</p>
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
