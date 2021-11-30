import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faBars, faEnvelope, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styles from "./navbar.module.css";
import { useState } from "react";

export default function NavBar() {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    const closeMenu = () => {
        setOpen(false);
    };

    return (
        <nav className={styles.navbar}>
            <div onClick={handleClick}>
                {open ? (
                    <FontAwesomeIcon icon={faTimes} />
                ) : (
                    <FontAwesomeIcon icon={faBars} />
                )}
            </div>
            {open && (
                <ul
                    className={`${open ? "active" : ""} ${styles.iconsList} ${
                        styles.navLinks
                    }`}
                >
                    <li className={styles.navItem}>
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
                    </li>
                </ul>
            )}
        </nav>
    );
}
