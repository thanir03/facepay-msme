import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const loadFaceLandmarksDetection = async () => {
  const tf = await import("@tensorflow/tfjs");
  await tf.setBackend("webgl");
  await tf.ready();

  const backend = tf.getBackend();
  console.log("TensorFlow backend:", backend);

  const faceLandmarksDetection = await import(
    "@tensorflow-models/face-landmarks-detection"
  );

  return faceLandmarksDetection;
};

export const loadMediaPipeFaceLandmarker = async () => {
  try {
    // Create a FilesetResolver from the MediaPipe tasks-vision package
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );

    // Initialize the FaceLandmarker
    const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        delegate: "GPU",
      },
      outputFaceBlendshapes: true,
      outputFacialTransformationMatrixes: true,
      runningMode: "VIDEO",
      numFaces: 1,
    });

    console.log("MediaPipe FaceLandmarker loaded successfully");
    return faceLandmarker;
  } catch (error) {
    console.error("Failed to load MediaPipe FaceLandmarker:", error);
    throw error;
  }
};
