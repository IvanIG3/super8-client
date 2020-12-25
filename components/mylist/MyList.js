import React from 'react';
import { useTranslation } from 'react-i18next';

import ImageCardList from '../ui/ImageCardList';
import useFirebaseUserCollection from '../../hooks/useFirebaseUserCollection';

const MyList = ({ items }) => {

    // Hooks
    const { t } = useTranslation();
    const [seenlist] = useFirebaseUserCollection('seen');

    return (
        <>
            <ImageCardList 
                items={items}
                seenlist={seenlist}
            />
            {(!items || items.length === 0) &&
                <p className="text-center">
                    {t("Add a film or a tv show to your list and you'll see it here")}
                </p>
            }
        </>
    );
}

export default MyList;