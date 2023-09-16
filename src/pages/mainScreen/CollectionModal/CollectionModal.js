import React, { useRef } from 'react';
import classes from './CollectionModal.module.scss';
import Back from '../../../assets/imgs/back.png';
import dataCollection from '../../../assets/data.json';

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
        const imageSrc = image.src;
        const imageAlt = image.alt;

        console.log('Thông tin ảnh:', imageSrc, imageAlt);
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
                    {collectionData.map((image, index) => (
                        <div
                            key={index}
                            className={classes.image_item}
                            onClick={(e) => handleImageClick(e, image, index)}
                        >
                            <img key={item.id} className={classes.img_collection} src={item.img} alt={item.name} />;
                            <p>{image.name}</p>;
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollectionModal;

