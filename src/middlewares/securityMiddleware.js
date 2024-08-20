import helmet from 'helmet';
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32);
const IV_LENGTH = 16;

const securityMiddleware = (req, res, next) => {
  // Use helmet to secure HTTP headers
  helmet()(req, res, () => {
    // Encrypt data before sending it to the client
    res.encrypt = (data) => {
      const iv = crypto.randomBytes(IV_LENGTH);
      const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
      let encrypted = cipher.update(JSON.stringify(data));
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return iv.toString('hex') + ':' + encrypted.toString('hex');
    };

    // Decrypt incoming data
    if (req.body && req.body.data) {
      try {
        const [iv, encryptedData] = req.body.data.split(':');
        const ivBuffer = Buffer.from(iv, 'hex');
        const encryptedBuffer = Buffer.from(encryptedData, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), ivBuffer);
        let decrypted = decipher.update(encryptedBuffer);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        req.body = JSON.parse(decrypted.toString());
      } catch (err) {
        return res.status(400).send('Invalid encrypted data');
      }
    }

    next();
  });
};

export default securityMiddleware;
