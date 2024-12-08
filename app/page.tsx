import VideoUploadForm from './components/VideoUploadForm'
import ProcessingStatus from './components/ProcessingStatus'
import DownloadVideo from './components/DownloadVideo'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          视频字幕在线生成器
        </h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 space-y-6">
            <VideoUploadForm />
            <ProcessingStatus />
            <DownloadVideo />
          </div>
        </div>
      </div>
    </main>
  )
}

