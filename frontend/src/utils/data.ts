import axios, { AxiosInstance } from "axios";
import consts from "./consts";
import { v4 as uuid } from "uuid";

type Entity = {
  id: string;
  saved: string[];
  history: string[];
  reads: Read[];
};

type Read = {
  name: string;
  chapter: number;
};

export class Data {
  static #instance: Data;

  private id: string = "";

  private api: AxiosInstance;

  private saved: string[] = [];
  private reads: Read[] = [];

  private constructor() {
    this.syncId();

    this.api = axios.create({
      //   baseURL: "http://localhost:3000",
      baseURL: `https://wos-backend.vercel.app`,
    });
  }

  static get instance(): Data {
    if (!Data.#instance) {
      Data.#instance = new Data();
    }
    return Data.#instance;
  }

  private syncId() {
    let storedId = localStorage.getItem(consts.DEVICE_ID_KEY);
    if (!storedId) {
      storedId = uuid();
      localStorage.setItem(consts.DEVICE_ID_KEY, storedId);
    }
    this.id = storedId;
  }

  setId(id: string) {
    this.id = id;
    localStorage.setItem(consts.DEVICE_ID_KEY, id);
  }

  getId(): string {
    return this.id;
  }

  async sync() {
    this.syncId();

    const res = await this.api.get(`/entity/${this.id}`);
    if (res.status !== 200) {
      return;
    }

    const { saved, reads } = res.data as Entity;
    this.saved = [...saved];
    this.reads = [...reads].reverse();
  }

  getSaved(): string[] {
    return this.saved;
  }

  getHistory(): string[] {
    return this.reads.map((read) => read.name);
  }

  getRead(manga: string) {
    return this.reads.find((read) => read.name === manga)?.chapter || 1;
  }

  isMangaSaved(manga: string) {
    return this.saved.includes(manga);
  }

  async addMangaSaved(manga: string) {
    this.saved = [manga, ...this.saved];

    this.api
      .post(`/entity/${this.id}`, { saved: this.saved })
      .then(() => {})
      .catch(() => {});
  }

  async removeMangaSaved(manga: string) {
    this.saved = this.saved.filter((e) => e !== manga);

    this.api
      .post(`/entity/${this.id}`, { saved: this.saved })
      .then(() => {})
      .catch(() => {});
  }

  updateMangaAvancement(newRead: Read) {
    const index = this.reads.findIndex((read) => read.name === newRead.name);
    if (index !== -1) {
      this.reads[index].chapter = newRead.chapter;
    } else {
      this.reads.push(newRead);
    }

    this.api
      .post(`/entity/${this.id}`, { reads: this.reads })
      .then(() => {})
      .catch(() => {});
  }
}
