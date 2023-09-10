import React, { useState, useRef, useEffect } from 'react';
import anh from '../../assets/imgs/Heart Health.png';

const CameraComponent = ({ start, onStop, setImg }) => {
    const [stream, setStream] = useState(null);
    const videoRef = useRef();
    const canvasRef = useRef();
    const streamRef = useRef();

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            setStream(stream);
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            const tracks = streamRef.current.getTracks();
            tracks.forEach((track) => track.stop());
            setStream(null);
            setTimeout(() => {
                onStop(false);
            }, 1000);
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            const photoURL = canvas.toDataURL('image/jpeg');
            // You can do something with the captured photoURL here
            setImg(photoURL);
            stopCamera();
        }
    };

    const toggleImage = () => {
        requestAnimationFrame(drawOnVideo);
    };

    const drawOnVideo = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            console.log(canvas.width);

            // Vẽ video lên canvas
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Vẽ hình vuông màu đỏ lên video (đây là ví dụ)
            // ctx.fillStyle = 'red';
            // ctx.fillRect(10, 50, 100, 100); // Thay đổi tọa độ và kích thước tùy ý

            ctx.beginPath();
            ctx.arc(100, 100, 50, 0, 2 * Math.PI); // Thay đổi tọa độ và kích thước tùy ý
            ctx.fillStyle = 'blue';
            ctx.fill();

            // const icon = new Image();
            // icon.src =
            //     'https://png.pngtree.com/png-clipart/20220603/original/pngtree-red-location-icon-sign-png-image_7886920.png'; // Thay đổi đường dẫn đến hình ảnh biểu tượng của bạn
            // icon.onload = () => {
            //     // Vẽ biểu tượng lên video
            //     ctx.drawImage(icon, 100, 100, 50, 50); // Thay đổi tọa độ và kích thước tùy ý
            //     ctx.fill();
            // };

            // Gọi lại hàm này trong vòng lặp requestAnimationFrame để vẽ liên tục
            requestAnimationFrame(drawOnVideo);
        }
    };

    useEffect(() => {
        if (start) {
            startCamera();
        } else {
            stopCamera();
        }
    }, [start]);

    useEffect(() => {
        startCamera();
    }, [start]);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.9)',
                zIndex: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* <button onClick={startCamera}>Start Camera</button> */}
            <div
                style={{ margin: 'auto', display: 'flex', flexDirection: 'column', maxWidth: '100vw', height: '100vh' }}
            >
                {stream && <video style={{ height: 0 }} ref={videoRef} autoPlay></video>}
                {stream && (
                    <button className="btn-primary ml-8 btn-lg" style={{ marginLeft: '-1px' }} onClick={toggleImage}>
                        Chụp ảnh
                    </button>
                )}
                <canvas ref={canvasRef} width="480" height="640"></canvas>
            </div>
        </div>
    );
};

export default CameraComponent;
