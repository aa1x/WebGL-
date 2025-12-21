const canvas = document.getElementById("webglCanvas");
const stream = canvas.captureStream(60);
const recorder = new MediaRecorder(stream, {
  mimeType: "video/webm; codecs=vp9",
  videoBitsPerSecond: 80_000_000 // 80 Mbps，适合 3250x1404
});
const chunks = [];
recorder.ondataavailable = e => chunks.push(e.data);
recorder.onstop = () => {
  const blob = new Blob(chunks, { type: "video/webm" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "webgl-original-3250x1404.webm";
  a.click();
};
recorder.start();
setTimeout(() => recorder.stop(), 15000);
