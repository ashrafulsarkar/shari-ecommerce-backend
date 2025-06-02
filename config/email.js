require('dotenv').config();
const nodemailer = require('nodemailer');
const axios = require('axios');
const { secret } = require('./secret');

// Simple function to download image and create attachment
const downloadImageAttachment = async (imageUrl, filename) => {
  try {
    if (!imageUrl) return null;

    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 10000
    });

    return {
      filename: filename,
      content: Buffer.from(response.data),
      cid: filename.split('.')[0] // Use filename without extension as CID
    };
  } catch (error) {
    console.error(`Failed to download ${filename}:`, error.message);
    return null;
  }
};

// Enhanced sendEmail with simple attachment support
module.exports.sendEmail = async (body, res, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: secret.email_host,
      service: secret.email_service,
      port: secret.email_port,
      secure: true,
      auth: {
        user: secret.email_user,
        pass: secret.email_pass,
      },
    });

    // Verify transporter
    transporter.verify(function (err, success) {
      if (err) {
        console.log('Transporter error:', err.message);
        return res.status(403).send({
          message: `Error when verify ${err.message}`,
        });
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    // Process image attachments if provided
    if (body.imageAttachments) {
      console.log('Processing image attachments...');

      const attachments = [];

      // Download logo
      if (body.imageAttachments.logo) {
        const logoAttachment = await downloadImageAttachment(
          body.imageAttachments.logo,
          'logo.webp'
        );
        if (logoAttachment) attachments.push(logoAttachment);
      }

      // Download product images
      if (body.imageAttachments.products && Array.isArray(body.imageAttachments.products)) {
        for (let i = 0; i < body.imageAttachments.products.length; i++) {
          const productImage = body.imageAttachments.products[i];
          if (productImage) {
            const productAttachment = await downloadImageAttachment(
              productImage,
              `product-${i + 1}.webp`
            );
            if (productAttachment) attachments.push(productAttachment);
          }
        }
      }

      // Add attachments to email body
      if (attachments.length > 0) {
        body.attachments = (body.attachments || []).concat(attachments);
        console.log(`Added ${attachments.length} image attachments`);
      }

      // Remove imageAttachments from body
      delete body.imageAttachments;
    }

    // Send email
    transporter.sendMail(body, (err, data) => {
      if (err) {
        console.log('Email error:', err.message);
        res.status(403).send({
          message: `Error when sending email ${err.message}`,
        });
      } else {
        console.log('Email sent successfully');
        res.send({
          message: message,
        });
      }
    });

  } catch (error) {
    console.error('Email service error:', error.message);
    res.status(403).send({
      message: `Error when sending email: ${error.message}`,
    });
  }
};