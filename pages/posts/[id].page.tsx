import { GetStaticPropsResult } from "next";
import Head from "next/head";
import React from "react";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData, PostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
import styles from "../page.module.css";

interface Props {
    postData: PostData;
}

export default function Post({ postData }: Props) {
    const { title, date, contentHtml, keywords, description } = postData;
    return (
        <Layout home={false}>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
            <article className={styles.page}>
                <h1 className={utilStyles.headingXl} aria-label="Post title">
                    {title}
                </h1>
                <div className={utilStyles.lightText} aria-label="Post date">
                    <Date dateString={date} />
                </div>
                <div
                    aria-label="Post content"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
                <div
                    className={utilStyles.lightText}
                    aria-label="Post keywords"
                >
                    <p>Tags:</p>
                    {keywords}
                </div>
            </article>
        </Layout>
    );
}

export async function getStaticPaths() {
    // Return a list of possible values for id
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({
    params,
}): Promise<GetStaticPropsResult<Props>> {
    //  Return necessary data for the blog post using params.id
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}
