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
import { useState } from "react";

const directLinkStyles = {
    fontSize: "small",
};

interface IPage {
    pageNumber: number;
    posts: IPost[];
}
interface Props {
    pages: IPage[];
}

const BlogPage: NextPage<Props> = ({ pages }) => {
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
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
                                <a
                                    className={utilStyles.internalLink}
                                    target="_blank"
                                >
                                    direct link
                                </a>
                            </Link>
                        </sub>
                    </h2>
                    <BlogPosts posts={pages[currentPageNumber].posts} />
                    <ul className={utilStyles.list}>
                        Page
                        {pages.map(({ pageNumber }) => (
                            <li
                                key={`posts-page-${pageNumber}`}
                                className={`${utilStyles.listItemHorizontal} ${
                                    pageNumber === currentPageNumber
                                        ? utilStyles.active
                                        : ""
                                }`}
                            >
                                <a
                                    className={utilStyles.internalLink}
                                    href="#"
                                    onClick={(event) =>
                                        setCurrentPageNumber(pageNumber)
                                    }
                                >
                                    {pageNumber}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            </article>
        </Layout>
    );
};

export default BlogPage;

export async function getServerSideProps() {
    const pages = new Array<IPage>();
    let pageNumber = 0;
    while (true) {
        const response = await gql<Data>(GET_USER_ARTICLES, {
            page: pageNumber,
        });
        let posts = new Array<IPost>();
        if (response?.user) {
            posts = fromHashnodeUser(response.user);
        }
        if (posts?.length) {
            pages.push({ pageNumber, posts });
            pageNumber++;
        } else {
            break;
        }
    }
    return {
        props: {
            pages,
        },
    };
}
