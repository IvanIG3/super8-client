import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

import CarouselImages from '../ui/CarouselImages';
import actions from '../../actions/listActions';
import apiTmdb from '../../tmdb/apiTmdb';
import { extractInfoTvShow } from '../../tmdb/extractInfo';

const TvShowsPreview = ({ num }) => {
    // Redux
    const dispatch = useDispatch();
    const list = useSelector(state => state.tvShows.previewList);
    const language = useSelector(state => state.language.language);
    const loading = useSelector(state => state.tvShows.loading);

    // Actions
    const { previewList } = actions('tvShows');

    // Preview tv shows
    const previewTvShows = async () => {
        const tvShows = await apiTmdb(`/tv/popular`, { language });
        return tvShows.results.map(tv => extractInfoTvShow(tv));
    };

    useEffect(() => {
        if(!list) {
            dispatch(previewList(previewTvShows));
        }
    }, [language]);

    return (
        <>
            {!list || loading ?
                <div
                    className="text-center position-relative"
                    style={{width: "100%", paddingBottom: "56.25%"}}
                >
                    <Spinner
                        className="position-absolute"
                        style={{top: "40%", right: "47%"}}
                        animation="border"
                        variant="secondary"
                    />
                </div>
            :
                <CarouselImages 
                    items={list.slice(0, num)} 
                    width={800}
                    height={450}
                />
            }
        </>
    );
};

TvShowsPreview.propTypes = {
    num: PropTypes.number
};

export default TvShowsPreview;