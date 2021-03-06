import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";

export default function NavBar() {
    const router = useRouter();

    return (
        <nav className={styles.menuWrap} role="navigation">
            <ul id="menu" className={styles.menu}>
                <li
                    className={`${styles.menuItem} ${
                        router.route === "/" ? styles.active : ""
                    }`}
                >
                    <Link href="/">
                        <a className={styles.navLink}>Home</a>
                    </Link>
                </li>
                <li
                    className={`${styles.menuItem} ${
                        router.route === "/now" ? styles.active : ""
                    }`}
                >
                    <Link href="/now">
                        <a className={styles.navLink}>Now</a>
                    </Link>
                </li>
                <li
                    className={`${styles.menuItem} ${
                        router.route === "/blog" ? styles.active : ""
                    }`}
                >
                    <Link href="/blog">
                        <a className={styles.navLink}>Blog</a>
                    </Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="https://timeline.jessebellingham.com">
                        <a
                            className={styles.navLink}
                            rel="noreferrer"
                            target="_blank"
                        >
                            Timeline
                        </a>
                    </Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="https://www.github.com/jbellingham">
                        <a
                            className={styles.navLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="https://www.linkedin.com/in/jesse-bellingham/">
                        <a
                            className={styles.navLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="mailto:hello@jessebellingham.com">
                        <a
                            className={styles.navLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

{
    /* <li className={styles.navItem}>
                        <Link href="/now">
                            <a className={styles.navLink}>Now</a>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/blog">
                            <a className={styles.navLink}>Blog</a>
                        </Link>
                    </li>
                    <li className={`${styles.icon} ${styles.navItem}`}>
                        <a
                            className={styles.navLink}
                            href="https://www.github.com/jbellingham"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </li>
                    <li className={`${styles.icon} ${styles.navItem}`}>
                        <a
                            className={styles.navLink}
                            href="https://www.linkedin.com/in/jesse-bellingham/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </li>
                    <li className={`${styles.icon} ${styles.navItem}`}>
                        <a
                            className={styles.navLink}
                            href="mailto:hello@jessebellingham.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>
                    </li> */
}
