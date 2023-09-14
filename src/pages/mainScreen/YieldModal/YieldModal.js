import React, { useEffect, useRef } from 'react';
import classes from './YieldModal.module.scss';
import Back from '../../../assets/imgs/back.png';

const YieldModal = ({ onClose, yields }) => {
    const modalRef = useRef(null);

    const handleModalClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose(); // Đóng modal khi click bên ngoài
        }
    };

    const handleBackClick = () => {
        onClose();
    };

    useEffect(() => {
        console.log(yields.id);
    }, []);

    return (
        <div onClick={handleModalClick} className={classes.container}>
            <div ref={modalRef} className={classes.container_modal}>
                <div className={classes.header}>
                    <p>VẬT PHẨM</p>
                    <div onClick={handleBackClick} className={classes.back_btn}>
                        <img className={classes.back_icon} src={Back} alt="Back" />
                    </div>
                </div>
                <div className={classes.colection}>
                    <div className={classes.template}></div>
                    <div className={classes.option_btn}>
                        <div onClick={handleBackClick} className={classes.cancel}>
                            <p>Bỏ qua</p>
                        </div>
                        <div className={classes.cancel}>
                            <p>Thu thập</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YieldModal;

