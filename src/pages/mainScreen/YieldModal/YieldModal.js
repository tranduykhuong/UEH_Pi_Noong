import React, { useEffect, useRef, useState } from 'react';
import classes from './YieldModal.module.scss';
import Back from '../../../assets/imgs/back.png';

const YieldModal = ({ onClose, yields }) => {
    const modalRef = useRef(null);
    const [confirmModal, setConfirmModal] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleModalClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            // onClose(); // Đóng modal khi click bên ngoài
        }
    };

    const handleBackClick = () => {
        setConfirmModal(true);
    };

    const handleSaveYields = () => {
        // Lưu yields vào localStorage
        const completed = JSON.parse(localStorage.getItem('collected')) || [];
        completed.push(yields);
        localStorage.setItem('collected', JSON.stringify(completed));
        // alert(`Đã thu thập được vật phẩm`);

        // Hiển thị modal
        setShowModal(true);

        // Đặt thời gian tự động tắt modal sau 2 giây
        setTimeout(() => {
            setShowModal(false);
            onClose();
        }, 1000);
    };

    const handleConfirm = () => {
        onClose(); // Đóng modal
    };

    const handleCancel = () => {
        setConfirmModal(false);
    };

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
                    <div className={classes.template}>
                        <img className={classes.img_yield} src={yields.img} alt="yield" />
                    </div>
                    <div className={classes.name_yield}>{yields.name}</div>
                    <div className={classes.option_btn}>
                        <div onClick={handleBackClick} className={classes.cancel}>
                            <p>Bỏ qua</p>
                        </div>
                        <div onClick={handleSaveYields} className={classes.cancel}>
                            <p>Thu thập</p>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className={classes.notification}>
                    <p>Đã chọn trang phục</p>
                </div>
            )}

            {confirmModal && (
                <div className={classes.confirmModal}>
                    <p>Bạn có muốn bỏ qua không?</p>
                    <div className={classes.wrap_btn}>
                        <button onClick={handleConfirm}>Đồng ý</button>
                        <button onClick={handleCancel}>Hủy</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default YieldModal;

