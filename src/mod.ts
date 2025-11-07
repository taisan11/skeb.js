import type * as t from "./types.ts"

let request_key:string|undefined = undefined;
const headers = {
  referer:"https://skeb.jp",
  authorization:"Bearer null",
}

export async function getUserApi(userId: string):Promise<t.User | undefined> {
  return (await fetch_nun(`https://skeb.jp/api/users/${userId}`,{headers})).json();
}

export async function getMoreWorks(userId: string, page: number):Promise<t.Work[]|undefined> {
  return (await fetch_nun(`https://skeb.jp/api/users/${userId}/works?role=creator&sort=date&offset=${page*30-30}`,{headers})).json();
}

export async function getWork(path:string):Promise<t.Work | undefined> {
  const m = path.match(/^\/@([^/]+)\/works(\/.*)?$/);
  if (m) {
    const user = m[1];
    const rest = m[2] || '';
    return (await fetch_nun(`https://skeb.jp/api/users/${user}/works${rest}`,{headers})).json();
  }
}

function getrequest_key(html:string):string|undefined {
  const m = html.match(/request_key=([^;'"\\\s]+)/);
  return m ? m[1] : undefined;
}

async function fetch_nun(url:string,request:RequestInit):Promise<Response> {
  if (request_key) {
    request.headers = {
      ...request.headers,
      'cookie': `request_key=${request_key}`
    };
  }

  const res = await fetch(url, request);

  let foundKey: string|undefined;
  const ct = res.headers.get?.('content-type') || '';
  if (res.status === 403 || ct.includes('text/html')) {
    const html = await res.clone().text();
    foundKey = getrequest_key(html);
    if (foundKey && !request_key) request_key = foundKey;
  }

  if ((res.status === 403 || foundKey) && request_key) {
    request.headers = {
      ...request.headers,
      'cookie': `request_key=${request_key}`
    };
    return fetch(url, request);
  }

  return res;
}
