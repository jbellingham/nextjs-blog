import Image from "next/image";
import styles from "./experience-unit.module.css";

interface Props {
    logoUrl: string;
    backgroundColour: string;
    title: string;
    timePeriod: string;
    subtitle: string;
}

const ExperienceUnit = ({ logoUrl, title, timePeriod, subtitle }: Props) => {
    return (
        <div className={styles.experienceUnit}>
            <div className={styles.image}>
                <Image src={logoUrl} width="100%" height="100%" />
            </div>
            {/* <div
                    className="image"
                    style={{
                        backgroundImage: `url(${logoUrl})`,
                        backgroundColor: backgroundColour,
                    }}
                ></div> */}
            <div className={styles.title}>{title}</div>
            <div className={styles.timePeriod}>{timePeriod}</div>
            <div className={styles.subtitle}>{subtitle}</div>
        </div>
    );
};

export default ExperienceUnit;
