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

## Commads para gerar chave no mac

```cmd 
ssh-keygen
Generating public/private rsa key pair.

The key's randomart image is:
+---[RSA 3072]----+
|          ..=o   |
|         . o.*+ .|
|         .+oE+o= |
| .     +.+. =.+oo|
|+ . ..=.S    +..o|
|.= = +o= o    .  |
|o + +.+ o        |
| . ..o o         |
|  ..  .          |
+----[SHA256]-----+
DevSPB/AWS ⌚ 10:42:07

$ cat ~/.ssh/id_rsa.pub

```
copiar a chave publica


## Commads instance Aws Ec2 Ubuntu Free tier

```cmd 

sudo user app
sudo usermod -aG sudo app
sudo su - app

mkdir .ssh
chmod 700 .ssh

cd .ssh
touch authorized_keys

vi authorized_keys
 paste key  public in this file

```
logar na instalcia a aprtir do app 

```cmd 
ssh app#xx.xxx.xxx.xxx (ip public instance)

```
install node 

```cmd 
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

node -v

```

## EC2 userdata


```cmd
#!/bin/bash
# Configurar o repositório
sudo apt-get update -y
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Adicione a chave GPG oficial do Docker:
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# configurar o repositório:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update the apt package index:
sudo apt-get update -y

# Install Docker Engine, containerd, and Docker Compose.
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y

# Install aws cli
sudo apt-get install awscli -y

sudo usermod -aG docker $USER
sudo chown root:docker /var/run/docker.sock
```