import { h } from "vue";
import type { MenuOption } from "naive-ui";
import type { BookMarks } from "@/assets/ts/types";
import { getUserClientType } from "@/assets/ts/utils";
import defaultEnginesMap from "@/assets/config/search.json";
import defaultBookMarks from "@/assets/config/bookmarks.json";

// PC
let itemIconSize = 80;
let itemTitleSize = 20;
let settingPageWidth = 450;
// MOBILE
function setMobileValues() {
  itemIconSize = 45;
  itemTitleSize = 15;
  settingPageWidth = 300;
}

const searchJump = "_self";
const openBookMarkJump = "_blank";

const itemCols = "1 200:3 400:5 600:8 800:10 1000:12 2000:22";
const contentTheme = {
  light: "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)",
  dark: "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
};

const firstCardTitle = "✨ 常用";
const cardTitlePrefix = "📎";

// https://gist.github.com/dodying/bf3063d4e1f5b206018bfa19127669e9
// const iconAPI = "https://f6.allesedv.com/64/";
// const iconAPI = "https://icon.horse/icon/"
const iconAPI = "https://toxic-olive-salmon.faviconkit.com/";

const enginesMap: { [key: string]: string[] } = defaultEnginesMap;
const defaultEngineKey = "d";

const bookMarks: BookMarks[] = defaultBookMarks;
const fixedMenuOptions = (isDarkTheme: boolean): MenuOption[] => {
  return [
    {
      label: "回到顶部",
      key: "top",
      icon: () => h("span", { class: "icon-wobble-vertical" }, "🚀"),
    },
    {
      label: "切换主题",
      key: "theme",
      icon: isDarkTheme
        ? () => h("span", { class: "icon-rotateY" }, "🧊")
        : () => h("span", { class: "icon-flow" }, "🌙"),
    },
    {
      label: "打开设置",
      key: "setting",
      icon: () => h("span", { class: "icon-rotate" }, "⚙️"),
    },
  ];
};

const client = getUserClientType();
if (client == "MOBILE") {
  setMobileValues();
}

export {
  fixedMenuOptions,
  bookMarks,
  itemTitleSize,
  itemIconSize,
  settingPageWidth,
  itemCols,
  contentTheme,
  firstCardTitle,
  cardTitlePrefix,
  iconAPI,
  enginesMap,
  defaultEngineKey,
  searchJump,
  openBookMarkJump,
};
