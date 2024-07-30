import type { PlasmoMessaging } from "@plasmohq/messaging"
import Browser from "webextension-polyfill";
import * as _ from 'lodash-es'
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    const action = req.body.action;
    if (action === 'get-tweet') {
        const url = req.body.url;
        const response = await fetch(`https://cmt.itsvg.in/api?url=${url}`, {
            method: 'GET',

        });
        if (response.status !== 200 || !response.ok) {
            res.send({ error: 'error' });
        }
        const data = await response.json();

        return res.send(data);
    }

}
export default handler;