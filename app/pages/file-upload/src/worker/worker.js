import CanvasRenderer from "./canvasRenderer.js"
import MP4Demuxer from "./mp4Demuxer.js"
import VideoProcessor from "./videoProcessor.js"

const mp4Demuxer = new MP4Demuxer()
const videoProcessor = new VideoProcessor({ mp4Demuxer })

const qvgaConstrains = {
  with: 320,
  height: 240,
}
const vgaConstrains = {
  with: 640,
  height: 480,
}

const hdConstrains = {
  with: 1270,
  height: 720,
}

const encoderConfig = {
  ...qvgaConstrains,
  bitrate: 10e6,
  // Webm
  codec: 'vp09.00.10.08',
  pt: 4,
  hardwareAcceleration: 'prefer-software',
  // MP4
  // codec: 'avc1.42002A',
  // pt: 1,
  // hardwareAcceleration: 'prefer-hardware',
  // avc: { format: 'annexb' }
}

onmessage = async ({ data }) => {
  await videoProcessor.start({
    file: data.file,
    renderFrame: CanvasRenderer.getRender(data.canvas),
    encoderConfig,
    sendMessage(message) {
      self.postMessage(message)
    }
  })

  self.postMessage({
    status: 'done'
  })
}