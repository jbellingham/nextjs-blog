import { getSortedPostsData, PostData } from "../lib/posts";
import Link from "next/link";
import { NextPage } from "next";
import utilStyles from "../styles/utils.module.css";
import Date from "../components/date";
import Layout from "../components/layout";
import Head from "next/head";

interface Props {
    allPosts: PostData[];
}

const BlogPage: NextPage<Props> = ({ allPosts }) => {
    return (
        <Layout home={false}>
            <Head>
                <title>All of my blog posts</title>
            </Head>
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
        </Layout>
    );
};

export default BlogPage;

export async function getStaticProps() {
    const allPosts = getSortedPostsData();
    return {
        props: {
            allPosts,
        },
    };
}
