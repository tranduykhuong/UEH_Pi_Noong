import React, { useState } from 'react';
import classes from './MainScreen.module.scss';
import RightBracket from '../../assets/imgs/Logout.png';
import Book from '../../assets/imgs/Book.png';
import PiNoong from '../../assets/imgs/PiNong.png';
import Colection from '../../assets/imgs/collection.png';
import BookModal from './BookModal/BookModal';

const MainScreen = () => {
    const [bookModal, setBookModal] = useState(false);
    const openBookModal = () => {
        setBookModal(true);
    };

    const closeBookModal = () => {
        setBookModal(false);
    };
    return (
        <div className={classes.container}>
            <div className={classes.logout}>
                <img className={classes.logout__img} src={RightBracket} alt="Logout" />
            </div>

            <div className={classes.option}>
                <div onClick={openBookModal} className={classes.option__book}>
                    <img className={classes.option__book_img} src={Book} alt="Book" />
                </div>
                <div className={classes.option__btnPiNoong}>
                    <img className={classes.option__btnPiNoong_img} src={PiNoong} alt="PiNong" />
                </div>
                <div className={classes.option__collection}>
                    <img className={classes.option__collection_img} src={Colection} alt="Collection" />
                </div>
            </div>

            {bookModal && <BookModal onClose={closeBookModal} />}
        </div>
    );
};

export default MainScreen;

