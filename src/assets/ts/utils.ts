import { h } from "vue";
import type { MenuOption } from "naive-ui";

const downloadFile = (
  content: string,
  fileName: string,
  contentType: string
) => {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

const renderMenuIcon = (name: string) => {
  return () => h("span", null, name);
};

const getUserClientType = () => {
  let client = "PC";
  if (
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    client = "MOBILE";
  }
  return client;
};

const getFullHref = (href: string) => {
  return href.includes("://") ? href : "//" + href;
};

const getMenuOptins = (myOptions: BookMarks[]) => {
  const options: MenuOption[] = myOptions.map((item, index) => {
    const option: MenuOption = {
      label: item.title,
      key: encodeURI(item.title + item.link + index),
    };
    if (item.link) {
      option.href = getFullHref(item.link);
    }
    if (item.menuIcon) {
      option.icon = renderMenuIcon(item.menuIcon);
    } else if (item.items) {
      option.icon = () => h("span", { class: "icon-open-folder" }, "");
    } else {
      option.icon = renderMenuIcon("🏷️");
    }
    if (item.items) {
      option.children = getMenuOptins(item.items);
    }
    return option;
  });
  return options;
};

export {
  renderMenuIcon,
  getUserClientType,
  getFullHref,
  getMenuOptins,
  downloadFile,
};
