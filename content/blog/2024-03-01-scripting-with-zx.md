---
title: Scripting with ZX
date: 2024-03-01T00:00:00.000Z
---

In my last post, I mentioned that I use [ZX](https://google.github.io) from Google to optimize my build steps. [ZX](https://google.github.io/zx/) is a package that allows you to write Bash or zsh-like scripts using JavaScript or TypeScript syntax.

As a developer with expertise in TypeScript, working with a shell like Bash is possible but not always intuitive. It simply takes too long for me to write scripts with Bash that are essentially just small helpers and have little to do with the actual code.

For anyone familiar with TypeScript or JavaScript, [ZX](https://google.github.io/zx/) is an alternative.

My experience has shown that asynchronous operations are more understandable and easier for me to implement.

As I mentioned, I compile my [Tauri](https://tauri.app/) app for multiple platforms and architectures (MacOS, Linux / arm, amd64). With [ZX](https://google.github.io/zx/), I optimized my build process so that all necessary commands are automated, and the finished releases are published on my website.

This includes:

- Automating NPM commands
- Versioning, i.e., setting all versions in the different files
- [Signing the app](https://tauri.app/v1/guides/distribution/sign-macos)
- Starting the build process for the different OS and architectures
- Creating the file for the [Tauri Auto-Updater](https://tauri.app/v1/guides/distribution/updater) `app-info.json`
- Gathering all releases along with `app-info.json` so they can be deployed on the website
- Setting git tags and pushing the version

To get started, the documentation at [ZX Getting Started](https://google.github.io/zx/getting-started) is helpful. I created a general file `build.mjs` as the entry point of my automation.

```ts [build.mjs]
#!/usr/bin/env zx
```

The first line, like in Bash or zsh scripts, specifies the shell environment. However, [ZX](https://google.github.io/zx/) doesn't need to be installed globally; it can be added directly as a package:

```bash
npm install zx
```

Finally you need to make the Script executable.

```bash
chmod +x ./build.mjs
```

As a command to start the release process, I chose `npm run release <version> <notes>` and edited my `package.json`:

```json [package.json]
...
"scripts": {
    ...
    "release": "zx ./build.mjs",
    "zx": "zx"
}
```

In `build.mjs`, I added the global import of all [ZX](https://google.github.io/zx/) utilities to interact with the file system (fsx) or receive arguments.

```ts [build.mjs]
import "zx/globals";
```

The input arguments are available under `argv`, and the file system API under `fs`.

For example, the version and release notes:

```ts [build.mjs]
const versionType = argv._[0] ?? "patch"; // version depending on 'npm version' options as 1st argument
const notes = argv._[1]; // release notes as 2nd argument
```

Options, as you know them, can be appended to the command with `--option-name` and read in the script like this:

```ts [build.mjs]
const skipBuild = argv["skip-build"] ?? false; // --skip-build as option parameter
```

After gathering all the information I need, I can set the versions in the various files of the [Tauri](https://tauri.app/)/[Vue](https://vuejs.org/) project:

```ts [build.mjs]
echo("Building...");
if (!skipBuild) await $`npm version ${versionType} --no-git-tag-version`;
const { version } = await fs.readJson("./package.json");
echo(version);

const taruriConfig = await fs.readJson("./src-tauri/tauri.conf.json");

// update cargo toml file version
const cargoConfig = await fs.readFile("./src-tauri/Cargo.toml", "utf8");
const newCargoConfig = cargoConfig.replace(
    /version = ".*"/,
    `version = "${version}"`
);
await fs.writeFile("./src-tauri/Cargo.toml", newCargoConfig);
taruriConfig.package.version = version;
await fs.writeJson("./src-tauri/tauri.conf.json", taruriConfig, {
    spaces: 2,
});
```

I set the version in both `package.json` and `tauri.conf.json` and `Cargo.toml`. For the JSON files, I could use the built-in JSON parser from `fs`, but for `toml`, I had to resort to string replacement.

Next, I set the signature keys used in the `docker-compose.yml` file (see blog post) and sign the app so that the operating systems allow installation and execution.

```ts [build.mjs]
const key = await $`cat ~/.tauri/myapp.key`;
$.prefix += `export TAURI_PRIVATE_KEY=${key};`;
$.prefix += `export TAURI_KEY_PASSWORD='';`;
$.prefix += `export APPLE_SIGNING_IDENTITY='Apple Development: xxx@me.com (T22ZT6FGKK)';`;
```

[Tauri](https://tauri.app) explains in detail how the signature works in the [docs](https://tauri.app/v1/guides/distribution/sign-macos).

The framework is now in place, and the build can proceed:

```ts [build.mjs]
echo("Build Frontend");
await $`npm run build`;
echo("Build MacOS");
await $`npm run tauri build --debug --verbose`;
echo("Build Linux");
await $`docker compose run --rm build-linux`;
await $`docker compose run --rm build-linux-arm`;
```

I removed the build step from the frontend from the standard Tauri build and executed it here separately. Simply remove the property `"beforeBuildCommand": ""` in `tauri.conf.json`.

[Here you can also see how I use Docker to create the Linux builds.](/blog/2024-02-04-tauri-docker)

Finally, I copy all the generated files to a release folder, create the `app-info.json` for the Tauri Auto-Updater, set the git tag, and push.

```ts [build.mjs]
await $`mkdir -p ./release`;
await $`cp -r ./src-tauri/target/release/bundle ./release/${version}`;
await $`mkdir -p ./release/${version}/linux`;
await $`cp ./src-tauri/target/x86_64-unknown-linux-gnu/release/bundle/deb/time-track_${version}_amd64.deb ./release/${version}/linux/`;
await $`cp ./src-tauri/target/aarch64-unknown-linux-gnu/release/bundle/deb/time-track_${version}_arm64.deb ./release/${version}/linux/`;
await fs.outputJSON(
    "./release/app-info.json",
    {
        version,
        pub_date: new Date().toISOString(),
        notes,
    },
    {
        spaces: 2,
    }
);

await $`cp -r ./release ./client/download/`;
await $`cp ./src-tauri/target/release/bundle/dmg/time-track_${version}_aarch64.dmg ./client/download/time-track.dmg`;
echo("Done");

await $`git add .`;
await $`git commit -m "v${version}, ${notes}"`;
await $`git tag v${version}`;
await $`git push --tags`;
```

For shell pros, this is probably a piece of cake, but for me, the workflow with ZX was pleasantly successful.

In the next post, I'll share my experience and pattern of arranging and managing components based on design systems.

## Update

After listening to a recent podcast episode, I was introduced to a compelling feature of alternative shells like ZX and The Bun Shell. These tools transcend the limitations imposed by the varying shell environments of different operating systems. By leveraging ZX or The Bun Shell, developers can create scripts that are seamlessly executable across multiple platforms. This cross-operating system compatibility is a significant boon, eliminating the need to tailor scripts to the specific nuances of each OS's shell environment. It underscores the versatility and efficiency that such modern tools bring to the table, streamlining development workflows in a way that was previously challenging.
