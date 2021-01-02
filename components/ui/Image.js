import React from 'react';
import ImageNextJSmage from 'next/image';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

const Image = ({ src, width, height }) => (
    <>
        {!src ?
            <Skeleton style={{
                paddingBottom: `${(height/width)*100}%`,
                lineHeight: 0,
                display: "block"
            }}/>
        :
            <ImageNextJSmage
                className="border rounded-lg border-dark"
                src={src}
                layout='responsive'
                width={width}
                height={height}
            />
        }
    </>
);

Image.propTypes = {
    src: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
};
 
export default Image;