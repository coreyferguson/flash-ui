
# Contributing

## Install and test

```bash
npm install -g bit-bin
npm config set @bit:registry https://node.bit.dev
bit login
git@github.com:coreyferguson/flash-ui.git
cd flash-ui
npm install
npm test
```

## Start the app

Add this to `/etc/hosts`:

```
127.0.1.1 flash-local.growme.fyi
```

Start the app:

```bash
npm start
```