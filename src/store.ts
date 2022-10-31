import { reactive } from "vue";
import {
  iconAPI as defaultIconAPI,
  bookMarks as defaultBookMarks,
  searchJump as defaultSearchJump,
  openBookMarkJump as defaultOpenBookMarkJump,
} from "@/assets/ts/custom";
import { LocalDB } from "@/assets/ts/db";
import { defaultEngine } from "@/assets/ts/search";
import type { BookMarks } from "@/assets/ts/types";

const db = new LocalDB();
const iconAPI = db.iconAPI;
const userbookMarks = db.bookMarks;
const searchJump = db.searchJump;
const openBookMarkJump = db.openBookMarkJump;
const searchEngine = db.searchEngine;
const isDarkTheme = db.theme == "dark" ? true : false;
const bookMarks =
  userbookMarks && typeof userbookMarks != "string"
    ? userbookMarks
    : defaultBookMarks;

export const store = reactive({
  iconAPI: iconAPI ? iconAPI : defaultIconAPI,
  bookMarks: bookMarks,
  isDarkTheme: isDarkTheme,
  changeTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  },
  searchJump: searchJump ? searchJump : defaultSearchJump,
  openBookMarkJump: openBookMarkJump
    ? openBookMarkJump
    : defaultOpenBookMarkJump,
  searchEngine:
    searchEngine && typeof searchEngine != "string"
      ? searchEngine
      : defaultEngine,
  setIconAPI(api: string) {
    if (api) {
      this.iconAPI = api;
    } else {
      this.iconAPI = defaultIconAPI;
    }
  },
  setBookMarks(content: string) {
    if (content) {
      const contentObject: BookMarks[] = JSON.parse(content);
      this.bookMarks = contentObject;
    } else {
      this.bookMarks = defaultBookMarks;
    }
  },
  setSearchJump(value: string) {
    this.searchJump = value;
  },
  setOpenBookMarkJump(value: string) {
    this.openBookMarkJump = value;
  },
});
