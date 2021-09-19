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
                        <i className="fa fa-github"></i>
                    </a>
                </li>
                <li className={styles.icon}>
                    <a
                        href="https://www.linkedin.com/in/jesse-bellingham/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="fa fa-linkedin"></i>
                    </a>
                </li>
                <li className={styles.icon}>
                    <a
                        href="mailto:hello@jessebellingham.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="fa fa-envelope"></i>
                    </a>
                </li>
            </ul>
        </div>
    );
}
