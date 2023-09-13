import React from 'react';
import classes from './MainScreen.module.scss';
import RightBracket from '../../assets/imgs/Logout.png';

const MainScreen = () => {
    return (
        <div className={classes.container}>
            <div className={classes.logout}>
                <img className={classes.logout__img} src={RightBracket} alt="Logout" />
            </div>

            <div className={classes.option}>
                <div className={classes.option__book}>Vinh</div>
                <div className={classes.option__btnPiNong}>Vinh</div>
                <div className={classes.option__collection}>Vinh</div>
            </div>
        </div>
    );
};

export default MainScreen;

