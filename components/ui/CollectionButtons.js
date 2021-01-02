import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookmarkCheckFill } from '@styled-icons/bootstrap/BookmarkCheckFill';
import { EyeFill } from '@styled-icons/bootstrap/EyeFill';
import { Heart } from '@styled-icons/entypo/Heart';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';

import ToggleButton from './ToggleButton';
import useFirebaseUserCollection from '../../hooks/useFirebaseUserCollection';

const CollectionButtons = ({ logged, item }) => {
    // Hooks
    const { t } = useTranslation();
    const [ mylist, addToMyList, removeFromMyList ] = useFirebaseUserCollection('mylist');
    const [ seenlist, addToSeen, removeFromSeen ] = useFirebaseUserCollection('seen');
    const [ favorites, addToFavorites, removeFromFavorites ] = useFirebaseUserCollection('favorites');

    return (
        <>
            {logged &&
                <>
                    {item ? 
                        <ToggleButton
                            className="mb-1 w-100"
                            name={t('Add to My List')}
                            altName={t('Remove from My List')}
                            onCheck={() => addToMyList(item)}
                            onUncheck={() => removeFromMyList(item.id)}
                            Icon={BookmarkCheckFill}
                            checked={mylist && mylist.some(i => i.id === item.id)}
                        />
                    :
                        <Skeleton />
                    }
                    {item ? 
                        <ToggleButton
                            className="mb-1 w-100"
                            name={t('Mark as seen')}
                            altName={t('Unmark as seen')}
                            onCheck={() => addToSeen(item)}
                            onUncheck={() => removeFromSeen(item.id)}
                            Icon={EyeFill}
                            checked={seenlist && seenlist.some(i => i.id === item.id)}
                        />
                    :
                        <Skeleton />
                    }
                    {item ?
                        <ToggleButton
                            className="mb-1 w-100"
                            name={t('Mark as favorite')}
                            altName={t('Remove from favorites')}
                            onCheck={() => addToFavorites(item)}
                            onUncheck={() => removeFromFavorites(item.id)}
                            Icon={Heart}
                            checked={favorites && favorites.some(i => i.id === item.id)}
                        />
                    :
                        <Skeleton />
                    }
                </>
            }
        </>
    );
};

CollectionButtons.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
    }),
    logged: PropTypes.bool
};
 
export default CollectionButtons;