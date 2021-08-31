import Image from "next/image";
import styles from "./experience-unit.module.css";

interface Props {
    logoUrl: string;
    backgroundColour: string;
    title: string;
    timePeriod: string;
    subtitle: string;
}

const ExperienceUnit = ({
    logoUrl,
    title,
    timePeriod,
    subtitle,
    backgroundColour,
}: Props) => {
    return (
        <div className={styles.experienceUnit}>
            <div
                className={styles.image}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: backgroundColour,
                }}
            >
                <Image src={logoUrl} width="100%" height="130px" />
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.timePeriod}>{timePeriod}</div>
            <div className={styles.subtitle}>{subtitle}</div>
        </div>
    );
};

export default ExperienceUnit;
