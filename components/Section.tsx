import "./section.scss";

interface Props {
    title: string;
    accessibleName: string;
    children: JSX.Element[];
}

const Section = ({ title, accessibleName, children }: Props) => {
    return (
        <div className="section">
            <h6 className="bold" role="heading" aria-label={accessibleName}>
                {title}
            </h6>
            <div className="section-units">{children}</div>
        </div>
    );
};

export default Section;
