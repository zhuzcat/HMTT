export default {
  install(app: any) {
    app.directive("focus", (el: HTMLElement) => {
      const theInput =
        el.querySelector("input") || el.querySelector("textarea");
      theInput!.focus();
    });
  },
};
