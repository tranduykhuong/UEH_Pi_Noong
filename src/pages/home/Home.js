import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapStyles = {
    height: '400px',
    width: '100%',
};

const Home = () => {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [watchId, setWatchId] = useState(null);
    const [targetLatitude, setTargetLatitude] = useState(10.766894); // Thay thế bằng tọa độ GPS của mục tiêu
    const [targetLongitude, setTargetLongitude] = useState(106.695466);
    // const [targetLatitude, setTargetLatitude] = useState(10.766970623687978);
    // const [targetLongitude, setTargetLongitude] = useState(106.69504968618132);
    // const [targetLatitude, setTargetLatitude] = useState(10.766703394544189);
    // const [targetLongitude, setTargetLongitude] = useState(106.69524844454077);
    // const [targetLatitude, setTargetLatitude] = useState(10.766736589044667);
    // const [targetLongitude, setTargetLongitude] = useState(106.69497602048739);
    const [distance, setDistance] = useState(null);
    const [bearing, setBearing] = useState(null);

    const [heading, setHeading] = useState(null);
    const [director, setDirector] = useState(null);

    const calculateCompassHeading = (event) => {
        let newHeading = 360 - event.alpha; // Góc hướng đi (0-360 độ)

        setHeading(newHeading);
    };

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

    const calculateBearing = (lat1, lon1, lat2, lon2) => {
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const y = Math.sin(dLon) * Math.cos(lat2 * (Math.PI / 180));
        const x =
            Math.cos(lat1 * (Math.PI / 180)) * Math.sin(lat2 * (Math.PI / 180)) -
            Math.sin(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.cos(dLon);
        return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
    };

    useEffect(() => {
        const checkAndRequestGeolocationPermission = async () => {
            const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
            if (permissionStatus.state === 'granted') {
                const options = {
                    enableHighAccuracy: true, // Cố gắng lấy tọa độ chính xác nhất có thể
                    timeout: 1, // Thời gian tối đa chờ đợi lấy tọa độ (ms)
                    maximumAge: 0, // Tọa độ không được lấy từ bộ nhớ cache
                };

                // Bắt đầu theo dõi vị trí với tần số cập nhật 1 lần mỗi 10 giây
                const watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        console.log(position.coords);
                        const { latitude, longitude } = position.coords;
                        setCurrentPosition({ lat: latitude, lng: longitude });
                        if (latitude !== null && longitude !== null && targetLatitude !== 0 && targetLongitude !== 0) {
                            const dist = calculateDistance(latitude, longitude, targetLatitude, targetLongitude);
                            const bear = calculateBearing(latitude, longitude, targetLatitude, targetLongitude);

                            setDistance(dist);
                            setBearing(bear);
                            console.log(dist);
                        }
                    },
                    (error) => {
                        console.error('Lỗi khi lấy tọa độ GPS:', error);
                    },
                    options
                );

                setWatchId(watchId);
            } else if (permissionStatus.state === 'prompt') {
                // Người dùng chưa cấp quyền, yêu cầu cấp quyền
                try {
                    await navigator.geolocation.requestPermission();
                    // Quyền đã được cấp, lấy tọa độ GPS
                    const options = {
                        enableHighAccuracy: true, // Cố gắng lấy tọa độ chính xác nhất có thể
                        timeout: 1, // Thời gian tối đa chờ đợi lấy tọa độ (ms)
                        maximumAge: 0, // Tọa độ không được lấy từ bộ nhớ cache
                    };

                    // Bắt đầu theo dõi vị trí với tần số cập nhật 1 lần mỗi 10 giây
                    const watchId = navigator.geolocation.watchPosition(
                        (position) => {
                            console.log(position.coords);
                            const { latitude, longitude } = position.coords;
                            setCurrentPosition({ lat: latitude, lng: longitude });
                            if (
                                latitude !== null &&
                                longitude !== null &&
                                targetLatitude !== 0 &&
                                targetLongitude !== 0
                            ) {
                                const dist = calculateDistance(latitude, longitude, targetLatitude, targetLongitude);
                                const bear = calculateBearing(latitude, longitude, targetLatitude, targetLongitude);

                                setDistance(dist);
                                setBearing(bear);
                                console.log(dist);
                            }
                        },
                        (error) => {
                            console.error('Lỗi khi lấy tọa độ GPS:', error);
                        },
                        options
                    );

                    setWatchId(watchId);
                } catch (error) {
                    setError('Không thể cấp quyền định vị geolocation.');
                }
            } else {
                setError('Trình duyệt không hỗ trợ định vị geolocation.');
            }
        };

        checkAndRequestGeolocationPermission();

        // // Kiểm tra xem trình duyệt có hỗ trợ Geolocation không
        // if ('geolocation' in navigator) {
        //     const options = {
        //         enableHighAccuracy: true, // Cố gắng lấy tọa độ chính xác nhất có thể
        //         timeout: 1, // Thời gian tối đa chờ đợi lấy tọa độ (ms)
        //         maximumAge: 0, // Tọa độ không được lấy từ bộ nhớ cache
        //     };

        //     // Bắt đầu theo dõi vị trí với tần số cập nhật 1 lần mỗi 10 giây
        //     const watchId = navigator.geolocation.watchPosition(
        //         (position) => {
        //             console.log(position.coords);
        //             const { latitude, longitude } = position.coords;
        //             setCurrentPosition({ lat: latitude, lng: longitude });
        //             if (latitude !== null && longitude !== null && targetLatitude !== 0 && targetLongitude !== 0) {
        //                 const dist = calculateDistance(latitude, longitude, targetLatitude, targetLongitude);
        //                 const bear = calculateBearing(latitude, longitude, targetLatitude, targetLongitude);

        //                 setDistance(dist);
        //                 setBearing(bear);
        //                 console.log(dist);
        //             }
        //         },
        //         (error) => {
        //             console.error('Lỗi khi lấy tọa độ GPS:', error);
        //         },
        //         options
        //     );

        //     setWatchId(watchId);
        // } else {
        //     console.log('Trình duyệt không hỗ trợ Geolocation.');
        // }

        // Khi component unmount, dừng theo dõi vị trí
        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, []);

    const isHeadingTowardTarget = () => {
        if (heading !== null && currentPosition !== null) {
            const userBearing = (360 + heading) % 360; // Chuyển đổi heading về khoảng [0, 360) độ
            const targetBearing = calculateBearing(
                currentPosition.lat,
                currentPosition.lng,
                targetLatitude,
                targetLongitude
            );
            setBearing(targetBearing);

            // So sánh hướng của người dùng và hướng đến mục tiêu
            const angleDifference = Math.abs(userBearing - targetBearing);
            // setDirector(targetBearing);
            // Cho phép một lỗi nhỏ trong khoảng 15 độ
            return angleDifference <= 15;
        }
        return false;
    };

    useEffect(() => {
        if (isHeadingTowardTarget()) {
            console.log('Người dùng đang đi đúng hướng đến mục tiêu.');
        } else {
            console.log('Người dùng đang không đi đúng hướng đến mục tiêu.');
        }
    }, [heading, currentPosition]);

    const [map, setMap] = useState(null);
    const onLoad = React.useCallback(function callback(mapInstance) {
        const bounds = new window.google.maps.LatLngBounds(currentPosition);
        mapInstance.fitBounds(bounds);

        setMap(mapInstance);
    }, []);
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    useEffect(() => {
        // Hàm này sẽ được gọi khi Google Map đã được tải lên
        if (map) {
            // Lấy kích thước của bản đồ
            const mapBounds = map.getBounds();

            // Kiểm tra nếu bản đồ đã được tải lên
            if (mapBounds) {
                // Tính toán giữa điểm của bản đồ và vị trí hiện tại
                const center = mapBounds.getCenter();
                const latLng = new window.google.maps.LatLng(currentPosition.lat, currentPosition.lng);

                // Tính khoảng cách từ vị trí hiện tại đến trung tâm của bản đồ
                const distance = window.google.maps.geometry.spherical.computeDistanceBetween(latLng, center);

                // Nếu khoảng cách lớn hơn một ngưỡng nhất định, thì scale lại bản đồ để marker gần mép màn hình
                if (distance > 40) {
                    map.panTo(latLng);
                    map.setZoom(1000); // Đặt lại mức độ phóng to mong muốn
                }
            }
        }
    }, [map, currentPosition]);

    return (
        <div>
            {currentPosition ? (
                <p>
                    Tọa độ GPS hiện tại: Lat {currentPosition.lat}, Lng {currentPosition.lng}
                </p>
            ) : (
                <p>Đang tải tọa độ GPS...</p>
            )}
            <h3>Distance: </h3>
            <p>{distance}</p>
            <h3>Degree: </h3>
            <p>{bearing}</p>
            {heading !== null ? (
                <div>
                    <h3>Heading:</h3>
                    <p>{heading} degrees</p>
                </div>
            ) : (
                <p>Đang lấy dữ liệu hướng đi...</p>
            )}
            <GoogleMap
                style={{ cursor: 'default !important' }}
                mapContainerStyle={mapStyles}
                zoom={1000}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <Marker
                    position={currentPosition}
                    icon={{
                        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                        scale: 5,
                        rotation: heading, // Sử dụng góc quay cho hướng
                        fillColor: 'blue',
                        fillOpacity: 1,
                        strokeWeight: 1,
                    }}
                />
                <Marker
                    position={{
                        lat: targetLatitude,
                        lng: targetLongitude,
                    }}
                    icon={{
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        strokeColor: '#393',
                    }}
                />
            </GoogleMap>
        </div>
    );
};

export default Home;
