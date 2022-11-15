import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "2rpmwj",
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  e2e: {

  }
});
