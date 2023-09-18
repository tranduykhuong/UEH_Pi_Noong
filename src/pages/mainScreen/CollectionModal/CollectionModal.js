import React, { useEffect, useRef, useState } from 'react';
import classes from './CollectionModal.module.scss';
import Back from '../../../assets/imgs/back.png';

const CollectionModal = ({ onClose }) => {
    const modalRef = useRef(null);
    const [collectionData, setCollectionData] = useState([]);

    const handleModalClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose(); // Đóng modal khi click bên ngoài
        }
    };
    const handleBackClick = () => {
        onClose();
    };

    const handleImageClick = (e, image, index) => {
        console.log('Vị trí phần tử trong mảng:', index);
    };

    useEffect(() => {
        const localData = localStorage.getItem('collected');
        if (localData) {
            // Nếu có, gán dữ liệu từ localStorage vào state
            setCollectionData(JSON.parse(localData));
        } else {
            // Nếu chưa có
        }
    }, []);

    return (
        <div onClick={handleModalClick} className={classes.container}>
            <div ref={modalRef} className={classes.container_modal}>
                <div className={classes.header}>
                    <p>TÚI ĐỒ</p>
                    <div onClick={handleBackClick} className={classes.back_btn}>
                        <img className={classes.back_icon} src={Back} alt="Back" />
                    </div>
                </div>
                <div className={classes.colection}>
                    {collectionData &&
                        collectionData.map((image, index) => (
                            <div
                                key={index}
                                className={classes.image_item}
                                onClick={(e) => handleImageClick(e, image, index)}
                            >
                                <img
                                    key={image.id}
                                    className={classes.img_collection}
                                    src={image.img}
                                    alt={image.name}
                                />
                                <p>{image.name}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default CollectionModal;

