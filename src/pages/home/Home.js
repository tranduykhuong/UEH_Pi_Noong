import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapStyles = {
    height: '400px',
    width: '100%',
};

const data = [
    {
        id: 'A1',
        lat: 10.766894,
        lng: 106.695466,
    },
    {
        id: 'A2',
        lat: 10.766970623687978,
        lng: 106.69504968618132,
    },
    {
        id: 'A3',
        lat: 10.766703394544189,
        lng: 106.69524844454077,
    },
    {
        id: 'A4',
        lat: 10.766736589044667,
        lng: 106.69497602048739,
    },
];

const Home = () => {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [watchId, setWatchId] = useState(null);
    const [distance, setDistance] = useState(null);
    const [bearing, setBearing] = useState(null);

    const [heading, setHeading] = useState(null);

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
        const handleWatchPosition = () => {
            const options = {
                enableHighAccuracy: true, // Cố gắng lấy tọa độ chính xác nhất có thể
                timeout: 1, // Thời gian tối đa chờ đợi lấy tọa độ (ms)
                maximumAge: 0, // Tọa độ không được lấy từ bộ nhớ cache
            };
            // Bắt đầu theo dõi vị trí với tần số cập nhật 1 lần mỗi 10 giây
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    setCurrentPosition({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Lỗi khi lấy tọa độ GPS:', error);
                },
                options
            );
            setWatchId(watchId);
        };

        const checkAndRequestGeolocationPermission = () => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const heading = position.coords.heading;
                        setHeading(heading);
                        handleWatchPosition();
                    },
                    (error) => {
                        console.error('Không thể lấy vị trí:', error.message);
                        // Xử lý lỗi ở đây
                    }
                );
            } else {
                console.log('Trình duyệt không hỗ trợ định vị geolocation.');
            }
        };

        checkAndRequestGeolocationPermission();

        // Khi component unmount, dừng theo dõi
        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, []);

    useEffect(() => {
        const isHeadingTowardTarget = () => {
            if (heading !== null && currentPosition !== null) {
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    const targetBearing = calculateBearing(
                        currentPosition.lat,
                        currentPosition.lng,
                        element.lat,
                        element.lng
                    );
                    setBearing(targetBearing);

                    const dist = calculateDistance(currentPosition.lat, currentPosition.lng, element.lat, element.lng);
                    setDistance(dist);

                    // So sánh hướng của người dùng và hướng đến mục tiêu
                    const angleDifference = Math.abs(heading - targetBearing);
                    // if (angleDifference < 10 && dist < 0.01) {
                    //     alert(element.id);
                    // }
                }
            }
            // calculateAngleToNorth(currentPosition?.lat || 0, currentPosition?.lng || 0);
        };

        isHeadingTowardTarget();
    }, [heading, currentPosition]);

    // MAP
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

    // GEOLOCATION
    const handleGetGeolocation = () => {
        console.log(currentPosition);
        if (currentPosition !== null) {
            alert('Lat: ' + currentPosition.lat + '\nLng: ' + currentPosition.lng);
        }
    };

    return (
        <div>
            {currentPosition ? (
                <p>
                    Tọa độ GPS hiện tại: <br /> Lat {currentPosition.lat} <br /> Lng {currentPosition.lng}
                </p>
            ) : (
                <p>Đang tải tọa độ GPS...</p>
            )}
            {/* <h3>Distance: </h3>
            <p>{distance}</p>
            <h3>Degree: </h3>
            <p>{bearing}</p> */}
            {/* {heading !== null ? (
                <div>
                    <h3>Heading:</h3>
                    <p>{heading} degrees</p>
                </div>
            ) : (
                <p>Đang lấy dữ liệu hướng đi...</p>
            )} */}
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
                {data.map((item, idx) => (
                    <Marker
                        position={{
                            lat: item.lat,
                            lng: item.lng,
                        }}
                        icon={{
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 8,
                            strokeColor: '#393',
                        }}
                    />
                ))}
            </GoogleMap>

            <button
                onClick={handleGetGeolocation}
                style={{
                    padding: '20px',
                    width: 'calc(100% - 40px)',
                    margin: '20px',
                    backgroundColor: 'blue',
                    color: 'white',
                }}
            >
                Get GPS
            </button>
        </div>
    );
};

export default Home;
