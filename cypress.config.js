import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "7skewx",
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  fileServerFolder: "src",
});
