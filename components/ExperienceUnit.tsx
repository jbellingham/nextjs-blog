import "./style.scss";

interface Props {
    link: string;
    logoUrl: StaticImageData;
    backgroundColour: string;
    title: string;
    timePeriod: string;
    subtitle: string;
}

const ExperienceUnit = ({
    link,
    logoUrl,
    title,
    timePeriod,
    subtitle,
    backgroundColour,
}: Props) => {
    return (
        <div className="experience-unit col-xs-12 col-sm-6 col-md-4">
            <a href={link} target="_blank">
                <div
                    className="image"
                    style={{
                        backgroundImage: `url(${logoUrl})`,
                        backgroundColor: backgroundColour,
                    }}
                ></div>
            </a>
            <div className="title bold">{title}</div>
            <div className="time-period">{timePeriod}</div>
            <div className="subtitle">{subtitle}</div>
        </div>
    );
};

export default ExperienceUnit;
