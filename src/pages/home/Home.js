// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import classes from './Home.module.scss';

// const targetLatitude = 10.766919739966264;
// const targetLongitude = 106.6948431326755;

// const Home = () => {
//     const [latitude, setLatitude] = useState(null);
//     const [longitude, setLongitude] = useState(null);
//     const [error, setError] = useState(null);
//     const [userLatitude, setUserLatitude] = useState(null);
//     const [userLongitude, setUserLongitude] = useState(null);
// const [targetLatitude, setTargetLatitude] = useState(10.766919739966264); // Thay thế bằng tọa độ GPS của mục tiêu
// const [targetLongitude, setTargetLongitude] = useState(106.6948431326755); // Thay thế bằng tọa độ GPS của mục tiêu
//     const [distance, setDistance] = useState(null);
//     const [bearing, setBearing] = useState(null);

//     // useEffect(() => {
//     //     const checkAndRequestGeolocationPermission = async () => {
//     //         const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });

//     //         if (permissionStatus.state === 'granted') {
//     //             // Người dùng đã cấp quyền, lấy tọa độ GPS
//     //             navigator.geolocation.getCurrentPosition(
//     //                 (position) => {
//     //                     setLatitude(position.coords.latitude);
//     //                     setLongitude(position.coords.longitude);
//     //                 },
//     //                 (error) => {
//     //                     setError(error.message);
//     //                 }
//     //             );
//     //         } else if (permissionStatus.state === 'prompt') {
//     //             // Người dùng chưa cấp quyền, yêu cầu cấp quyền
//     //             try {
//     //                 await navigator.geolocation.requestPermission();
//     //                 // Quyền đã được cấp, lấy tọa độ GPS
//     //                 navigator.geolocation.getCurrentPosition(
//     //                     (position) => {
//     //                         setLatitude(position.coords.latitude);
//     //                         setLongitude(position.coords.longitude);
//     //                     },
//     //                     (error) => {
//     //                         setError(error.message);
//     //                     }
//     //                 );
//     //             } catch (error) {
//     //                 setError('Không thể cấp quyền định vị geolocation.');
//     //             }
//     //         } else {
//     //             setError('Trình duyệt không hỗ trợ định vị geolocation.');
//     //         }
//     //     };

//     //     checkAndRequestGeolocationPermission();
//     // }, []);

//     // useEffect(() => {
//     //     // Hàm tính khoảng cách giữa hai điểm dựa trên tọa độ GPS
// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const earthRadiusKm = 6371; // Bán kính trái đất ở đơn vị kilômét
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(lat1 * (Math.PI / 180)) *
//             Math.cos(lat2 * (Math.PI / 180)) *
//             Math.sin(dLon / 2) *
//             Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return earthRadiusKm * c;
// };

//     //     // Hàm tính góc hướng giữa hai điểm dựa trên tọa độ GPS
// const calculateBearing = (lat1, lon1, lat2, lon2) => {
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const y = Math.sin(dLon) * Math.cos(lat2 * (Math.PI / 180));
//     const x =
//         Math.cos(lat1 * (Math.PI / 180)) * Math.sin(lat2 * (Math.PI / 180)) -
//         Math.sin(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.cos(dLon);
//     return (Math.atan2(y, x) * 180) / Math.PI;
// };

//     //     // Kiểm tra xem tọa độ GPS của người dùng và mục tiêu đã có chưa
// if (userLatitude !== null && userLongitude !== null && targetLatitude !== 0 && targetLongitude !== 0) {
//     const dist = calculateDistance(userLatitude, userLongitude, targetLatitude, targetLongitude);
//     const bear = calculateBearing(userLatitude, userLongitude, targetLatitude, targetLongitude);

//     setDistance(dist);
//     setBearing(bear);
//     console.log(dist);
// }
// }, [userLatitude, userLongitude, targetLatitude, targetLongitude]);

//     // useEffect(() => {
//     //     // Đây là nơi bạn có thể lấy tọa độ GPS hiện tại của người dùng, chẳng hạn qua Geolocation API hoặc các phương thức khác.

//     //     // Ví dụ: Lấy tọa độ GPS của người dùng từ Geolocation API
//     //     setInterval(() => {
//     //         console.log(2);
//     //         if (navigator.geolocation) {
//     //             navigator.geolocation.getCurrentPosition(
//     //                 (position) => {
//     //                     setUserLatitude(position.coords.latitude);
//     //                     setUserLongitude(position.coords.longitude);
//     //                 },
//     //                 (error) => {
//     //                     console.error(error.message);
//     //                 }
//     //             );
//     //         } else {
//     //             console.error('Geolocation is not supported by your browser.');
//     //         }
//     //     }, 500);
//     // }, []);

//     // return (
//     //     <div>
//     //         <h1>Xác định hướng và khoảng cách đến mục tiêu GPS trong React</h1>
//     //         {distance !== null && bearing !== null ? (
//     //             <div>
//     //                 <p>Khoảng cách đến mục tiêu: {distance.toFixed(2)} km</p>
//     //                 <p>Hướng: {bearing.toFixed(2)} độ</p>
//     //             </div>
//     //         ) : (
//     //             <p>Đang tính toán...</p>
//     //         )}
//     //         <h3>GPS hiện tại: </h3>
//     //         <p>Lat: {userLatitude}</p>
//     //         <p>Lng: {userLongitude}</p>
//     //         <h3>GPS đích: </h3>
//     //         <p>Lat: {targetLatitude}</p>
//     //         <p>Lng: {targetLongitude}</p>
//     //     </div>
//     // );

//     // useEffect(() => {
//     //     let watchId;

//     //     const successCallback = (position) => {
//     //         console.log(position);
//     //         setLatitude(position.coords.latitude);
//     //         setLongitude(position.coords.longitude);
//     //         setError(null);
//     //     };

