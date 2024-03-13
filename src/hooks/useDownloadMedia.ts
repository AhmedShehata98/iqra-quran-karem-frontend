import axios from 'axios'
import { ref, onMounted } from 'vue'
export default function useDownloadMedia() {
  const isLoading = ref(false)
  const isError = ref<boolean | null>(null)
  const error = ref<string | null>(null)

  const createAnchor = ({
    blob,
    fileName,
    url,
  }: {
    url
    blob: string | ArrayBuffer | null
    fileName: string | null
  }) => {
    if (!blob) {
      isError.value = true
      error.value = 'Error ,in anchor tag blob is null '
      return
    }
    const a = document.createElement('a')
    a.setAttribute('href', blob as string)
    a.setAttribute(
      'download',
      fileName ?? url.split('/')[url.split('/').length - 1],
    )
    document.body.appendChild(a)
    return a
  }
  const downloadFile = async ({
    url,
    fileName = null,
  }: {
    url: string
    fileName?: string | null
  }) => {
    try {
      const res = await axios({
        url,
        responseType: 'blob',
        method: 'GET',
      })
      isLoading.value = true

      const fileReader = new FileReader()
      if (res.data) {
        fileReader.readAsDataURL(res.data)
        fileReader.addEventListener(
          'progress',
          (ev: ProgressEvent<FileReader>) => {
            if ((ev.currentTarget as any)?.readyState === 1) {
              //done
              isLoading.value = false
            }
            if ((ev.currentTarget as any)?.readyState === 2) {
              //done
              isLoading.value = true
            }
          },
        )
        fileReader.addEventListener('loadend', () => {
          const link = createAnchor({ url, blob: fileReader.result, fileName })
          if (link) {
            link.click()
          }
        })
      }
    } catch (error: any) {
      isLoading.value = false
      isError.value = true
      error.value = error.message
    }
  }

  return { isLoading, isError, error, downloadFile }
}
