# Skeb.js
Skeb取得用ライブラリ
## 簡単な使い方
```sh
deno add jsr:@taisan11/skebjs
bunx jsr add jsr:@taisan11/skebjs
```
```ts
// 概念コード
import {getUserApi,getWork} from "@taisan11/skebjs"

const user = await getUserApi("userid")
const path = user.received_works[0].path
const work = getWork(path)
save_file(await fetch(work?.og_image_url).then((r)=>r.body()))
```
