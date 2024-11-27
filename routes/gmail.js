var express = require('express');
var router = express.Router();

const sendMail = require("../util/mailConfig");
router.post("/send-mail", async function (req, res, next) {
    try {
      const {to} = req.body;
      
      const content = `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #4CAF50;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .body {
      padding: 20px;
      line-height: 1.8;
    }
    .body p {
      margin: 0 0 15px;
    }
    .body ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }
    .body ul li {
      margin: 5px 0;
      padding: 10px;
      background-color: #f4f4f4;
      border-radius: 5px;
    }
    .body ul li strong {
      color: #4CAF50;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #777;
      padding: 15px;
      border-top: 1px solid #eeeeee;
    }
    .footer a {
      color: #4CAF50;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
     </head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Đăng ký thành công!</h1>
    </div>
    <div class="body">
      <p>Xin chào <strong>bạn</strong>,</p>
      <p>Bạn đã đăng ký thành công tài khoản. Dưới đây là thông tin tài khoản của bạn:</p>
      <ul>
        <li><strong>Tên người dùng:</strong> xxx</li>
        <li><strong>Mật khẩu:</strong> yyy</li>
      </ul>
      <p>Hãy giữ bí mật thông tin tài khoản của bạn để đảm bảo an toàn.</p>
      <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi!</p>
    </div>
    <div class="footer">
      <p>Liên hệ <a href="mailto:quocanhjaki@gmail.com">quocanhjaki@gmail.com</a> nếu bạn cần hỗ trợ.</p>
      <p>&copy; 2024 quocanh. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
  
      const mailOptions = {
        from: "quocanh <quocanhjaki@gmail.com>",
        to: to,
        subject: "Thông báo đăng ký thành công",
        html: content,
      };
      await sendMail.transporter.sendMail(mailOptions);
      res.json({ status: 1, message: "Gửi mail thành công" });
    } catch (err) {
      console.error("Lỗi khi gửi mail:", err);
      res.json({ status: 0, message: "Gửi mail thất bại", error: err.message });
    }
  });
  module.exports = router;
