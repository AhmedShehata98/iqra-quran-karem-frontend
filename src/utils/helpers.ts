import axios from 'axios'

export function prefixSurahNumber(surahNumber: number) {
  if (surahNumber) {
    return surahNumber.toString().padStart(3, '0')
  }
  return surahNumber
}
