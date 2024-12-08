'use client'

import { useEffect, useState } from 'react'
import { getProcessingStatus, getSelectedModelSize, getSelectedTargetLanguage } from '../actions'

export default function ProcessingStatus() {
  const [status, setStatus] = useState<string>('')
  const [modelSize, setModelSize] = useState<string>('')
  const [targetLanguage, setTargetLanguage] = useState<string>('')

  useEffect(() => {
    const checkStatus = async () => {
      const currentStatus = await getProcessingStatus()
      const currentModelSize = await getSelectedModelSize()
      const currentTargetLanguage = await getSelectedTargetLanguage()
      setStatus(currentStatus)
      setModelSize(currentModelSize)
      setTargetLanguage(currentTargetLanguage)

      if (currentStatus !== 'completed') {
        setTimeout(checkStatus, 1000)
      }
    }

    checkStatus()
  }, [])

  if (!status) return null

  const getStatusPercentage = () => {
    switch (status) {
      case 'uploading': return 20
      case 'generating subtitles': return 40
      case 'translating subtitles': return 60
      case 'adding subtitles to video': return 80
      case 'completed': return 100
      default: return 0
    }
  }

  const getModelSizeText = (size: string) => {
    switch (size) {
      case 'small': return '小型'
      case 'medium': return '中型'
      case 'large': return '大型'
      default: return ''
    }
  }

  const getLanguageText = (lang: string) => {
    const languages: { [key: string]: string } = {
      'en': '英语',
      'es': '西班牙语',
      'fr': '法语',
      'de': '德语',
      'it': '意大利语',
      'ja': '日语',
      'ko': '韩语',
      'zh': '中文'
    }
    return languages[lang] || lang
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">处理状态</h2>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${getStatusPercentage()}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 capitalize">{status === 'completed' ? '处理完成' : status}</p>
      {modelSize && (
        <p className="text-sm text-gray-600">
          使用的模型大小: {getModelSizeText(modelSize)}
        </p>
      )}
      {targetLanguage && (
        <p className="text-sm text-gray-600">
          目标语言: {getLanguageText(targetLanguage)}
        </p>
      )}
    </div>
  )
}

