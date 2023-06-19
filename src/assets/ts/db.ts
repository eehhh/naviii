import { downloadFile } from "@/assets/ts/utils";

class LocalDB {
  keys: string[];
  private conn: Storage;

  constructor() {
    this.keys = [
      "theme",
      "iconAPI",
      "searchJump",
      "openBookMarkJump",
      "searchEngine",
      "bookMarks",
    ];
    this.conn = localStorage;
  }

  get theme() {
    return this.getItem("theme");
  }
  set theme(value: string | null) {
    this.setItem("theme", value);
  }
  get iconAPI() {
    return this.getItem("iconAPI");
  }
  set iconAPI(value: string | null) {
    this.setItem("iconAPI", value);
  }
  get searchJump() {
    return this.getItem("searchJump");
  }
  set searchJump(value: string | null) {
    this.setItem("searchJump", value);
  }
  get openBookMarkJump() {
    return this.getItem("openBookMarkJump");
  }
  set openBookMarkJump(value: string | null) {
    this.setItem("openBookMarkJump", value);
  }
  get searchEngine() {
    return this.getItem("searchEngine") as {
      key: string;
      label: string;
    } | null;
  }
  set searchEngine(value: { key: string; label: string } | null) {
    this.setItem("searchEngine", value);
  }
  get bookMarks() {
    return this.getItem("bookMarks") as BookMarks[] | null;
  }
  set bookMarks(value: BookMarks[] | null) {
    this.setItem("bookMarks", value);
  }
  setItem(key: string, value: any) {
    if (typeof value != "string") {
      value = JSON.stringify(value);
    }
    this.conn.setItem(key, value);
  }
  getItem(key: string) {
    let value = this.conn.getItem(key);
    if (value) {
      try {
        value = JSON.parse(value);
      } catch {
        //
      }
    }
    return value;
  }
  clear() {
    this.conn.clear();
  }
  exportToJson() {
    const data: { [key: string]: string } = {};
    for (const key of Object.keys(this.conn)) {
      const value = this.getItem(key);
      if (value) {
        data[key] = value;
      }
    }
    console.log("Export Local Data:", data);
    const jsonData = JSON.stringify(data, null, 2);
    downloadFile(jsonData, "localData.json", "text/plain");
  }
}

export { LocalDB };
