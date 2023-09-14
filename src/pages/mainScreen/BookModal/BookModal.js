import React, { useRef } from 'react';
import classes from './BookModal.module.scss';
import Back from '../../../assets/imgs/back.png';
import AoMong from '../../../assets/imgs/colection/aoMong.png';
import BitMong from '../../../assets/imgs/colection/bitMong.png';
import KhanTay from '../../../assets/imgs/colection/khanTay.png';
import NonMong from '../../../assets/imgs/colection/nonMong.png';
import ThanDuoiAoTay from '../../../assets/imgs/colection/thanduoiaoTay.png';
import ThanTrenAoTay from '../../../assets/imgs/colection/thantrenaoTay.png';

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
        const imageSrc = image.src;
        const imageAlt = image.alt;
        const clickedElement = e.currentTarget;

        console.log('Thông tin ảnh:', imageSrc, imageAlt);
        console.log('Vị trí phần tử trong mảng:', index);
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
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={classes.image_item}
                            onClick={(e) => handleImageClick(e, image, index)}
                        >
                            <img className={classes.img_collection} src={image.src} alt={image.alt} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookModal;

