/// <reference types="vite/client" />
type Reciter = {
  id: string;
  name: string;
  letter: string;
  img: string | undefined;
  date: string | null;
  bio: string | null;
  moshaf: Omit<Moshaf> & { surah_list: string }[];
};

interface ReciterResponse {
  length: number;
  message: string;
  reciters: {
    data: Reciter[];
    letter: string;
  }[];
}
type ReciterDetailsResponse = {
  message: string;
  reciter: Reciter;
};

type ReciterExtraInfoType = Reciter & {
  country: string;
  img: string | undefined;
  info: string;
};
interface Moshaf {
  id: number;
  name: string;
  server: string;
  surah_total: number;
  suwar: Surah[];
}
interface Surah {
  id: number;
  name: string;
  start_page: number;
  end_page: number;
  mekkia: number;
  type: number;
}
interface Radio {}
interface LiveChannel {}
interface RecitersRecentRead {}

type MediaInfoType = Surah & {};
type selectedReciterType = {
  reciter: Reciter | undefined;
  reciterInf: ReciterExtraInfoType | undefined;
};
