
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

## Deploy the app

Install AWS CLI: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

Configure IAM Credentials:

```bash
aws configure
```