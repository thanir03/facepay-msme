"use client";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { drawMesh } from "../../../utilities";
import { loadFaceLandmarksDetection } from "../../../util";

export default function FaceScan({
  onConfirm,
  showInstructions = true,
}: {
  onConfirm: (image: string) => void;
  showInstructions?: boolean;
}) {
  const faceRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      const faceLandmarksDetection = await loadFaceLandmarksDetection();
      const detector = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
        {
          runtime: "mediapipe",
          refineLandmarks: true,
          solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
        }
      );

      intervalRef.current = setInterval(() => {
        detect(detector);
        setScanning((scanning) => {
          if (scanning >= 100) {
            clearInterval(intervalRef.current!);
            return 100;
          }
          return scanning + 1;
        });
      }, 10);
    };
    loadModel();

    return () => {
      console.log("clearing interval");
      clearInterval(intervalRef.current!);
      // Stop the camera stream on unmount
      if (
        faceRef.current &&
        faceRef.current.video &&
        faceRef.current.video.srcObject
      ) {
        const stream = faceRef.current.video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (scanning >= 100) {
      setTimeout(() => {
        captureImage();
      }, 1000);
    }
  }, [scanning]);

  const captureImage = () => {
    if (!faceRef.current || !hiddenCanvasRef.current || !canvasRef.current)
      return;
    const video = faceRef.current;
    const canvas = canvasRef.current;
    canvas!.width = video.video!.videoWidth;
    canvas!.height = video.video!.videoHeight;
    const ctx = canvas!.getContext("2d");

    if (ctx && hiddenCanvasRef.current) {
      ctx.drawImage(video.video!, 0, 0, canvas!.width, canvas!.height);
      const dataUrl = canvas!.toDataURL("image/png");
      onConfirm(dataUrl);
      console.log("captured", dataUrl);
    } else {
      console.log("ctx is null");
    }
  };

  const detect = async (net: any) => {
    if (
      faceRef.current &&
      faceRef.current.video &&
      faceRef.current.video.readyState === 4 &&
      canvasRef.current
    ) {
      console.log("Running detect", canvasRef.current);
      // Get Video Properties
      const video = faceRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await net.estimateFaces({ input: video });

      if (canvasRef.current) {
        // Get canvas context
        const ctx = canvasRef.current.getContext("2d")!;
        requestAnimationFrame(() => {
          ctx.clearRect(
            0,
            0,
            canvasRef.current!.width,
            canvasRef.current!.height
          );
          drawMesh(face, ctx);
        });
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div className="flex flex-col items-center justify-center z-10">
        {/* Container for video and SVG overlay */}
        <div className="relative w-[400px] h-[400px] mb-8 flex items-center justify-center rounded-full overflow-hidden">
          <Webcam
            ref={faceRef}
            autoPlay
            playsInline
            className="object-cover w-full h-full border-4 border-gray-300 bg-black rounded-full"
            style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
          />
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
          />
          <canvas
            ref={hiddenCanvasRef}
            width={400}
            height={400}
            className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none hidden"
          />
          {/* Progress Bar Overlay */}
          <svg
            width={400}
            height={400}
            className="absolute top-0 left-0 pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <circle
              cx={200}
              cy={200}
              r={192}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={12}
            />
            <circle
              cx={200}
              cy={200}
              r={192}
              fill="none"
              stroke={
                scanning < 33
                  ? "#ef4444"
                  : scanning < 66
                  ? "#facc15"
                  : "#22c55e"
              }
              strokeWidth={16}
              strokeDasharray={2 * Math.PI * 192}
              strokeDashoffset={
                2 * Math.PI * 192 * (1 - Math.min(scanning, 100) / 100)
              }
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 0.4s, stroke 0.4s",
                filter: "drop-shadow(0 0 6px rgba(0,0,0,0.12))",
              }}
            />
          </svg>
          {/* Numeric Progress */}
          <div
            className="absolute left-1/2 bottom-[-15] z-10"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <span className="text-4xl font-bold text-black drop-shadow-lg bg-white/80 px-6 py-2 rounded-full ">
              {scanning}%
            </span>
          </div>
        </div>
        {/* Instructions and steps */}
        {showInstructions && (
          <div className="flex flex-col items-center justify-center z-10 bg-white/80 rounded-2xl p-8 shadow-xl border border-gray-200 pb-0">
            <div className="mb-6 flex flex-col gap-2 items-center">
              <span className="text-black text-2xl font-extrabold drop-shadow-sm tracking-tight">
                Face Scan Instructions
              </span>
              <span className="text-gray-600 text-base font-medium">
                Please follow these steps for best results:
              </span>
            </div>
            <ul className="mb-8 space-y-3 w-full max-w-xs">
              <li className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-400 text-black font-bold shadow">
                  1
                </span>
                <span className="text-black text-lg font-semibold">
                  Look directly at the camera
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-400 text-black font-bold shadow">
                  2
                </span>
                <span className="text-black text-lg font-semibold">
                  Ensure good lighting
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-400 text-black font-bold shadow">
                  3
                </span>
                <span className="text-black text-lg font-semibold">
                  Keep your face within the frame
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
