// piggi_req.js
// Shadowrocket Script: http-request

function uuidv4() {
  // RFC4122 v4 UUID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

try {
  const bodyStr = $request.body || "";
  let obj = {};

  // body JSON
  obj = JSON.parse(bodyStr);

  // set deviceId to random uuid
  obj.deviceId = uuidv4();

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  // If body isn't JSON or parsing fails, just pass through
  $done({});
}
