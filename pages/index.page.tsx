import type { NextPage } from "next";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData, PostData } from "../lib/posts";
import React from "react";
import Link from "next/link";
import styles from "./index.module.css";

import Date from "../components/date";

interface Props {
    allPosts: PostData[];
}

const Home: NextPage<Props> = ({ allPosts }) => {
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
                    <p>Sometimes I write stuff 👇</p>
                </section>
                <section
                    className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
                >
                    <h2 className={utilStyles.headingLg}>Blog</h2>
                    <ul className={utilStyles.list}>
                        {allPosts.map(({ id, date, title }) => (
                            <li className={utilStyles.listItem} key={id}>
                                <Link href={`/posts/${id}`}>
                                    <a>{title}</a>
                                </Link>
                                <br />
                                <small className={utilStyles.lightText}>
                                    <Date dateString={date} />
                                </small>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </Layout>
    );
};

export default Home;

export async function getStaticProps() {
    const allPosts = getSortedPostsData();
    return {
        props: {
            allPosts,
        },
    };
}
