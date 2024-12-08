'use server'

import { revalidatePath } from 'next/cache'

let processingStatus = ''
let selectedModelSize = ''
let selectedTargetLanguage = ''
let generatedSubtitles = ''

export async function processVideo(formData: FormData) {
  const video = formData.get('video') as File
  selectedModelSize = formData.get('modelSize') as string
  selectedTargetLanguage = formData.get('targetLanguage') as string
  
  // 模拟处理过程
  processingStatus = 'uploading'
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  processingStatus = 'generating subtitles'
  // 模拟不同模型大小的处理时间
  const processingTime = selectedModelSize === 'small' ? 2000 : selectedModelSize === 'medium' ? 3000 : 4000
  await new Promise(resolve => setTimeout(resolve, processingTime))
  
  processingStatus = 'translating subtitles'
  // 模拟翻译时间
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  processingStatus = 'adding subtitles to video'
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // 生成模拟字幕
  generatedSubtitles = `1
00:00:01,000 --> 00:00:04,000
${selectedTargetLanguage === 'en' ? 'Hello, welcome to our video.' : '你好，欢迎观看我们的视频。'}

2
00:00:05,000 --> 00:00:08,000
${selectedTargetLanguage === 'en' ? 'Today, we will discuss an important topic.' : '今天，我们将讨论一个重要的话题。'}

3
00:00:09,000 --> 00:00:12,000
${selectedTargetLanguage === 'en' ? 'Please stay tuned until the end.' : '请持续关注到最后。'}
`
  
  processingStatus = 'completed'
  
  revalidatePath('/')
}

export async function getProcessingStatus() {
  return processingStatus
}

export async function getSelectedModelSize() {
  return selectedModelSize
}

export async function getSelectedTargetLanguage() {
  return selectedTargetLanguage
}

export async function getSubtitles() {
  return generatedSubtitles
}

