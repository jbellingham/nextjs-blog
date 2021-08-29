import React from "react";
import { ExperienceUnit } from "../ExperienceUnit";

import styles from "./experience-section.module.css";

import xeroLogo from "../../assets/images/experience/xero-logo.png";
import acurusLogo from "../../assets/images/experience/acurus-logo.png";
import quantumItLogo from "../../assets/images/experience/quantumit-logo.png";
import idpLogo from "../../assets/images/experience/idp-logo.png";
import intutoLogo from "../../assets/images/experience/intuto-logo.png";
import { Section } from "../Section";

const ExperienceSection = () => {
    return (
        <Section
            title="Experience"
            accessibleName="Section containing my previous experience"
        >
            <div className={styles.experienceTopRow + " row"}>
                <ExperienceUnit
                    logoUrl={xeroLogo}
                    title="Xero"
                    link="https://www.xero.com"
                    timePeriod="Nov 2019 - present"
                    backgroundColour="transparent"
                    subtitle="Working within the UK Payroll team, I am contributing towards features and platform improvements."
                />
                <ExperienceUnit
                    logoUrl={acurusLogo}
                    backgroundColour="#d10033"
                    title="Acurus"
                    link="https://www.acurus.com.au/"
                    timePeriod="May 2017 - Nov 2019"
                    subtitle="I was a key player in the initial development of the ANEX Customer Management Portal."
                />
                <ExperienceUnit
                    logoUrl={quantumItLogo}
                    title="Quantum IT"
                    link="https://www.quantumit.com.au/"
                    timePeriod="Nov 2016 - May 2017"
                    backgroundColour="transparent"
                    subtitle="I contributed features and bugfix on the InPlace student placement software."
                />
            </div>
            <div className="row">
                <ExperienceUnit
                    logoUrl={idpLogo}
                    title="IDP Education"
                    link="https://www.idp.com/"
                    timePeriod="Nov 2016 - Feb 2017"
                    backgroundColour="transparent"
                    subtitle="I was contracted to assist with performance improvements in the IELTS test booking software."
                />
                <ExperienceUnit
                    logoUrl={intutoLogo}
                    title="Intuto"
                    link="https://www.intuto.com/"
                    timePeriod="Sept 2015 - Oct 2016"
                    backgroundColour="transparent"
                    subtitle="I was hired straight out of my tertiary studies, and contributed features and bugfixes to the Intuto LMS."
                />
            </div>
        </Section>
    );
};

export default ExperienceSection;
