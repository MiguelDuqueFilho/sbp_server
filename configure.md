x# configuration

## eslint for node express typescript

### install *Eslint* and *Prettier* for React and configuration

```cmd
yarn add eslint prettier -D
```

```cmd
yarn add @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-standard  eslint-plugin-promise eslint-plugin-n eslint-plugin-import eslint-import-resolver-typescript  eslint-config-prettier eslint-plugin-prettier -D 
```


### add file .eslintrc.json with parameter

```json
{
  "env": {
   "es2021": true,
   "node": true,
   "jest": true
  },
  "extends": [
    "standard",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
   "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "prettier/prettier": ["warn", {
      "printWidth": 80,
      "tabWidth": 2,
      "singleQuote": true,
      "trailingComma": "es5",
      "arrowParens": "always",
      "semi": false
    }],
    "no-unused-vars": "warn"
  },
   "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".d.ts"]
    }
  }
}
```
## include in scripts in package.json lint and lint:fix for eslint

```json
 "scripts": {
    "lint": "eslint src --ext .ts ",
    "lint:fix": "eslint src --ext .ts --fix"
  },
```