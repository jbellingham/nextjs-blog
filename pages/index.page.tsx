import type { NextPage } from "next";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import React from "react";
import Link from "next/link";
import styles from "./index.module.css";

import Date from "../components/date";
import { IPost } from "../lib/domain/post/post";
import { getSortedPosts } from "../lib/domain/post/postService";

const Home: NextPage = () => {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className={styles.home}>
                <section className={utilStyles.headingMd}>
                    <p>
                        I am a full-stack developer, currently working @&nbsp;
                        <a
                            href="http://thoughtworks.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Thoughtworks
                        </a>
                    </p>
                    <p>
                        <Link href="https://blog.jessebellingham.com/">
                            <a
                                className={styles.navLink}
                                rel="noreferrer"
                                target="_blank"
                            >
                                Sometimes I write stuff
                            </a>
                        </Link>
                    </p>
                </section>
            </div>
        </Layout>
    );
};

export default Home;
