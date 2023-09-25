import React, { useRef } from 'react';
import classes from './BookModal.module.scss';
import Back from '../../../assets/imgs/back.png';
import bookData from '../../../assets/data.json';

const BookModal = ({ onClose }) => {
    const modalRef = useRef(null);

    const handleModalClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose(); // Đóng modal khi click bên ngoài
        }
    };

    const handleBackClick = () => {
        onClose();
    };

    const handleImageClick = (e, image, index) => {
        const imageInfo = {
            id: image.id,
            name: image.name,
            hidden_img: image.hidden_img,
            full_img: image.full_img,
        };
        console.log(imageInfo);

        // Lưu thông tin ảnh vào localStorage
        localStorage.setItem(`image_choose`, JSON.stringify(imageInfo));
        // alert(`Đã chọn ảnh ${imageInfo.name}`);
        // Đóng modal
        onClose();
    };

    return (
        <div onClick={handleModalClick} className={classes.container}>
            <div ref={modalRef} className={classes.container_modal}>
                <div className={classes.header}>
                    <p>BỘ SƯU TẬP</p>
                    <div onClick={handleBackClick} className={classes.back_btn}>
                        <img className={classes.back_icon} src={Back} alt="Back" />
                    </div>
                </div>
                <div className={classes.colection}>
                    {bookData.outfits.map((image, index) => (
                        <div
                            key={index}
                            className={classes.image_item}
                            onClick={(e) => handleImageClick(e, image, index)}
                        >
                            <img className={classes.img_collection} src={image.hidden_img} alt={image.alt} />
                            <p>{image.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookModal;

