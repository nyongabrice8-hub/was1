// webhookSignatureService.js

const crypto = require('crypto');

class WebhookSignatureService {
    constructor(secret) {
        this.secret = secret;
    }

    verifySignature(payload, signature) {
        const hmac = crypto.createHmac('sha256', this.secret);
        hmac.update(payload);
        const calculatedSignature = hmac.digest('hex');
        return calculatedSignature === signature;
    }
}

// Example usage for Orange Money:
const orangeSecret = 'YOUR_ORANGE_SECRET';
const orangeWebhookService = new WebhookSignatureService(orangeSecret);

const orangePayload = JSON.stringify({amount: 5000, currency: 'XOF'});
const orangeSignature = 'SIGNATURE_FROM_ORANGE'; // Replace with actual signature
const isValid = orangeWebhookService.verifySignature(orangePayload, orangeSignature);
console.log('Orange Money Webhook Signature Valid:', isValid);

// Example usage for Mobile Money:
const mobileSecret = 'YOUR_MOBILE_SECRET';
const mobileWebhookService = new WebhookSignatureService(mobileSecret);

const mobilePayload = JSON.stringify({amount: 5000, currency: 'XAF'});
const mobileSignature = 'SIGNATURE_FROM_MOBILE'; // Replace with actual signature
const isMobileValid = mobileWebhookService.verifySignature(mobilePayload, mobileSignature);
console.log('Mobile Money Webhook Signature Valid:', isMobileValid);