import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "f26sr9",
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  fileServerFolder: "src",
});
