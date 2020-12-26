import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { BookmarkCheckFill } from '@styled-icons/bootstrap/BookmarkCheckFill';
import { EyeFill } from '@styled-icons/bootstrap/EyeFill';
import { Heart } from '@styled-icons/entypo/Heart';

import useFirebaseUserCollection from '../../hooks/useFirebaseUserCollection';

const CollectionButtons = ({ item }) => {

    // Hooks
    const { t } = useTranslation();
    const [ mylist, addToMyList, removeFromMyList ] = useFirebaseUserCollection('mylist');
    const [ seenlist, addToSeen, removeFromSeen ] = useFirebaseUserCollection('seen');
    const [ favorites, addToFavorites, removeFromFavorites ] = useFirebaseUserCollection('favorites');

    // Check if in my list / seen / favorite list
    const inMyList = item && mylist && mylist.some(i => i.id === item.id);
    const inSeenList = item && seenlist && seenlist.some(i => i.id === item.id);
    const inFavoriteList = item && favorites && favorites.some(i => i.id === item.id);

    // Handlers
    const handleMyListButton = () => {
        if(inMyList) {
            removeFromMyList(item.id);
        } else {
            addToMyList(item);
        }
    };

    const handleSeenButton = () => {
        if(inSeenList) {
            removeFromSeen(item.id);
        } else {
            addToSeen(item);
        }
    };

    const handleFavoriteButton = () => {
        if(inFavoriteList) {
            removeFromFavorites(item.id);
        } else {
            addToFavorites(item);
        }
    };

    return (
        <>
            <Button
                className="mt-2"
                type="button"
                variant={inMyList ? "danger" : "success"}
                onClick={handleMyListButton}
            >
                <>
                    <BookmarkCheckFill style={{ width: "1em"}} className="mr-1 pb-1"/>
                    {inMyList ? t('Remove from My List') : t('Add to My List')}
                </>
            </Button>
            <Button
                className="mt-1"
                type="button"
                variant={inSeenList ? "danger" : "success"}
                onClick={handleSeenButton}
            >
                <>
                    <EyeFill style={{ width: "1.1em"}} className="mr-1 pb-1" />
                    {inSeenList ? t('Unmark as seen') : t('Mark as seen')}
                </>
            </Button>
            <Button
                className="mt-1"
                type="button"
                variant={inFavoriteList ? "danger" : "success"}
                onClick={handleFavoriteButton}
            >
                <>
                    <Heart style={{ width: "1.1em"}} className="mr-1 pb-1" />
                    {inFavoriteList ? t('Remove from favorites') : t('Mark as favorite')}
                </>
            </Button>
        </>
    );
}
 
export default CollectionButtons;