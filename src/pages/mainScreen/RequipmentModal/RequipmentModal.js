import React, { useEffect, useRef, useState } from 'react';
import classes from './RequipmentModal.module.scss';
import Back from '../../../assets/imgs/back.png';
import AoMong from '../../../assets/imgs/colection/aoMong.png';
import BitMong from '../../../assets/imgs/colection/bitMong.png';
import KhanTay from '../../../assets/imgs/colection/khanTay.png';
import NonMong from '../../../assets/imgs/colection/nonMong.png';
import ThanDuoiAoTay from '../../../assets/imgs/colection/thanduoiaoTay.png';
import ThanTrenAoTay from '../../../assets/imgs/colection/thantrenaoTay.png';
import aoDTMong from '../../../assets/imgs/puzzle/áo dân tộc mông.png';
import VayDTMong from '../../../assets/imgs/puzzle/váy dân tộc mông.png';
import NonDTMong from '../../../assets/imgs/puzzle/nón dân tộc mông.png';

const images = [
    { src: AoMong, alt: 'Áo Mông' },
    { src: BitMong, alt: 'Bít Mông' },
    { src: KhanTay, alt: 'Khăn Tay' },
    { src: NonMong, alt: 'Nón Mông' },
    { src: ThanDuoiAoTay, alt: 'Thân dưới áo tay' },
    { src: ThanTrenAoTay, alt: 'Thân trên áo tay' },
    { src: ThanTrenAoTay, alt: 'Thân trên áo tay' },
    { src: ThanTrenAoTay, alt: 'Thân trên áo tay' },
    { src: ThanTrenAoTay, alt: 'Thân trên áo tay' },
    { src: ThanTrenAoTay, alt: 'Thân trên áo tay' },
];

const RequipmentModal = ({ onClose }) => {
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
        const imageSrc = image.src;
        const imageAlt = image.alt;
        const clickedElement = e.currentTarget;

        console.log('Thông tin ảnh:', imageSrc, imageAlt);
        console.log('Vị trí phần tử trong mảng:', index);
    };

    useEffect(() => {
        const localData = localStorage.getItem('completed');
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
                    <p>TRANG PHỤC</p>
                    <div onClick={handleBackClick} className={classes.back_btn}>
                        <img className={classes.back_icon} src={Back} alt="Back" />
                    </div>
                </div>
                <div className={classes.colection}>
                    <div className={classes.template}>
                        {collectionData.map((item) => (
                            <img key={item.id} className={classes.aoDTMong} src={item.img} alt={item.name} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequipmentModal;

