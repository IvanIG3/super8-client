import React from 'react';
import useFirebaseUserCollection from '../../hooks/useFirebaseUserCollection';
import CarouselImages from '../ui/CarouselImages';
import { useTranslation } from 'react-i18next';

const SeenListPreview = () => {
    // Hooks
    const { t } = useTranslation();
    const [ seenlist ] = useFirebaseUserCollection('seen');

    // Items for carousel
    let items;
    if(seenlist && seenlist.length > 0) {
        items = seenlist.map(item => ({
            image: `${process.env.tmdbImageURL}${item.backdrop_path}`,
            title: item.title,
            overview: item.overview,
            url: `/${item.type}/${item.id}`,
        }));
    } else {
        items = [{
            image: "no-items-mylist.jpg",
            title: t("You haven't seen anything yet"),
            overview: t("Login to mark a movie or TV show as seen"),
            url: "/seen",
        }];
    }

    return (
        <CarouselImages items={items} />
    );
}
 
export default SeenListPreview;