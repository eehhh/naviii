import { getUserClientType } from "@/assets/ts/utils";
import defaultEnginesMap from "@/assets/config/search.json";
import defaultBookMarks from "@/assets/config/bookmarks.json";

// PC
let siderMode = 1;
let itemIconSize = 80;
let itemTitleSize = 20;
let settingPageWidth = 450;
let cardItemWidth = "120px";
// MOBILE
const setMobileValues = () => {
  siderMode = 0;
  itemIconSize = 45;
  itemTitleSize = 15;
  settingPageWidth = 300;
  cardItemWidth = "50px";
};

const searchJump = "_self";
const openBookMarkJump = "_blank";

const contentTheme = {
  light: "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)",
  dark: "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
};

const firstCardTitle = "✨ 常用";
const cardTitlePrefix = "📎";

const iconAPI = "https://api.faviconkit.com/";

const enginesMap: { [key: string]: string[] } = defaultEnginesMap;
const defaultEngineKey = "d";

const bookMarks: BookMarks[] = defaultBookMarks;

const client = getUserClientType();
if (client == "MOBILE") {
  setMobileValues();
}

export {
  bookMarks,
  itemTitleSize,
  itemIconSize,
  settingPageWidth,
  cardItemWidth,
  contentTheme,
  firstCardTitle,
  cardTitlePrefix,
  iconAPI,
  enginesMap,
  defaultEngineKey,
  searchJump,
  openBookMarkJump,
  siderMode,
};
