import type { PlasmoMessaging } from "@plasmohq/messaging"
import * as _ from 'lodash-es'
import Browser from "webextension-polyfill";

const key = 'xCardsLicense';

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    const licenseKey = req.body.licenseKey;
    const action = req.body.action;

    if (action === 'activate') {
        try {
            const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    product_id: 'hxPOgEq9TDcvDW5Rw9i2Aw==', // 替换为你的实际产品 ID
                    license_key: licenseKey,
                }),
            });

            const data = await response.json();
            console.log('License verification response:', data);

            if (!data.success) {
                return res.send({ message: 'Invalid license key' });
            }

            await Browser.storage.local.set({ [key]: data.purchase, licenseKey, });

            res.send({ message: 'License activated' });
        } catch (error) {
            res.send({ message: error.message });
        }
    } else if (action === 'check') {
        const { licenseKey } = await Browser.storage.local.get('licenseKey');
        // console.log('licenseKey', licenseKey);
        const oldData = await Browser.storage.local.get(key);
        // console.log('oldData', oldData);
        if (!oldData?.[key] || !licenseKey) return res.send(null);
        // console.log('check isActivated', oldData);
        const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                product_id: 'hxPOgEq9TDcvDW5Rw9i2Aw==', // 替换为你的实际产品 ID
                license_key: licenseKey,
            }),
        });
        const data = await response.json();
        await Browser.storage.local.set({ [key]: data.purchase });
        console.log('data', data);
        res.send(data?.purchase);
    }
}

export default handler;