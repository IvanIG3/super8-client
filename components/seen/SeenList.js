import React from 'react';
import Link from 'next/link';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import ImageCard from '../ui/ImageCard';
import ScoreTag from '../ui/ScoreTag';
import MyListTag from '../ui/MyListTag';
import useFirebaseUserCollection from '../../hooks/useFirebaseUserCollection';

const SeenList = ({ items }) => {

    // Hooks
    const { t } = useTranslation();
    const [ mylist ] = useFirebaseUserCollection('mylist');

    return (
        <>
            <Row noGutters className="mt-5 w-100" xs="2" sm="3" md="4" lg="5">
                {items && items.length > 0 && items.map(item => (
                    <Col key={item.id} className="mb-5 position-relative">
                        <Link href={`/${item.type}/${item.id}`}>
                            <a>
                                <ImageCard
                                    title={item.title.length > 50 ?
                                        item.title.substring(0, 50) + "..." :
                                        item.title
                                    }
                                    image={item.poster_path ?
                                        `${process.env.tmdbImageURL}${item.poster_path}` :
                                        'no-poster.png'
                                    }
                                />
                            </a>
                        </Link>
                        <ScoreTag score={item.vote_average * 10}/>
                        {mylist && mylist.some(i => i.id === item.id) &&
                            <MyListTag />
                        }
                    </Col>
                ))}
            </Row>
            {(!items || items.length === 0) &&
                <p className="text-center">
                    {t("Mark a film or a tv show as seen and you'll find it here")}
                </p>
            }
        </>
    );
}
 
export default SeenList;