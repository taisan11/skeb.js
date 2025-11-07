import {getUserApi,getWork} from "./src/mod.ts"

const user_works = (await getUserApi("usern_name"))?.received_works
const can_get_user_works = user_works?.filter(w=>!w.private)
const url = await getWork(can_get_user_works![0].path).then(work => work!.preview_url)
const resp = await fetch(url)
const blob = await resp.blob()
const bytes = new Uint8Array(await blob.arrayBuffer())
await Deno.writeFile("./tekitou.avif", bytes)
