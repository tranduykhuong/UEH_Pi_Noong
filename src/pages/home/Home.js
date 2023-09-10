import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './Home.module.scss';

const targetLatitude = 10.766919739966264;
const targetLongitude = 106.6948431326755;

const Home = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);
    const [userLatitude, setUserLatitude] = useState(null);
    const [userLongitude, setUserLongitude] = useState(null);
    const [targetLatitude, setTargetLatitude] = useState(10.766919739966264); // Thay thế bằng tọa độ GPS của mục tiêu
    const [targetLongitude, setTargetLongitude] = useState(106.6948431326755); // Thay thế bằng tọa độ GPS của mục tiêu
    const [distance, setDistance] = useState(null);
    const [bearing, setBearing] = useState(null);

    // useEffect(() => {
    //     const checkAndRequestGeolocationPermission = async () => {
    //         const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });

    //         if (permissionStatus.state === 'granted') {
    //             // Người dùng đã cấp quyền, lấy tọa độ GPS
    //             navigator.geolocation.getCurrentPosition(
    //                 (position) => {
    //                     setLatitude(position.coords.latitude);
    //                     setLongitude(position.coords.longitude);
    //                 },
    //                 (error) => {
    //                     setError(error.message);
    //                 }
    //             );
    //         } else if (permissionStatus.state === 'prompt') {
    //             // Người dùng chưa cấp quyền, yêu cầu cấp quyền
    //             try {
    //                 await navigator.geolocation.requestPermission();
    //                 // Quyền đã được cấp, lấy tọa độ GPS
    //                 navigator.geolocation.getCurrentPosition(
    //                     (position) => {
    //                         setLatitude(position.coords.latitude);
    //                         setLongitude(position.coords.longitude);
    //                     },
    //                     (error) => {
    //                         setError(error.message);
    //                     }
    //                 );
    //             } catch (error) {
    //                 setError('Không thể cấp quyền định vị geolocation.');
    //             }
    //         } else {
    //             setError('Trình duyệt không hỗ trợ định vị geolocation.');
    //         }
    //     };

    //     checkAndRequestGeolocationPermission();
    // }, []);

    // useEffect(() => {
    //     // Hàm tính khoảng cách giữa hai điểm dựa trên tọa độ GPS
    //     const calculateDistance = (lat1, lon1, lat2, lon2) => {
    //         const earthRadiusKm = 6371; // Bán kính trái đất ở đơn vị kilômét
    //         const dLat = (lat2 - lat1) * (Math.PI / 180);
    //         const dLon = (lon2 - lon1) * (Math.PI / 180);
    //         const a =
    //             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //             Math.cos(lat1 * (Math.PI / 180)) *
    //                 Math.cos(lat2 * (Math.PI / 180)) *
    //                 Math.sin(dLon / 2) *
    //                 Math.sin(dLon / 2);
    //         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //         return earthRadiusKm * c;
    //     };

    //     // Hàm tính góc hướng giữa hai điểm dựa trên tọa độ GPS
    //     const calculateBearing = (lat1, lon1, lat2, lon2) => {
    //         const dLon = (lon2 - lon1) * (Math.PI / 180);
    //         const y = Math.sin(dLon) * Math.cos(lat2 * (Math.PI / 180));
    //         const x =
    //             Math.cos(lat1 * (Math.PI / 180)) * Math.sin(lat2 * (Math.PI / 180)) -
    //             Math.sin(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.cos(dLon);
    //         return (Math.atan2(y, x) * 180) / Math.PI;
    //     };

    //     // Kiểm tra xem tọa độ GPS của người dùng và mục tiêu đã có chưa
    //     if (userLatitude !== null && userLongitude !== null && targetLatitude !== 0 && targetLongitude !== 0) {
    //         const dist = calculateDistance(userLatitude, userLongitude, targetLatitude, targetLongitude);
    //         const bear = calculateBearing(userLatitude, userLongitude, targetLatitude, targetLongitude);

    //         setDistance(dist);
    //         setBearing(bear);
    //         console.log(dist);
    //     }
    // }, [userLatitude, userLongitude, targetLatitude, targetLongitude]);

    // useEffect(() => {
    //     // Đây là nơi bạn có thể lấy tọa độ GPS hiện tại của người dùng, chẳng hạn qua Geolocation API hoặc các phương thức khác.

    //     // Ví dụ: Lấy tọa độ GPS của người dùng từ Geolocation API
    //     setInterval(() => {
    //         console.log(2);
    //         if (navigator.geolocation) {
    //             navigator.geolocation.getCurrentPosition(
    //                 (position) => {
    //                     setUserLatitude(position.coords.latitude);
    //                     setUserLongitude(position.coords.longitude);
    //                 },
    //                 (error) => {
    //                     console.error(error.message);
    //                 }
    //             );
    //         } else {
    //             console.error('Geolocation is not supported by your browser.');
    //         }
    //     }, 500);
    // }, []);

    // return (
    //     <div>
    //         <h1>Xác định hướng và khoảng cách đến mục tiêu GPS trong React</h1>
    //         {distance !== null && bearing !== null ? (
    //             <div>
    //                 <p>Khoảng cách đến mục tiêu: {distance.toFixed(2)} km</p>
    //                 <p>Hướng: {bearing.toFixed(2)} độ</p>
    //             </div>
    //         ) : (
    //             <p>Đang tính toán...</p>
    //         )}
    //         <h3>GPS hiện tại: </h3>
    //         <p>Lat: {userLatitude}</p>
    //         <p>Lng: {userLongitude}</p>
    //         <h3>GPS đích: </h3>
    //         <p>Lat: {targetLatitude}</p>
    //         <p>Lng: {targetLongitude}</p>
    //     </div>
    // );

    // useEffect(() => {
    //     let watchId;

    //     const successCallback = (position) => {
    //         console.log(position);
    //         setLatitude(position.coords.latitude);
    //         setLongitude(position.coords.longitude);
    //         setError(null);
    //     };

    //     const errorCallback = (error) => {
    //         console.log(error.message);
    //         setError(error.message);
    //     };

    //     if (navigator.geolocation) {
    //         // Bắt đầu theo dõi vị trí
    //         console.log('follow');
    //         watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);
    //     } else {
    //         console.log('first');
    //         setError('Geolocation is not supported by your browser.');
    //     }

    //     return () => {
    //         // Ngừng theo dõi vị trí khi component bị unmount
    //         console.log('unmount');
    //         if (watchId) {
    //             navigator.geolocation.clearWatch(watchId);
    //         }
    //     };
    // }, []);

    // return (
    //     <div>
    //         <h1>Lấy tọa độ GPS liên tục trong React</h1>
    //         {latitude && longitude ? (
    //             <div>
    //                 <p>Latitude: {latitude}</p>
    //                 <p>Longitude: {longitude}</p>
    //             </div>
    //         ) : (
    //             <p>{error}</p>
    //         )}
    //     </div>
    // );

    useEffect(() => {
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                        setError(null);
                    },
                    (error) => {
                        setError(error.message);
                    }
                );
            } else {
                setError('Geolocation is not supported by your browser.');
            }
        };

        // Cập nhật tọa độ GPS mỗi giây
        const intervalId = setInterval(updateLocation, 1000);

        // Hủy bỏ interval khi component bị unmount
        return () => {
            clearInterval(intervalId);
        };
    }, []);
    console.log(latitude + '  ' + longitude);

    return (
        <div>
            <h1>Cập nhật tọa độ GPS mỗi giây trong React</h1>
            {latitude && longitude ? (
                <div>
                    <p>Latitude: {latitude}</p>
                    <p>Longitude: {longitude}</p>
                </div>
            ) : (
                <p>{error}</p>
            )}
        </div>
    );
};

export default Home;
