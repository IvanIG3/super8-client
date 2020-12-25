import React from 'react';
import useFirebaseUserCollection from '../../hooks/useFirebaseUserCollection';
import CarouselImages from '../ui/CarouselImages';
import { useTranslation } from 'react-i18next';

const SeenListPreview = () => {
    // Hooks
    const { t } = useTranslation();
    const [ seenlist ] = useFirebaseUserCollection('seen');

    return (
        <CarouselImages items={
            seenlist && seenlist.length > 0 ?
            seenlist :
            [{
                backdrop_path: "no-items-mylist.jpg",
                title: t("You haven't seen anything yet"),
                overview: t("Login to mark a movie or TV show as seen"),
                url: "/seen",
            }]
        }/>
    );
}
 
export default SeenListPreview;