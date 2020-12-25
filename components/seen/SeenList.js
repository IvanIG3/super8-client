import React from 'react';
import { useTranslation } from 'react-i18next';

import ImageCardList from '../ui/ImageCardList';
import useFirebaseUserCollection from '../../hooks/useFirebaseUserCollection';

const SeenList = ({ items }) => {

    // Hooks
    const { t } = useTranslation();
    const [ mylist ] = useFirebaseUserCollection('mylist');

    return (
        <>
            <ImageCardList 
                items={items}
                mylist={mylist}
            />
            {(!items || items.length === 0) &&
                <p className="text-center">
                    {t("Mark a film or a tv show as seen and you'll find it here")}
                </p>
            }
        </>
    );
}
 
export default SeenList;