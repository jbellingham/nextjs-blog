import Link from "next/link";
import { IPost } from "../lib/domain/post/post";
import Date from "./date";
import utilStyles from "../styles/utils.module.css";

interface Props {
    posts: IPost[];
}

export function BlogPosts(props: Props) {
    const { posts } = props;
    return (
        <ul className={utilStyles.list}>
            {posts.length > 0 &&
                posts.map(({ title, url, date }) => (
                    <li className={utilStyles.listItem} key={title}>
                        <Link href={url}>
                            <a
                                className={utilStyles.externalLink}
                                rel="noreferrer"
                                target="_blank"
                            >
                                {title}
                            </a>
                        </Link>
                        <br />
                        <small className={utilStyles.lightText}>
                            <Date dateString={date} />
                        </small>
                    </li>
                ))}
            {posts.length === 0 && <p>Nothing to see here... 🤔</p>}
        </ul>
    );
}
