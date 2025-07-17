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
