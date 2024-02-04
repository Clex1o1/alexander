---
title: Cross-Platform builds with Tauri and Docker
date: 2024-01-31
---

Hey everyone, welcome to my first blog post!

I am currently developing an app using the cross-platform framework Tauri. Tauri is a versatile framework that enables you to create native running apps with any JS or HTML frontend. The backend of Tauri is implemented in Rust, and it utilizes the Webkit engine for macOS and Linux, as well as WebView2 for Windows to display your frontend. You can find more information about Tauri on the official website: https://tauri.app/.

But why am I writing this?

I plan to share more posts about my journey with Tauri and the progress of my app. However, I encountered a challenge when I needed to test my app in a cross-platform manner. The promises were substantial — you can compile with Rust for nearly any platform, and Tauri supports at least Windows, macOS, and Linux.

As a Mac user, the default build command worked fine for me:

```bash
npm run tauri build
```

However, my potential users are not only Mac users; there are various operating systems in web development. Therefore, I aimed to build a prototype of my app for my coworkers and friends who use Linux and Windows. Not being very familiar with Windows, I first attempted the Linux build. Following [Tauri's guide](https://tauri.app/v1/guides/building/cross-platform) for multi-platform deployment or cross-platform compilation, you need to set up GitHub Actions.

At this point I was a bit overwhelmed. I had never used GitHub Actions before, and I was not sure if I wanted to set up a CI/CD pipeline for my prototype, yet.

But, as a web developer, I tested and build applications for different environments using [Docker](https://docs.docker.com), before.

My idea was to run a Docker container and build the Linux application inside it. After a few tries, I got it running, and I want to share my learnings with you.

The first version was based on a simple Ubuntu image. I attempted to add Rust and all dependencies to the image, but I was not successful in creating an image from scratch. However, I found the official Rust image, which is also Linux-based. With this starting point, my image seemed to run.

```dockerfile
# dockerfile amd46

FROM rust:latest

RUN apt-get update && apt-get install -y \
    libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    file \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev\
    librsvg2-dev

RUN cargo install tauri-cli

RUN rustup target add x86_64-unknown-linux-gnu # add the target for the specific architecture

CMD cargo tauri build
```

I needed to add the target for the specific architecture in the Dockerfile because my underlying system is an Apple Silicon arm-based architecture.

Docker on macOS allows you to run arm and amd64 images. I wrapped it all up in a docker-compose.yml to keep all my configurations like volumes. I added an additional service for the arm compilation as well.

```dockerfile
# dockerfile arm

FROM rust:latest

RUN apt-get update && apt-get install -y \
libwebkit2gtk-4.0-dev \
build-essential \
curl \
wget \
file \
libssl-dev \
libgtk-3-dev \
libayatana-appindicator3-dev\
librsvg2-dev

RUN cargo install tauri-cli

RUN rustup target add aarch64-unknown-linux-gnu # add the target for the specific architecture

CMD cargo tauri build
```

```yaml
# docker-compose.yaml

version: "3"
services:
    build-linux:
        build:
            dockerfile: ./build/linux/dockerfile
        context: .
        volumes: - .:/app
        working_dir: /app
        platform: linux/amd64
        environment:
            TAURI_PRIVATE_KEY: ${TAURI_PRIVATE_KEY}
            TAURI_KEY_PASSWORD: ${TAURI_KEY_PASSWORD}
            APPLE_SIGNING_IDENTITY: ${APPLE_SIGNING_IDENTITY}
        command: "cargo tauri build --target x86_64-unknown-linux-gnu"
    build-linux-arm:
        build:
            dockerfile: ./build/linux/dockerfile_arm
        context: .
        volumes: - .:/app
        working_dir: /app
        environment:
            TAURI_PRIVATE_KEY: ${TAURI_PRIVATE_KEY}
            TAURI_KEY_PASSWORD: ${TAURI_KEY_PASSWORD}
            APPLE_SIGNING_IDENTITY: ${APPLE_SIGNING_IDENTITY}
        command: "cargo tauri build --target aarch64-unknown-linux-gnu"
```

To control my build and deployment workflow, I'm using the JavaScript library [zx](https://google.github.io/zx/) from Google. It makes it a lot easier for me to write shell scripts as a JavaScript/TypeScript developer. I'll share my complete experience soon.

My next step is a working Windows build based on containers (if possible - my first try was not successful). I will write about it in an upcoming post.
