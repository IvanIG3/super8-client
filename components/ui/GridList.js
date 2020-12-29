import React from 'react';
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const GridList = ({ children, xs, sm, md, lg }) => {

    const { t } = useTranslation();

    return (
        <>
            {children && children.length > 0 ?
                <Row 
                    noGutters 
                    className="my-5 w-100"
                    xs={xs}
                    sm={sm}
                    md={md}
                    lg={lg}
                >
                    {children}
                </Row>
            :
                <p className="text-center my-5">
                    {t("No results found")}
                </p>
            }
        </>
    )
};

GridList.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
};
 
export default GridList;