const generateInvoiceHTML = (order, user) => {
  // Generate order items HTML with inline images
  const orderItemsHTML = order.cart?.map((item, index) => `
    <tr style="border-bottom: 1px solid #dee2e6;">
      <td style="padding: 12px; color: #666666;">${index + 1}</td>
      <td style="padding: 12px; color: #333333; font-weight: 500;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="padding-right: 10px; vertical-align: top;">
              ${item.img ? `<img src="cid:product-${index + 1}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; display: block;" />` : ''}
            </td>
            <td style="vertical-align: top;">
              ${item.title}
            </td>
          </tr>
        </table>
      </td>
      <td style="padding: 12px; text-align: center; color: #666666;">${item.quantity}</td>
      <td style="padding: 12px; text-align: right; color: #333333; font-weight: 500;">৳${item.price}</td>
    </tr>
  `).join('') || '';

  // Professional email template
  const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice - ${order.invoice}</title>
        <style>
            body, table, td, p, a, li, blockquote {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
            table, td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
            img {
                -ms-interpolation-mode: bicubic;
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
                display: block;
            }
        </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td style="padding: 20px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">

                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">INVOICE</h1>
                                <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Thank you for your order!</p>
                            </td>
                        </tr>

                        <!-- Invoice Details -->
                        <tr>
                            <td style="padding: 30px;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td width="50%" style="vertical-align: top;">
                                            <h3 style="color: #333333; margin: 0 0 15px 0; font-size: 18px;">Invoice Details</h3>
                                            <p style="margin: 5px 0; color: #666666; line-height: 1.5;">
                                                <strong>Invoice No:</strong> #${order.invoice}<br>
                                                <strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}<br>
                                                <strong>Status:</strong> <span style="background-color: #e8f5e8; color: #2d5a2d; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${order.status || 'Pending'}</span>
                                            </p>
                                        </td>
                                        <td width="50%" style="vertical-align: top; text-align: right;">
                                            <h3 style="color: #333333; margin: 0 0 15px 0; font-size: 18px;">Customer Information</h3>
                                            <p style="margin: 5px 0; color: #666666; line-height: 1.5;">
                                                <strong>${order?.name || 'N/A'}</strong><br>
                                                ${order?.email || 'N/A'}<br>
                                                ${order?.contact || 'N/A'} <br>
                                                ${order?.address || 'N/A'}
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Order Items -->
                        <tr>
                            <td style="padding: 0 30px;">
                                <h3 style="color: #333333; margin: 0 0 20px 0; font-size: 18px;">Order Summary</h3>
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse: collapse;">
                                    <thead>
                                        <tr style="background-color: #f8f9fa;">
                                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6; color: #495057; font-weight: 600;">#</th>
                                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6; color: #495057; font-weight: 600;">Item</th>
                                            <th style="padding: 12px; text-align: center; border-bottom: 2px solid #dee2e6; color: #495057; font-weight: 600;">Qty</th>
                                            <th style="padding: 12px; text-align: right; border-bottom: 2px solid #dee2e6; color: #495057; font-weight: 600;">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${orderItemsHTML}
                                    </tbody>
                                </table>
                            </td>
                        </tr>

                        <!-- Order Total -->
                        <tr>
                            <td style="padding: 20px 30px;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td width="60%"></td>
                                        <td width="40%">
                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-top: 2px solid #dee2e6; padding-top: 15px;">
                                                <tr>
                                                    <td style="padding: 5px 0; color: #666666;">Shipping Cost:</td>
                                                    <td style="padding: 5px 0; text-align: right; color: #666666;">৳${order.shippingCost || 0}</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 5px 0; color: #666666;">Discount:</td>
                                                    <td style="padding: 5px 0; text-align: right; color: #28a745;">-৳${order.discount || 0}</td>
                                                </tr>
                                                <tr style="border-top: 1px solid #dee2e6;">
                                                    <td style="padding: 10px 0 5px 0; font-size: 18px; font-weight: bold; color: #333333;">Total Amount:</td>
                                                    <td style="padding: 10px 0 5px 0; text-align: right; font-size: 18px; font-weight: bold; color: #333333;">৳${order.totalAmount || 0}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Payment Information -->
                        <tr>
                            <td style="padding: 20px 30px; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td width="50%">
                                            <h4 style="color: #333333; margin: 0 0 10px 0;">Payment Information</h4>
                                            <p style="margin: 5px 0; color: #666666;">
                                                <strong>Method:</strong> ${order.paymentMethod || 'N/A'}<br>
                                                <strong>Status:</strong> <span style="background-color: #fff3cd; color: #856404; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${order.payment_status || 'N/A'}</span>
                                            </p>
                                        </td>
                                        <td width="50%" style="text-align: right;">
                                            <h4 style="color: #333333; margin: 0 0 10px 0;">Need Help?</h4>
                                            <p style="margin: 5px 0; color: #666666;">
                                                Contact us at<br>
                                                <a href="mailto:${process.env.SUPPORT_EMAIL || 'support@yourstore.com'}" style="color: #667eea; text-decoration: none;">${process.env.SUPPORT_EMAIL || 'support@yourstore.com'}</a>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                    </table>

                    <!-- Footer -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 20px auto 0 auto;">
                        <tr>
                            <td style="text-align: center; padding: 20px; color: #999999; font-size: 14px;">
                                <p style="margin: 0;">© 2024 ${process.env.COMPANY_NAME || 'Your Store'}. All rights reserved.</p>
                                <p style="margin: 10px 0 0 0;">
                                    <a href="https://jo-bd.com/faq" style="color: #667eea; text-decoration: none; margin: 0 10px;">FAQ</a>
                                </p>
                            </td>
                        </tr>
                    </table>

                </td>
            </tr>
        </table>
    </body>
    </html>
  `;

  return template;
};

module.exports = { generateInvoiceHTML };