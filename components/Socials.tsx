import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./Socials.module.css";

export default function Socials() {
    return (
        <div className={styles.links}>
            <ul className={styles.iconsList}>
                <li className={styles.icon}>
                    <a
                        href="https://www.github.com/jbellingham"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </li>
                <li className={styles.icon}>
                    <a
                        href="https://www.linkedin.com/in/jesse-bellingham/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </li>
                <li className={styles.icon}>
                    <a
                        href="mailto:hello@jessebellingham.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                </li>
            </ul>
        </div>
    );
}
