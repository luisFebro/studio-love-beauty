const webpush = require("web-push"); // n1

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
console.log("publicVapidKey", publicVapidKey);
const privateVapidKey = process.env.PRIVATE_VAPID_KEY; // n3
console.log("privateVapidKey", privateVapidKey);

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

exports.getPushNotification = (req, res, options = {}) => {
    const subscription = req.body;
    const { title } = options;

    const createdPayload = JSON.stringify({ title });

    res.status(201).json({}); // n2

    webpush
        .sendNotification(subscription, createdPayload)
        .catch(err => console.error(err));

});

/* COMMENTS
n1: lib reference: https://github.com/web-push-libs/web-push
n2: Send 201 - resource created
n3: What is VAPID and WHY use it?
VAPID (Voluntary Application Server Identification) is the newest way to receive and send push notifications through the web.
An application server can voluntarily identify itself to a push service using the described technique. This identification information can be used by the push service to attribute requests that are made by the same application server to a single entity. This can used to reduce the secrecy for push subscription URLs by being able to restrict subscriptions to a specific application server. An application server is further able to include additional information that the operator of a push service can use to contact the operator of the application server.
So there are two reasons for VAPID.
The first is to restrict the VALIDITY OF A SUBSCRIPTION to a specific application server (so, by using VAPID, only your server will be able to send notifications to a subscriber).
The second is to add more information to the push notification, so that the push service operator knows who is sending the notifications. If something is going wrong with your notifications, the operator knows who you are and can contact you. Moreover, they can offer you some kind of interface to monitor your push notifications.
reference: https://stackoverflow.com/questions/40392257/what-is-vapid-and-why-is-it-useful
*/