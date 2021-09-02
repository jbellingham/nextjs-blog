import React from "react";

import styles from "about-me.module.css";

const AboutMe = () => {
    return (
        <div className="about">
            <div className="image"></div>
            <div className="bio">
                A full stack software developer with a passion for clean,
                readable code.
                <div className="emoji">
                    💻&nbsp;Coding
                    <br />
                    🎮&nbsp;Video games
                    <br />
                    🎸&nbsp;Live music
                    <br />
                    🏂&nbsp;Snowboarding
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
