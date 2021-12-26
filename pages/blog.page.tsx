import Link from "next/link";
import { NextPage } from "next";
import utilStyles from "../styles/utils.module.css";
import Date from "../components/date";
import Layout from "../components/layout";
import Head from "next/head";
import styles from "./page.module.css";
import { getSortedPosts } from "../lib/domain/post/postService";
import { IPost } from "../lib/domain/post/post";

interface Props {
    allPosts: IPost[];
}

const BlogPage: NextPage<Props> = ({ allPosts }) => {
    return (
        <Layout home={false}>
            <Head>
                <title>Jesse Bellingham | Blog</title>
            </Head>
            <article className={styles.page}>
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
            </article>
        </Layout>
    );
};

export default BlogPage;

export async function getStaticProps() {
    const allPosts = getSortedPosts();
    return {
        props: {
            allPosts,
        },
    };
}
