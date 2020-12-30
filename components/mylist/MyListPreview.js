import React from 'react';
import useFirebaseUserCollection from '../../hooks/useFirebaseUserCollection';
import CarouselImages from '../ui/CarouselImages';
import { useTranslation } from 'react-i18next';

const MyListPreview = () => {
    // Hooks
    const { t } = useTranslation();
    const [ mylist ] = useFirebaseUserCollection('mylist');

    return (
        <CarouselImages
            width={800}
            height={450}
            items={
                mylist && mylist.length > 0 ?
                mylist :
                [{
                    backdrop_path: "/no-items-mylist.jpg",
                    title: t("There's nothing in your list"),
                    overview: t("Login to see your list of movies and TV shows"),
                    url: "/mylist",
                }]
            }
        />
    );
}
 
export default MyListPreview;