//     //     const errorCallback = (error) => {
//     //         console.log(error.message);
//     //         setError(error.message);
//     //     };

//     //     if (navigator.geolocation) {
//     //         // Bắt đầu theo dõi vị trí
//     //         console.log('follow');
//     //         watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);
//     //     } else {
//     //         console.log('first');
//     //         setError('Geolocation is not supported by your browser.');
//     //     }

//     //     return () => {
//     //         // Ngừng theo dõi vị trí khi component bị unmount
//     //         console.log('unmount');
//     //         if (watchId) {
//     //             navigator.geolocation.clearWatch(watchId);
//     //         }
//     //     };
//     // }, []);

//     useEffect(() => {
//         // Tạo một bản đồ Google Maps
//         const map = new window.google.maps.Map(document.getElementById('map'), {
//             center: { lat: 0, lng: 0 },
//             zoom: 15,
//         });
//         console.log(map);

//         // Tạo một đối tượng để theo dõi vị trí người dùng
//         const geolocation = new window.google.maps.Geolocation(map);

//         // Theo dõi vị trí liên tục
//         const watchId = geolocation.watchPosition(
//             (position) => {
//                 const latitude = position.coords.latitude;
//                 const longitude = position.coords.longitude;

//                 // Tọa độ GPS đã được cập nhật
//                 console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

//                 // Tại đây, bạn có thể làm bất kỳ điều gì bạn muốn với tọa độ GPS này
//             },
//             (error) => {
//                 console.error(error);
//             }
//         );

//         // Nếu bạn muốn ngừng theo dõi vị trí, bạn có thể sử dụng watchId để clearWatch
//         // Hãy đảm bảo lưu watchId vào state hoặc biến toàn cục để có thể sử dụng clearWatch sau này
//         // window.navigator.geolocation.clearWatch(watchId);

//         return () => {
//             // Cleanup khi component unmount (nếu cần)
//             window.navigator.geolocation.clearWatch(watchId);
//         };
//     }, []); // Rỗng để chỉ chạy một lần khi component mount

//     return (
//         <div>
//             <h1>Lấy tọa độ GPS liên tục trong React</h1>
//             {latitude && longitude ? (
//                 <div>
//                     <p>Latitude: {latitude}</p>
//                     <p>Longitude: {longitude}</p>
//                 </div>
//             ) : (
//                 <p>{error}</p>
//             )}
//         </div>
//     );

//     // useEffect(() => {
//     //     const updateLocation = () => {
//     //         if (navigator.geolocation) {
//     //             navigator.geolocation.getCurrentPosition(
//     //                 (position) => {
//     //                     setLatitude(position.coords.latitude);
//     //                     setLongitude(position.coords.longitude);
//     //                     setError(null);
//     //                 },
//     //                 (error) => {
//     //                     setError(error.message);
//     //                 }
//     //             );
//     //         } else {
//     //             setError('Geolocation is not supported by your browser.');
//     //         }
//     //     };

//     //     // Cập nhật tọa độ GPS mỗi giây
//     //     const intervalId = setInterval(updateLocation, 1000);

//     //     // Hủy bỏ interval khi component bị unmount
//     //     return () => {
//     //         clearInterval(intervalId);
//     //     };
//     // }, []);
//     // console.log(latitude + '  ' + longitude);

//     // return (
//     //     <div>
//     //         <h1>Cập nhật tọa độ GPS mỗi giây trong React</h1>
//     //         {latitude && longitude ? (
//     //             <div>
//     //                 <p>Latitude: {latitude}</p>
//     //                 <p>Longitude: {longitude}</p>
//     //             </div>
//     //         ) : (
//     //             <p>{error}</p>
//     //         )}
//     //     </div>
//     // );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapStyles = {
    height: '400px',
    width: '100%',
};

const Home = () => {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [watchId, setWatchId] = useState(null);
    const [targetLatitude, setTargetLatitude] = useState(10.76663582574768); // Thay thế bằng tọa độ GPS của mục tiêu
    const [targetLongitude, setTargetLongitude] = useState(106.69544009294756); // Thay thế bằng tọa độ GPS của mục tiêu
    const [distance, setDistance] = useState(null);
    const [bearing, setBearing] = useState(null);

    const [heading, setHeading] = useState(null);
    const [director, setDirector] = useState(null);

    const calculateCompassHeading = (event) => {
        let newHeading = -event.alpha // Góc hướng đi (0-360 độ)

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
        return (Math.atan2(y, x) * 180) / Math.PI;
    };

    useEffect(() => {
        // Kiểm tra xem trình duyệt có hỗ trợ Geolocation không
        if ('geolocation' in navigator) {
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
        } else {
            console.log('Trình duyệt không hỗ trợ Geolocation.');
        }

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

            // So sánh hướng của người dùng và hướng đến mục tiêu
            const angleDifference = Math.abs(userBearing - targetBearing);
            setDirector(angleDifference);
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
          if (distance > 100) {
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
            <p>{director}</p>
            {heading !== null ? (
                <div>
                    <h3>Heading:</h3>
                    <p>{heading} degrees</p>
                </div>
            ) : (
                <p>Đang lấy dữ liệu hướng đi...</p>
            )}
            {/* <LoadScript googleMapsApiKey="AIzaSyARewUOnU_ihrOawcwjTS-G-EEJnTcVHRg">
                <GoogleMap mapContainerStyle={mapStyles} center={currentPosition} zoom={15}>
                    {currentPosition && <Marker position={currentPosition} />}
                </GoogleMap>
            </LoadScript> */}
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
                {/* <Marker position={newGeocode} icon={customMarkerIcon} /> */}
            </GoogleMap>
        </div>
    );
};

export default Home;
