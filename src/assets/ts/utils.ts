import { h } from "vue";
import type { MenuOption } from "naive-ui";
import type { BookMarks } from "@/assets/ts/types";

function downloadFile(content: string, fileName: string, contentType: string) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

function renderMenuIcon(name: string) {
  return () => h("span", null, name);
}

function getUserClientType() {
  let client = "PC";
  if (
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    client = "MOBILE";
  }
  return client;
}

function getFullHref(href: string) {
  return href.includes("://") ? href : "//" + href;
}

function getMenuOptins(myOptions: BookMarks[]) {
  const options: MenuOption[] = myOptions.map((item) => {
    const option: MenuOption = {
      label: item.title,
      key: item.title + new Date().getTime(),
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
}

export {
  renderMenuIcon,
  getUserClientType,
  getFullHref,
  getMenuOptins,
  downloadFile,
};
