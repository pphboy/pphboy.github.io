---
title: vite配置相对路径
date: 2024-02-28 22:01:00
---



vite.config.ts

```

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
};
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": pathResolve("./src"),
    },
  },

});
```

tsconfig.json

```
{
  "compilerOptions": {

    "baseUrl": ".",
    "paths": {"@/*":["src/*"]}

  }

}

```