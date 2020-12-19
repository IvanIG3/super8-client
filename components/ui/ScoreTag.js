import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { easeQuadInOut } from "d3-ease";
import { Animate } from "react-move";

const ScoreContainer = styled.div`
    position: absolute;
    width: 24%;
    left: 38%;
    top: -7%;
`;

const ScoreTag = ({ score = 0 }) => {
    const [ isAnimated, setAnimated ] = useState(false);

    useEffect(() => {
        setAnimated(!isAnimated);
    }, []);
    
    return (
        <ScoreContainer>
            <Animate
                start={{ value: 0 }}
                update={{
                    value: [ isAnimated ? score : 0 ],
                    timing: {
                        duration: 500,
                        ease: easeQuadInOut
                    }
                }}
            >
                {({ value }) => {return (
                    <CircularProgressbar
                        value={value}
                        text={Math.round(value)}
                        background
                        backgroundPadding={8}
                        className="font-weight-bold"
                        styles={ buildStyles({
                            pathTransition: "none",
                            textSize: "2.5rem",
                            backgroundColor: "black",
                            textColor: "#bbb",
                            fontWidth: "700",
                            trailColor: "transparent",
                            pathColor: 
                                value < 50 ? "red" :
                                value < 70 ? "orange" : "green"
                        })}
                    />
                )}}
            </Animate>
        </ScoreContainer>
    );
};

ScoreTag.propTypes = {
    score: PropTypes.number
};

export default ScoreTag;