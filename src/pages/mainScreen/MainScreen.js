import React, { useState } from 'react';
import classes from './MainScreen.module.scss';
import RightBracket from '../../assets/imgs/Logout.png';
import Book from '../../assets/imgs/Book.png';
import PiNoong from '../../assets/imgs/PiNong.png';
import Colection from '../../assets/imgs/collection.png';
import BookModal from './BookModal/BookModal';
import CollectionModal from './CollectionModal/CollectionModal';
import AoDai from '../../assets/imgs/colection/aoMong.png';
import Reload from '../../assets/imgs/reload.png';

const MainScreen = () => {
    const [bookModal, setBookModal] = useState(false);
    const [collectionModal, setCollectionModal] = useState(false);
    const [yields, setYield] = useState(true);

    const openBookModal = () => {
        setBookModal(true);
    };

    const closeBookModal = () => {
        setBookModal(false);
    };

    const openCollectionModal = () => {
        setCollectionModal(true);
    };

    const closeCollectionModal = () => {
        setCollectionModal(false);
    };

    const selectedYield = () => {
        console.log('Đã chọn vật phẩm');
    };

    return (
        <div className={classes.container}>
            <div className={classes.header_btn}>
                <div className={classes.cancel}>
                    <p>Bỏ qua vật phẩm</p>
                </div>
                <div className={classes.logout}>
                    <img className={classes.logout__img} src={Reload} alt="Logout" />
                </div>
            </div>
            {yields && (
                <div className={classes.yield}>
                    <img src={AoDai} alt="yield"></img>
                </div>
            )}

            <div className={classes.option}>
                <div className={classes.equipment}>
                    <p>Xem trang phục</p>
                </div>
                <div className={classes.option__wrap}>
                    <div onClick={openBookModal} className={classes.option__book}>
                        <img className={classes.option__book_img} src={Book} alt="Book" />
                    </div>
                    <div className={classes.option__btnPiNoong} onClick={selectedYield}>
                        <img className={classes.option__btnPiNoong_img} src={PiNoong} alt="PiNong" />
                    </div>
                    <div onClick={openCollectionModal} className={classes.option__collection}>
                        <img className={classes.option__collection_img} src={Colection} alt="Collection" />
                    </div>
                </div>
            </div>

            {bookModal && <BookModal onClose={closeBookModal} />}
            {collectionModal && <CollectionModal onClose={closeCollectionModal} />}
        </div>
    );
};

export default MainScreen;

