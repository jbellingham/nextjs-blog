import type { NextPage } from "next";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData, PostData } from "../lib/posts";
import React from "react";
import { ExperienceSection } from "../components/ExperienceSection";

import utilStyles from "../styles/utils.module.css";
import styles from "../styles/Home.module.css";

interface Props {
    allPosts: PostData[];
}

const Home: NextPage<Props> = ({ allPosts }) => {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${styles.heading}`}>
                <p className={styles.helloWorld}>Hello World!</p>
                <h1 className={styles.nameHeader}>My name is Jesse</h1>
                <h2 style={{ color: "grey" }}>
                    I build web applications. Currently working as a consultant
                    developer @ Thoughtworks
                </h2>
            </section>
            <ExperienceSection />
            {/* <section
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
            </section> */}
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
