import React from "react";
import { ExperienceUnit } from "./ExperienceUnit";
import { Section } from "../Section";

import styles from "./experience-section.module.css";

const ExperienceSection = () => {
    return (
        <Section
            title="Previous experience"
            accessibleName="Section containing my previous experience"
        >
            <div
                className={styles.experienceTopRow}
                style={{ display: "flex", flexWrap: "wrap" }}
            >
                <ExperienceUnit
                    logoUrl="/images/experience/xero-logo.png"
                    title="Xero"
                    timePeriod="Nov 2019 - present"
                    backgroundColour="transparent"
                    subtitle="Working within the UK Payroll team, I am contributing towards features and platform improvements."
                />
                <ExperienceUnit
                    logoUrl="/images/experience/acurus-logo.png"
                    backgroundColour="#d10033"
                    title="Acurus"
                    timePeriod="May 2017 - Nov 2019"
                    subtitle="I was a key player in the initial development of the ANEX Customer Management Portal."
                />
                <ExperienceUnit
                    logoUrl="/images/experience/quantumit-logo.png"
                    title="Quantum IT"
                    timePeriod="Nov 2016 - May 2017"
                    backgroundColour="transparent"
                    subtitle="I contributed features and bugfix on the InPlace student placement software."
                />
                <ExperienceUnit
                    logoUrl="/images/experience/idp-logo.png"
                    title="IDP Education"
                    timePeriod="Nov 2016 - Feb 2017"
                    backgroundColour="transparent"
                    subtitle="I was contracted to assist with performance improvements in the IELTS test booking software."
                />
                <ExperienceUnit
                    logoUrl="/images/experience/intuto-logo.png"
                    title="Intuto"
                    timePeriod="Sept 2015 - Oct 2016"
                    backgroundColour="transparent"
                    subtitle="I was hired straight out of my tertiary studies, and contributed features and bugfixes to the Intuto LMS."
                />
            </div>
        </Section>
    );
};

export default ExperienceSection;
