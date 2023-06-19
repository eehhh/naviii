import { enginesMap, defaultEngineKey } from "@/assets/ts/custom";
import { store } from "@/store";

const defaultEngine = {
  key: defaultEngineKey,
  label: enginesMap[defaultEngineKey][0],
};

const getSearchEngine = (input: string) => {
  const key = input.split(" ", 1)[0];
  if (key in enginesMap) {
    return {
      key: key,
      label: enginesMap[key][0],
    };
  } else {
    return defaultEngine;
  }
};

const omniSearch = (key: string, input: string) => {
  let url = "";
  if (input) {
    const searchUrl = enginesMap[key][1];
    const prefix = key + " ";
    const content = input.replace(prefix, "");
    if (content) {
      url = searchUrl + content;
      console.log(key, input, url);
      window.open(encodeURI(url), store.searchJump);
    }
  }
};

export { defaultEngine, getSearchEngine, omniSearch };
