import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Score = styled.div`
    position: absolute;
    width: 40px;
    height: 35px;
    text-align: center;
    border-radius: 10px;
    font-weight: bold;
    font-size: 22px;
    left: calc(50% - 20px);
    top: -20px;
    background-color: black;
    color: ${props => 
        props.value >= 80 ? "#00c845" :
        props.value >= 65 ? "#f7f332" :
        props.value >= 50 ? "#ff8300" :
        "#bd2323"
    };
`;

const ScoreTag = ({score = 0}) => {
    return (
        <Score value={score}>
            {score}
        </Score>
    );
};

ScoreTag.propTypes = {
    score: PropTypes.number
};
 
export default ScoreTag;