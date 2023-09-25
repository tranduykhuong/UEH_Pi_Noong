import React, { useState, useRef, useEffect } from 'react';
import anh from '../../assets/imgs/Heart Health.png';

const CameraComponent = ({ start, onStop, setImg }) => {
    const [isDraw, setIsDraw] = useState(false);
    const [stream, setStream] = useState(null);
    const [idAnimate, setIdAnimate] = useState(null);
    const videoRef = useRef();
    const streamRef = useRef();
    const canvasRef = useRef();

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

    const drawOnVideo = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // Vẽ video lên canvas
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            if (isDraw) {
                ctx.arc(100, 100, 50, 0, 2 * Math.PI);
                ctx.fillStyle = 'blue';
            }
            ctx.fill();

            const id = requestAnimationFrame(drawOnVideo);
            cancelAnimationFrame(id - 1);
            setIdAnimate(id);
        }
    };

    const toggleImage = () => {
        const id = requestAnimationFrame(drawOnVideo);
        setIdAnimate(id);
    };

    const handleDraw = () => {
        setIsDraw((prev) => !prev);
        cancelAnimationFrame(idAnimate);
        toggleImage();
    };

    const handleStopCanvas = () => {
        cancelAnimationFrame(idAnimate);
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
    }, []);

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
            <div
                style={{ margin: 'auto', display: 'flex', flexDirection: 'column', maxWidth: '100vw', height: '100vh' }}
            >
                <>
                    <button style={{ padding: 10 }} onClick={toggleImage}>
                        Start
                    </button>
                    <button style={{ padding: 10 }} onClick={handleStopCanvas}>
                        Stop
                    </button>
                    <button style={{ padding: 10 }} onClick={handleDraw}>
                        Draw
                    </button>
                </>
                {stream && <video ref={videoRef} style={{ height: 0 }} autoPlay></video>}
                <canvas ref={canvasRef} width="480" height="640"></canvas>
            </div>
        </div>
    );
};

export default CameraComponent;
