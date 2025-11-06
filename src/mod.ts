import type * as t from "./types.ts"

const headers = {
  referer:"https://skeb.jp",
  authorization:"Bearer null"
}

let request_key:string|undefined = undefined;

export async function getUserApi(userId: string):Promise<t.User | undefined> {
  return (await fetch_nun(`https://skeb.jp/api/users/${userId}`,{headers})).text();
}

export async function getMoreWorks(userId: string, page: number):Promise<t.Work[]|undefined> {
  return (await fetch(`https://skeb.jp/api/users/${userId}/works?role=creator&sort=date&offset=${page*30-30}`)).json();
}

export async function getWorks(path:string):Promise<t.Work | undefined> {
  const m = path.match(/^\/@([^/]+)\/works(\/.*)?$/);
  if (m) {
    const user = m[1];
    const rest = m[2] || '';
    return (await fetch(`https://skeb.jp/api/users/${user}/works${rest}`)).json();
  }
}

function getrequest_key(html:string):string|undefined {
  const m = html.match(/request_key=([^;'"\\\s]+)/);
  console.log(m||"hoi")
  return m ? m[1] : undefined;
}

async function fetch_nun(url:string,request:RequestInit):Promise<Response> {
  if (request_key) {
    request.headers = {
      ...request.headers,
      'cookie': `request_key=${request_key}`
    };
  }
  const res = await fetch(url,request);

  // Try to extract request_key from the HTML body (use clone so original response stays readable)
  let html: string|undefined;
  try {
    const contentType = res.headers.get?.('content-type') || '';
    if (res.status === 403 || contentType.includes('text/html')) {
      html = await res.clone().text();
    }
  } catch (e) {
    // ignore parse errors
    html = undefined;
  }

  const foundKey = html ? getrequest_key(html) : undefined;
  if (foundKey && !request_key) {
    request_key = foundKey;
  }

  if ((res.status === 403 || foundKey) && request_key) {
    request.headers = {
      ...request.headers,
      'cookie': `request_key=${request_key}`
    };
    console.log(request.headers)
    return await fetch(url,request);
  }

  console.log(request_key)
  return res;
}
