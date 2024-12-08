'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { processVideo } from '../actions'
import { Upload } from 'lucide-react'
import LanguageSelector from './LanguageSelector'

export default function VideoUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [modelSize, setModelSize] = useState('medium')
  const [targetLanguage, setTargetLanguage] = useState('en')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('video', file)
    formData.append('modelSize', modelSize)
    formData.append('targetLanguage', targetLanguage)

    await processVideo(formData)
    setUploading(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">点击上传</span> 或拖放</p>
            <p className="text-xs text-gray-500">MP4, AVI, MOV (最大 100MB)</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
        </label>
      </div>
      {file && (
        <p className="text-sm text-gray-500 text-center">
          已选择文件: {file.name}
        </p>
      )}
      <div className="space-y-2">
        <label htmlFor="model-size" className="block text-sm font-medium text-gray-700">
          选择语音识别模型大小
        </label>
        <select
          id="model-size"
          value={modelSize}
          onChange={(e) => setModelSize(e.target.value)}
          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="small">小型 (快速但准确度较低)</option>
          <option value="medium">中型 (平衡速度和准确度)</option>
          <option value="large">大型 (较慢但准确度高)</option>
        </select>
      </div>
      <LanguageSelector onLanguageChange={setTargetLanguage} />
      <button
        type="submit"
        disabled={!file || uploading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {uploading ? '上传中...' : '上传并处理视频'}
      </button>
    </form>
  )
}

