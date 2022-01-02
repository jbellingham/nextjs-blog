import type { NextPage } from "next";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import React from "react";
import styles from "./index.module.css";

import { fromHashnodeUser, IPost } from "../lib/domain/post/post";
import { gql } from "./api/client/hashnode/client";
import { Data } from "./api/client/hashnode/types";
import { GET_USER_ARTICLES } from "./api/client/hashnode/queries/getUserArticles";
import { BlogPosts } from "../components/blogPosts";

interface Props {
    allPosts: IPost[];
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
                    <BlogPosts posts={allPosts} />
                </section>
            </div>
        </Layout>
    );
};

export default Home;

export async function getStaticProps() {
    const { user } = await gql<Data>(GET_USER_ARTICLES, { page: 0 });
    return {
        props: {
            allPosts: fromHashnodeUser(user),
        },
    };
}
