import React, { useEffect, useRef } from 'react';
import classes from './YieldModal.module.scss';
import Back from '../../../assets/imgs/back.png';
import Img from '../../../assets/imgs/colection/aoMong.png';

const YieldModal = ({ onClose, yields }) => {
    const modalRef = useRef(null);
    const [confirmModal, setConfirmModal] = useState(false);

    const handleModalClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose(); // Đóng modal khi click bên ngoài
        }
    };

    const handleBackClick = () => {
        setConfirmModal(true);
    };

    const handleSaveYields = () => {
        // Lưu yields vào localStorage
        const completed = JSON.parse(localStorage.getItem('completed')) || [];
        completed.push(yields);
        localStorage.setItem('completed', JSON.stringify(completed));

        onClose();
    };

    const handleConfirm = () => {
        // Xử lý khi người dùng xác nhận
        // Lưu yields vào localStorage hoặc bất kỳ tương tác nào bạn muốn thực hiện
        onClose(); // Đóng modal
    };

    const handleCancel = () => {
        setConfirmModal(false); // Đóng modal xác nhận
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
                        <img className={classes.img_yield} src={yields.image} alt="yield" />
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

            {confirmModal && (
                <div className={classes.confirmModal}>
                    <p>Bạn có muốn bỏ qua không?</p>
                    <button onClick={handleConfirm}>Đồng ý</button>
                    <button onClick={handleCancel}>Hủy</button>
                </div>
            )}
        </div>
    );
};

export default YieldModal;

