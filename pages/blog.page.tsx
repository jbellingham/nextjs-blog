import { NextPage } from "next";
import utilStyles from "../styles/utils.module.css";
import Layout from "../components/layout";
import Head from "next/head";
import styles from "./page.module.css";
import { IPost, fromHashnodeUser } from "../lib/domain/post/post";
import { gql } from "./api/client/hashnode/client";
import { GET_USER_ARTICLES } from "./api/client/hashnode/queries/getUserArticles";
import { Data } from "./api/client/hashnode/types";
import { BlogPosts } from "../components/blogPosts";
import Link from "next/link";

const directLinkStyles = {
    fontSize: "small",
};
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
                    <h2 className={utilStyles.headingLg}>
                        Blog posts&nbsp;
                        <sub style={directLinkStyles}>
                            <Link href="https://blog.jessebellingham.com">
                                <a rel="noreferrer" target="_blank">
                                    direct link
                                </a>
                            </Link>
                        </sub>
                    </h2>
                    <BlogPosts posts={allPosts} />
                </section>
            </article>
        </Layout>
    );
};

export default BlogPage;

export async function getServerSideProps() {
    const response = await gql<Data>(GET_USER_ARTICLES, { page: 0 });
    let posts = new Array<IPost>();
    if (response != null) {
        posts = fromHashnodeUser(response.user);
    }
    return {
        props: {
            allPosts: posts,
        },
    };
}
