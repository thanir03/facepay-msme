import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

export default function IDScan({
  onConfirm,
  idImage,
}: {
  onConfirm: (image: string) => void;
  idImage: string | null;
}) {
  const idRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const idImageRef = useRef<HTMLImageElement>(null);
  const [showImage, setShowImage] = useState(idImage !== null);

  useEffect(() => {
    if (showImage) return;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((mediaStream) => {
        if (idRef.current) {
          idRef.current.srcObject = mediaStream;
        }
      })
      .catch((e) => {
        console.log("error getting media stream", e);
        console.log(e);
      });
  }, [showImage]);

  const captureImage = () => {
    console.log("capturing id image");
    if (!idRef.current || !canvasRef.current) return;
    const video = idRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    if (ctx && idImageRef.current) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      idImageRef.current.src = dataUrl;
      setShowImage(true);
    } else {
      console.log("ctx is null");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div className="flex flex-col items-center justify-center z-10">
        <div className="flex flex-col items-center justify-center z-10 w-[300vw] max-w-[750px] aspect-[1.586/1] mb-8 gap-5">
          <p className="text-black text-2xl font-bold mb-8 drop-shadow-lg">
            Scan your National Identity Card
          </p>
          {!showImage && (
            <video
              ref={idRef}
              autoPlay
              playsInline
              className={"inset-0 w-full h-full object-cover z-0 rounded-lg "}
              style={{ background: "#000" }}
            />
          )}
          <img
            ref={idImageRef}
            src={idImage ?? ""}
            alt="id"
            className={
              "w-full h-full object-cover " + (showImage ? "" : "hidden")
            }
          />

          {!showImage && (
            <div className="flex items-center justify-center flex-col z-10">
              <span className="text-black text-2xl font-bold mb-8 drop-shadow-lg">
                Align your ID card in the rectangle
              </span>
              <Button
                onClick={() => captureImage()}
                className="mt-4 z-20 cursor-pointer"
              >
                Capture ID Card
              </Button>
            </div>
          )}
          {showImage && (
            <div className="flex flex-col items-center justify-center z-10 mt-0">
              <span className="text-black text-lg font-semibold mb-4">
                Is this image clear and readable?
              </span>
              <div className="flex gap-4">
                <Button onClick={() => setShowImage(false)}>Retake</Button>
                <Button
                  onClick={() => {
                    console.log("Running onConfirm");
                    onConfirm(idImageRef.current?.src ?? "");
                  }}
                  variant="secondary"
                >
                  Yes, looks good
                </Button>
              </div>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
}
