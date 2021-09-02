import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData, PostData } from "../lib/posts";
import React from "react";
import { ExperienceSection } from "../components/ExperienceSection";
import { AboutMe } from "../components/AboutMe";

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
            <div style={{ display: "flex" }}>
                <div className={styles.main}>
                    <section
                        className={`${utilStyles.headingMd} ${styles.heading}`}
                    >
                        {/* <h1 className={utilStyles.heading2Xl}>{name}</h1> */}
                        <p className={styles.helloWorld}>Hello World!</p>
                        <h1 className={styles.nameHeader}>My name is Jesse</h1>
                        <h2 style={{ color: "grey" }}>
                            I build web applications. Currently working as a
                            consultant developer @ Thoughtworks
                        </h2>
                    </section>
                    <ExperienceSection />
                </div>
                <div className={styles.aside}>
                    <Image
                        priority
                        src="/images/profile.jpeg"
                        className={utilStyles.borderCircle}
                        height={144}
                        width={144}
                        alt="profile picture"
                    />
                    <AboutMe />
                </div>
            </div>
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
