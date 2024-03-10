import axios from "axios";

export const baseUrl: string = import.meta.env.VITE_BASE_URL;

export const QuranAxios = axios.create({ baseURL: baseUrl });

export const ENDPOINTS = {
  reciters: "reciters",
  suwar: "suwar",
  moshaf: "moshaf",
  recent_reads: "recent_reads",
  liveTv: "live-tv",
  radios: "radios",
};
