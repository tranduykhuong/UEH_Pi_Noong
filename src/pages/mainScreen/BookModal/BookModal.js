import React, { useRef } from 'react';
import classes from './BookModal.module.scss';

const BookModal = ({ onClose }) => {
    const modalRef = useRef(null);

    const handleModalClick = (e) => {
        // Kiểm tra xem sự kiện click có phát sinh từ phần tử modal chính hay không
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose(); // Đóng modal khi click bên ngoài
        }
    };
    return (
        <div className={classes.container} onClick={handleModalClick}>
            <div ref={modalRef} className={classes.container_modal}>
                <div className={classes.header}>sdhfds</div>
            </div>
        </div>
    );
};

export default BookModal;

