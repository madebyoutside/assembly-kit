# Changelog

## [0.0.7](https://github.com/madebyoutside/assembly-kit/compare/v0.0.6...v0.0.7) (2026-08-19)


### Features

* add assembly-kit/react entry point with cached singletons ([87ba765](https://github.com/madebyoutside/assembly-kit/commit/87ba765ea78e1d26af98d24aec2f0ff90c9fd797))
* add token and payload properties to AssemblyKit ([#16](https://github.com/madebyoutside/assembly-kit/issues/16)) ([e6ee925](https://github.com/madebyoutside/assembly-kit/commit/e6ee925e102bc0abd2d8cc7bd0d197b81cc591a9))
* app-bridge entry point (Feature 7) ([2762c60](https://github.com/madebyoutside/assembly-kit/commit/2762c60eb5b174e58681c8764f472fb151ef4baf))
* build config & export map (Feature 9) ([bcbb486](https://github.com/madebyoutside/assembly-kit/commit/bcbb4869945474fa7e20f889be7b64f7d04c5476))
* build config & export map (Feature 9) ([21e53f5](https://github.com/madebyoutside/assembly-kit/commit/21e53f5f39c7a99abbac3f65f251e76075dbdc6c))
* complete Zod schemas for all Assembly API resources ([#3](https://github.com/madebyoutside/assembly-kit/issues/3)) ([724dbb1](https://github.com/madebyoutside/assembly-kit/commit/724dbb1decdb969cc031b00b5ca4ca5f6880a516))
* cover remaining documented Platform API endpoints ([#30](https://github.com/madebyoutside/assembly-kit/issues/30)) ([014d6f1](https://github.com/madebyoutside/assembly-kit/commit/014d6f1dab02ea68789a2f12e55157f8bdb775c1))
* implement app-bridge entry point (Feature 7) ([ad06705](https://github.com/madebyoutside/assembly-kit/commit/ad06705f8661ce00cc00342b0d3060e4d8e12936))
* implement bridge-ui React hooks (Feature 8) ([#4](https://github.com/madebyoutside/assembly-kit/issues/4)) ([8b6ca34](https://github.com/madebyoutside/assembly-kit/commit/8b6ca34679dd4738b034309b4457bb36cb4dfdd3))
* implement token utilities (Feature 3) ([#5](https://github.com/madebyoutside/assembly-kit/issues/5)) ([5a704b7](https://github.com/madebyoutside/assembly-kit/commit/5a704b780ee0a975255015d75cb3c65fc0cf60f6))
* **logger:** serverless-safe pretty logger + err serializers ([#28](https://github.com/madebyoutside/assembly-kit/issues/28)) ([1351da0](https://github.com/madebyoutside/assembly-kit/commit/1351da0ef84b7c34c6bfa36428ecd1ccfb9ccd94))
* pagination helper + client factory & resource classes (Features 5 & 6) ([f490202](https://github.com/madebyoutside/assembly-kit/commit/f4902022a3a991ddb8efd91db9d40bb73f757c67))
* replace @assembly-js/node-sdk with ky-based HTTP transport ([#19](https://github.com/madebyoutside/assembly-kit/issues/19)) ([370d14c](https://github.com/madebyoutside/assembly-kit/commit/370d14c45b4ed461bb27ab84e48bd644b8c3ecca))
* scaffold assembly-kit SDK with error hierarchy ([fb4b983](https://github.com/madebyoutside/assembly-kit/commit/fb4b98307c678b664b53ca00e1b3b1f3b6e713a1))
* token utilities + HTTP transport layer (Features 3 & 4) ([#6](https://github.com/madebyoutside/assembly-kit/issues/6)) ([c936754](https://github.com/madebyoutside/assembly-kit/commit/c9367543308771b065094acdc761ec9b70ea05d8))
* **token:** detect internal users proxying as a client ([#33](https://github.com/madebyoutside/assembly-kit/issues/33)) ([aa58320](https://github.com/madebyoutside/assembly-kit/commit/aa58320e62e51a93efb29a71f9b80f44d3c7cf8f))
* typed customFields generics + optional companyId ([#22](https://github.com/madebyoutside/assembly-kit/issues/22)) ([dbc0b98](https://github.com/madebyoutside/assembly-kit/commit/dbc0b98c814fc11aeef01b406e751d319b71a9d4))


### Bug Fixes

* add @assembly-js/node-sdk as devDependency for CI type-checking ([59d9f52](https://github.com/madebyoutside/assembly-kit/commit/59d9f52aa3559ca6d16deaa724cfc5202066ddbf))
* add test/tsconfig.json so IDE resolves path aliases in test files ([2133caa](https://github.com/madebyoutside/assembly-kit/commit/2133caa80302bae91e9cf42d355e9eef335da493))
* add types conditions to exports and re-export schemas from main entry ([#12](https://github.com/madebyoutside/assembly-kit/issues/12)) ([9dd56ae](https://github.com/madebyoutside/assembly-kit/commit/9dd56aee931c75eff218ba12e6630d5ebd0f5289))
* correct default base URL to https://api.assembly.com ([#20](https://github.com/madebyoutside/assembly-kit/issues/20)) ([66c9f03](https://github.com/madebyoutside/assembly-kit/commit/66c9f03dd213eab63bf89169f29aee110c8a9bfd))
* correct events schema and clients default limit ([#21](https://github.com/madebyoutside/assembly-kit/issues/21)) ([2f52151](https://github.com/madebyoutside/assembly-kit/commit/2f52151644260d2872eb17ea48d1ed8270063f4a))
* correct npm scope to [@anitshrsth](https://github.com/anitshrsth) and add NPM_TOKEN to release workflow ([7cb4406](https://github.com/madebyoutside/assembly-kit/commit/7cb4406272e9c288e9f33c36e8d5ccb615ef1f24))
* correct repository url to madebyoutside org ([#26](https://github.com/madebyoutside/assembly-kit/issues/26)) ([a7a4f6a](https://github.com/madebyoutside/assembly-kit/commit/a7a4f6a70a0a167ff6c2fae0acfa971354386f10))
* include test/ in tsconfig so path aliases resolve in IDE ([d001c15](https://github.com/madebyoutside/assembly-kit/commit/d001c15c86db4c2b4368ada5a54f8eded097faa5))
* make prepare script resilient to missing lefthook in CI ([e484a72](https://github.com/madebyoutside/assembly-kit/commit/e484a72edef72b4a7769b8b2a20a7bdc3a2de543))
* make updatedAt optional across all entity schemas ([#15](https://github.com/madebyoutside/assembly-kit/issues/15)) ([a126561](https://github.com/madebyoutside/assembly-kit/commit/a12656114149698553105dc6745be822b9126575))
* remove pino-pretty (breaks serverless/Vercel) ([#24](https://github.com/madebyoutside/assembly-kit/issues/24)) ([b270adf](https://github.com/madebyoutside/assembly-kit/commit/b270adffa1eb07cf0e36c18afe0f26988e9590ee))
* replace mock() with call-tracking array to satisfy no-empty-function rule ([94a0f2d](https://github.com/madebyoutside/assembly-kit/commit/94a0f2dc24e2cf2120f62bb7e177111f7064bd5f))
* typo in package description ([fa41ffd](https://github.com/madebyoutside/assembly-kit/commit/fa41ffda804e26484480ffeadd2eb3f0b38b43e0))
* unbundle DTS and expose dist/* for portable types ([#14](https://github.com/madebyoutside/assembly-kit/issues/14)) ([e72dfa6](https://github.com/madebyoutside/assembly-kit/commit/e72dfa6868b054da8b5800cf67bfe7dc5283cbf5))
* upgrade CI actions to Node 24, add type annotations, bump v2.0.0 ([#11](https://github.com/madebyoutside/assembly-kit/issues/11)) ([2505f1c](https://github.com/madebyoutside/assembly-kit/commit/2505f1c4f5c97efd9baf3307e60d5c3cb2734d10))
* use unbundle mode for portable DTS, bump v2.0.3 ([#13](https://github.com/madebyoutside/assembly-kit/issues/13)) ([1cec927](https://github.com/madebyoutside/assembly-kit/commit/1cec92727cfa4903685e7ee31e362975762f2429))


### Documentation

* record that release tag names cannot be reused ([#39](https://github.com/madebyoutside/assembly-kit/issues/39)) ([4f141d2](https://github.com/madebyoutside/assembly-kit/commit/4f141d2c41db3533ef958cccdfb12283abfdc924))

## [0.0.6](https://github.com/madebyoutside/assembly-kit/compare/v0.0.5...v0.0.6) (2026-08-19)


### Features

* **token:** detect internal users proxying as a client ([#33](https://github.com/madebyoutside/assembly-kit/issues/33)) ([aa58320](https://github.com/madebyoutside/assembly-kit/commit/aa58320e62e51a93efb29a71f9b80f44d3c7cf8f))
