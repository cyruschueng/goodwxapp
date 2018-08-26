# VSCode配置

## VSCode必备插件

- `ESLint`
- `vscode-author-generator`
- `EditorConfig for VS Code`
- `EditorConfigGenerator`
- `Debugger for Chrome`
- `npm Intellisense`
- `Path Intellisense`

## 其他

- 必须全局安装`ESLint`，以便能使用ESLint代码规范检查功能。
- 设置VSCode
    ```json
    {
      "vetur.validation.template": false,
      "eslint.options": {
        "configFile": ".eslintrc.js",
        "ignorePath": ".eslintignore",
        "format": "'node_modules/eslint-friendly-formatter'"
      },
      "eslint.enable": true,
      "eslint.alwaysShowStatus": true
    }
    ```
