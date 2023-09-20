import React, { useEffect, useRef, useState } from 'react';
import classes from './MainScreen.module.scss';
import RightBracket from '../../assets/imgs/Logout.png';
import Book from '../../assets/imgs/Book.png';
import PiNoong from '../../assets/imgs/PiNong.png';
import Colection from '../../assets/imgs/collection.png';
import BookModal from './BookModal/BookModal';
import CollectionModal from './CollectionModal/CollectionModal';
import AoDai from '../../assets/imgs/colection/aoMong.png';
import Reload from '../../assets/imgs/reload.png';
import RequipmentModal from './RequipmentModal/RequipmentModal';
import YieldModal from './YieldModal/YieldModal';
import YieldDatas from '../../assets/data.json';
import CameraComponent from '../main/CameraComponent';
import MapYield from '../../assets/imgs/map.jpg';
import Webcam from 'react-webcam';

const MainScreen = () => {
    const [bookModal, setBookModal] = useState(false);
    const [collectionModal, setCollectionModal] = useState(false);
    const [requipmentModal, setRequipmentModal] = useState(false);
    const [yieldModal, setYieldModal] = useState(false);
    const [yields, setYield] = useState(null);

    const [webcamStream, setWebcamStream] = useState(null);
    const [devices, setDevices] = useState([]);
    const webcamRef = useRef(null);
    const [selectedDevice, setSelectedDevice] = useState(null);

    const [currentPosition, setCurrentPosition] = useState(null);
    const [watchId, setWatchId] = useState(null);
    const [heading, setHeading] = useState(null);

    const [data, setData] = useState(YieldDatas.items);

    const openBookModal = () => {
        setBookModal(true);
    };

    const closeBookModal = () => {
        setBookModal(false);
    };

    const openCollectionModal = () => {
        setCollectionModal(true);
    };

    const closeCollectionModal = () => {
        setCollectionModal(false);
    };

    const openRequipmentModal = () => {
        setRequipmentModal(true);
    };

    const closeRequipmentModal = () => {
        setRequipmentModal(false);
    };

    const openYieldModal = () => {
        setYieldModal(true);
    };

    const closeYieldModal = () => {
        setYieldModal(false);
    };

    const selectedYield = () => {
        console.log('Đã chọn vật phẩm');
    };

    const calculateCompassHeading = (event) => {
        let newHeading = 360 - event.alpha;
        setHeading(newHeading);
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const earthRadiusKm = 6371; // Bán kính trái đất ở đơn vị kilômét
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
                Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadiusKm * c;
    };

    const handleReset = () => {
        localStorage.clear();
        localStorage.setItem('completed', JSON.stringify([]));
    };

    useEffect(() => {
        const completed = localStorage.getItem('completed');
        // const completed = test;
        // console.log(completed);
        if (completed) {
            const completedData = completed || JSON.parse(completed);
            const tmp = YieldDatas.items
                .map((item) => {
                    for (let i = 0; i < completedData.length; i++) {
                        const element = completedData[i];
                        if (element.id === item.id) return;
                    }
                    return item;
                })
                .filter((e) => e !== undefined);
            setData(tmp);
        } else {
            localStorage.setItem('completed', JSON.stringify([]));
        }
    }, []);

    useEffect(() => {
        const handleWatchPosition = () => {
            const options = {
                enableHighAccuracy: true, // Cố gắng lấy tọa độ chính xác nhất có thể
                timeout: 1, // Thời gian tối đa chờ đợi lấy tọa độ (ms)
                maximumAge: 0, // Tọa độ không được lấy từ bộ nhớ cache
            };
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude, accuracy } = position.coords;
                    setCurrentPosition({ lat: latitude, lng: longitude });

                    if (accuracy < 50) {
                        navigator.geolocation.getCurrentPosition(
                            (newPosition) => {
                                const { latitude: newLat, longitude: newLng } = newPosition.coords;
                                setCurrentPosition({ lat: newLat, lng: newLng });
                            },
                            (error) => {
                                console.error('Không thể lấy vị trí:', error.message);
                            },
                            options
                        );
                    }
                },
                (error) => {
                    console.error('Lỗi khi lấy tọa độ GPS:', error);
                },
                options
            );
            setWatchId(watchId);
        };

        handleWatchPosition();

        // Khi component unmount, dừng theo dõi
        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, []);

    useEffect(() => {
        const isHeadingTowardTarget = () => {
            if (currentPosition !== null) {
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    console.log(element.lat);
                    console.log(element.lng);
                    console.log(currentPosition);
                    const dist = calculateDistance(currentPosition.lat, currentPosition.lng, element.lat, element.lng);
                    console.log(dist);
                    if (dist < 0.05 && !yieldModal) {
                        // console.log(element);
                        // console.log(dist);
                        // check thêm có đang hiện vật phẩm trước đó không
                        // alert(element.id);
                        // Xử lý hiện vật phẩm
                        console.log(element);
                        setYield(element);
                        setYieldModal(true);
                        console.log('vvvvv');

                        // Cập nhật data và local các vật phẩm đã hoàn thành
                        const dataUpdate = data
                            .map((item) => {
                                if (item.id !== element.id) return item;
                            })
                            .filter((e) => e !== undefined);
                        console.log(dataUpdate);
                        setData(dataUpdate);
                        const completed = JSON.parse(localStorage.getItem('completed'));
                        completed.push(element);
                        localStorage.setItem('completed', completed);
                        break;
                    }
                }
            }
        };

        isHeadingTowardTarget();
    }, [heading, currentPosition]);

    useEffect(() => {
        // Kiểm tra xem trình duyệt có hỗ trợ API cảm biến la bàn không
        if ('ondeviceorientationabsolute' in window) {
            window.addEventListener('deviceorientationabsolute', calculateCompassHeading);
        } else if ('ondeviceorientation' in window) {
            window.addEventListener('deviceorientation', calculateCompassHeading);
        }

        return () => {
            if ('ondeviceorientationabsolute' in window) {
                window.removeEventListener('deviceorientationabsolute', calculateCompassHeading);
            } else if ('ondeviceorientation' in window) {
                window.removeEventListener('deviceorientation', calculateCompassHeading);
            }
        };
    }, []);

    // Lấy danh sách thiết bị đầu vào (bao gồm camera)
    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            setDevices(devices.filter((device) => device.kind === 'videoinput'));
        });
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setWebcamStream(stream);
            webcamRef.current.srcObject = stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const stopCamera = () => {
        if (webcamStream) {
            webcamStream.getTracks().forEach((track) => track.stop());
            setWebcamStream(null);
        }
    };

    const switchCamera = async () => {
        if (devices.length > 1 && selectedDevice) {
            const newIndex = devices.findIndex((device) => device.deviceId !== selectedDevice.deviceId);
            if (newIndex !== -1) {
                const newDevice = devices[newIndex];
                setSelectedDevice(newDevice);
                stopCamera();
                const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: newDevice.deviceId } });
                setWebcamStream(stream);
                webcamRef.current.srcObject = stream;
            }
        }
    };
    const clearLocalStorage = () => {
        localStorage.clear();
    };

    return (
        <div className={classes.container}>
            <div className={classes.header_btn}>
                <div className={classes.name}>Pỉ Noọng Ơi</div>
                <div className={classes.logout}>
                    <img className={classes.logout__img} src={Reload} alt="Logout" onClick={handleReset} />
                </div>
            </div>
            <div className={classes.map}>
                {webcamStream ? (
                    <div>
                        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
                        <button onClick={stopCamera}>Dừng Camera</button>
                        <button onClick={switchCamera}>Xoay Camera</button>
                    </div>
                ) : (
                    <button onClick={startCamera}>Bật Camera</button>
                )}
            </div>

            <div className={classes.option}>
                {/* <div onClick={openRequipmentModal} className={classes.equipment}>
                    <p>Xem trang phục</p>
                </div> */}
                <div className={classes.option__wrap}>
                    <div onClick={openBookModal} className={classes.option__book}>
                        <img className={classes.option__book_img} src={Book} alt="Book" />
                    </div>
                    <div className={classes.option__btnPiNoong} onClick={openRequipmentModal}>
                        <img className={classes.option__btnPiNoong_img} src={PiNoong} alt="PiNong" />
                    </div>
                    <div onClick={openCollectionModal} className={classes.option__collection}>
                        <img className={classes.option__collection_img} src={Colection} alt="Collection" />
                    </div>
                </div>
            </div>

            {bookModal && <BookModal onClose={closeBookModal} />}
            {collectionModal && <CollectionModal onClose={closeCollectionModal} />}
            {requipmentModal && <RequipmentModal onClose={closeRequipmentModal} />}
            {yieldModal && <YieldModal onClose={closeYieldModal} yields={yields} />}
        </div>
    );
};

export default MainScreen;

