import axios from 'axios'

export function prefixSurahNumber(surahNumber: number) {
  if (surahNumber) {
    return surahNumber.toString().padStart(3, '0')
  }
  return surahNumber
}

export const downloadFile = async ({
  url,
  fileName = null,
  cb,
}: {
  url: string
  fileName?: string | null
  cb: (isLoading: boolean) => void
}) => {
  try {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.send()
    cb(true)
    if (xhr.status === 200) {
      const blob = new Blob(xhr.response, { type: 'application/octet-stream' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = fileName ?? url.split('/')[url.split('/').length - 1]

      link.click()
      cb(false)
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}
