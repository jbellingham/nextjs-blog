import Link from "next/link";
import React from "react";
import styles from "./pages.module.css";

export default function Pages() {
    return (
        <div className={styles.linkContainer}>
            <Link href="/now">Now</Link>
            <Link href="/blog">Blog</Link>
        </div>
    );
}
