import React from 'react';
import useFirebaseUserCollection from '../../hooks/useFirebaseUserCollection';
import CarouselImages from '../ui/CarouselImages';
import { useTranslation } from 'react-i18next';

const MyListPreview = () => {
    // Hooks
    const { t } = useTranslation();
    const [ mylist ] = useFirebaseUserCollection('mylist');

    // Items for carousel
    let items;
    if(mylist && mylist.length > 0) {
        items = mylist.map(item => ({
            image: `${process.env.tmdbImageURL}${item.backdrop_path}`,
            title: item.title,
            overview: item.overview,
            url: `/${item.type}/${item.id}`,
        }));
    } else {
        items = [{
            image: "no-items-mylist.jpg",
            title: t("There's nothing in your list"),
            overview: t("Login to see your list of movies and TV shows"),
            url: "/mylist",
        }];
    }

    return (
        <CarouselImages items={items} />
    );
}
 
export default MyListPreview;