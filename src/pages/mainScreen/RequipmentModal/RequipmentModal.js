import React, { useEffect, useRef, useState } from 'react';
import classes from './RequipmentModal.module.scss';
import Back from '../../../assets/imgs/back.png';
import AoMong from '../../../assets/imgs/colection/aoMong.png';
import BitMong from '../../../assets/imgs/colection/bitMong.png';
import KhanTay from '../../../assets/imgs/colection/khanTay.png';
import NonMong from '../../../assets/imgs/colection/nonMong.png';
import ThanDuoiAoTay from '../../../assets/imgs/colection/thanduoiaoTay.png';
import ThanTrenAoTay from '../../../assets/imgs/colection/thantrenaoTay.png';
import HiddenDTMong from '../../../assets/imgs/hidden/DTMong.png';

const RequipmentModal = ({ onClose }) => {
    const modalRef = useRef(null);
    const [collectionData, setCollectionData] = useState([]);
    const [imageSelected, setImageSelected] = useState(localStorage.getItem('image_choose') || '');

    const handleModalClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose(); // Đóng modal khi click bên ngoài
        }
    };

    const handleBackClick = () => {
        onClose();
    };

    const handleImageClick = (e, image, index) => {
        const imageSrc = image.src;
        const imageAlt = image.alt;
        const clickedElement = e.currentTarget;

        console.log('Thông tin ảnh:', imageSrc, imageAlt);
        console.log('Vị trí phần tử trong mảng:', index);
    };

    useEffect(() => {
        const localData = localStorage.getItem('collected');
        console.log(localStorage.getItem('image_choose'));
        const imgSelected = localStorage.getItem('image_choose');
        setImageSelected(JSON.parse(imgSelected));
        if (localData) {
            // Nếu có, gán dữ liệu từ localStorage vào state
            setCollectionData(JSON.parse(localData));
        } else {
            // Nếu chưa có
        }
    }, []);

    const filteredCollectionData = collectionData.filter((item) => {
        if (imageSelected) {
            item.id.includes(imageSelected.id);
        }
    });

    return (
        <div onClick={handleModalClick} className={classes.container}>
            <div ref={modalRef} className={classes.container_modal}>
                <div className={classes.header}>
                    <p>TRANG PHỤC</p>
                    <div onClick={handleBackClick} className={classes.back_btn}>
                        <img className={classes.back_icon} src={Back} alt="Back" />
                    </div>
                </div>
                <div className={classes.colection}>
                    <div className={classes.template}>
                        {filteredCollectionData.map((item, index) => (
                            <img key={index} className={classes.img_ao} src={item?.img} alt={item?.name} />
                        ))}
                        {imageSelected ? (
                            <img className={classes.img_hiden} src={imageSelected?.hidden_img} alt={'pic'} />
                        ) : (
                            <p style={{ padding: 20 }}>Vui lòng chọn trang phục</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequipmentModal;

