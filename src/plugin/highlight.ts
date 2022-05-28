import hljs from "highlight.js";
export default {
  install(app: any) {
    app.directive("highlight", (el: HTMLElement) => {
      const blocks = el.querySelectorAll("pre,code");
      blocks.forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    });
  },
};
