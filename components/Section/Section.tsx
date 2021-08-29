import { es } from "date-fns/locale";
import styles from "./section.module.css";

interface Props {
    title: string;
    accessibleName: string;
    children: JSX.Element;
}

const Section = ({ title, accessibleName, children }: Props) => {
    return (
        <div className={styles.section}>
            <h6
                className={styles.heading}
                role="heading"
                aria-label={accessibleName}
            >
                {title}
            </h6>
            {children}
        </div>
    );
};

export default Section;
