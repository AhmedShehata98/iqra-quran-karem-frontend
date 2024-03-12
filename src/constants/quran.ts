import { ENDPOINTS, QuranAxios } from './api'

export async function getAllReciters({
  limit,
  page,
}: {
  limit: number
  page: number
}): Promise<ReciterResponse> {
  try {
    const res = await QuranAxios({
      url: ENDPOINTS.reciters,
      params: { limit, page },
    })
    return res.data
  } catch (error) {
    throw error
  }
}
export async function getReciterDetails(
  reciterId: string,
): Promise<ReciterDetailsResponse> {
  try {
    const res = await QuranAxios({
      url: `${ENDPOINTS.reciters}/${reciterId}`,
    })
    return res.data
  } catch (error) {
    throw error
  }
}
export async function getAllSuwar({
  lang = 'ara',
}: {
  lang: string
}): Promise<Surah[]> {
  try {
    const { data } = await QuranAxios({
      url: ENDPOINTS.suwar,
      params: { lang },
    })
    return data.suwar
  } catch (error) {
    throw error
  }
}
export async function getAllMoshafWays({
  reciterId,
  moshafId,
}: {
  reciterId?: string
  moshafId?: number
}): Promise<Moshaf[]> {
  try {
    const reciters = await QuranAxios({
      url: `${ENDPOINTS.moshaf}/${reciterId}/${moshafId}`,
    })
    return reciters.data
  } catch (error) {
    throw error
  }
}
export async function getAllRecitersRecentReads({
  lang = 'ara',
}: {
  lang?: string
}): Promise<RecitersRecentRead[]> {
  try {
    const reciters = await QuranAxios({
      url: ENDPOINTS.recent_reads,
      params: { lang },
    })
    return reciters.data
  } catch (error) {
    throw error
  }
}
export async function getAllQuranLiveChannels({
  lang = 'ara',
}: {
  lang?: string
}): Promise<LiveChannel[]> {
  try {
    const reciters = await QuranAxios({
      url: ENDPOINTS.liveTv,
      params: { lang },
    })
    return reciters.data
  } catch (error) {
    throw error
  }
}
export async function getAllQuranRadios({
  lang = 'ara',
}: {
  lang?: string
  last_updated_date?: string
}): Promise<Radio[]> {
  try {
    const reciters = await QuranAxios({
      url: ENDPOINTS.recent_reads,
      params: { lang },
    })
    return reciters.data
  } catch (error) {
    throw error
  }
}
