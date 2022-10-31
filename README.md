<h1 align="center">naviii</h1>

<h4 align="center">一个简单优雅的导航页</h4>

<p align="center">
  <a href="https://start.uue.me">演示站</a>
</p>

## :sparkles: 特性
- 响应式
- 静态部署
- 黑暗模式
- Emoji icons
- 在线编辑书签
- 自动获取书签网站Favicon
- 自定义搜索时和打开书签时的跳转方式
    - 当前页面/新页面
- 使用关键字切换搜索引擎
    - 搜索框中输入关键字+空格触发
    - 例如：`g date`则使用google搜索`date`，`b date`则使用bing搜索`date`
    - 更多搜索引擎关键字见[配置](#gear-配置)
- 个人设置存储于本地
    - 导入/导出/清除
- 💭 ...

## :gear: 配置
### 自定义搜索引擎关键字 `src/assets/config/search.json`
```json
{
  "d": ["DuckDuckGo", "https://duckduckgo.com/?q="],
  "g": ["google", "https://www.google.com/search?q="],
  "b": ["Bing", "https://cn.bing.com/search?q="],
  "w": ["Wiki", "https://zh.wikipedia.org/wiki/"],
  "bd": ["BaiDu", "https://www.baidu.com/s?wd="],
  "gh": ["Github", "https://github.com/search?q="],
  "ex": ["v2ex", "https://www.google.com/search?q=site:v2ex.com "],
  "sof": ["StackOverflow", "https://stackoverflow.com/search?q="]
}
```
### 自定义书签 `src/assets/config/bookmarks.json`
```typescript
interface BookMarks {
  title: string;
  brief?: string;
  link?: string;
  // URL
  favicon?: string;
  // Emoji icons
  menuIcon?: string;
  items?: BookMarks[];
}
```
```json
[
  {
    "title": "Wiki",
    "link": "zh.wikipedia.org/wiki",
    "menuIcon": "⭐"
  },
  {
    "title": "社区",
    "items": [
      {
        "title": "Github",
        "link": "github.com/trending",
        "favicon": "https://joeschmoe.io/api/v1/random"
      }
    ]
  }
]
```

## :hammer_and_wrench: 构建
```shell
# 安装
npm install
# 运行
npm run dev
# 编译
npm run build
# 代码风格
npm run lint
```

## :cupid: 致谢
- [Vue](https://vuejs.org)
- [Vite](https://vitejs.dev)
- [Naive UI](https://naiveui.com)
- [TypeScript](https://typescriptlang.org)
- [FaviconKit](https://faviconkit.com)
- [CodeMirror](https://codemirror.net) & [VueCodeMirror](https://github.surmon.me/vue-codemirror)

## :scroll: 许可证
**[MIT](https://opensource.org/licenses/MIT)**
