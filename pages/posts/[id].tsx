import { GetStaticPropsResult } from "next";
import Head from "next/head";
import React from "react";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData, PostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";

interface Props {
    postData: PostData;
}

export default function Post({ postData }) {
    const { title, date, contentHtml } = postData;
    return (
        <Layout home>
            <Head>
                <title>{title}</title>
            </Head>
            <article>
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
