const emailWrapper = (content) => `
  <div style="background-color: #020617; padding: 40px 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #060e20; border: 1px solid #42465640; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.4);">

      <div style="padding: 30px 20px; text-align: center; border-bottom: 1px solid #42465620;">
        <h2 style="color: #dae2fd; margin: 0; font-size: 22px; letter-spacing: -0.5px; font-weight: bold;">
          MAGIC WORLD <span style="color: #afc6ff; font-style: italic;">CRYPTO</span>
        </h2>
        <p style="color: #4edea3; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; margin: 5px 0 0 0; font-weight: bold;">
          Trade . Build . Innovate
        </p>
      </div>

      <div style="padding: 40px 30px; line-height: 1.6; color: #dae2fd;">
        ${content}
      </div>

      <div style="background-color: #0a1329; padding: 30px; text-align: center; border-top: 1px solid #42465620;">
        <div style="margin-bottom: 20px;">
            <p style="color: #8c90a1; font-size: 11px; margin: 0; line-height: 1.5;">
                Office No. 2104, Marina Plaza,<br>
                Dubai Marina, Dubai, UAE
            </p>
        </div>

        <div style="margin-bottom: 20px;">
          <a href="https://t.me/marinasolution" style="color: #4edea3; text-decoration: none; font-size: 12px; font-weight: bold; margin: 0 10px;">TELEGRAM</a>
          <a href="mailto:support111magiccrypto@gmail.com" style="color: #afc6ff; text-decoration: none; font-size: 12px; font-weight: bold; margin: 0 10px;">SUPPORT</a>
        </div>

        <p style="color: #8c90a160; font-size: 9px; text-transform: uppercase; letter-spacing: 1px; margin: 0;">
          © ${new Date().getFullYear()} MAGIC WORLD CRYPTO SOLUTIONS LTD
        </p>
        <p style="color: #4edea3; font-size: 9px; text-transform: uppercase; margin-top: 10px; font-weight: bold;">
          ● VERIFIED NODE v4.0.0
        </p>
      </div>
    </div>
  </div>
`;

export const signupWelcomeTemplate = (name, verifyUrl) => {
  const content = `
    <h2 style="color: #dae2fd; margin-top: 0; font-size: 24px;">Welcome aboard, ${name}!</h2>
    <p style="color: #c2c6d8; font-size: 15px;">We're thrilled to have you join our community. Your gateway to the magic world of crypto is almost ready.</p>

    <div style="text-align: center; margin: 40px 0;">
      <a href="${verifyUrl}" style="background-color: #afc6ff; color: #060e20; padding: 14px 32px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 15px rgba(175, 198, 255, 0.2);">
        VERIFY EMAIL ADDRESS
      </a>
    </div>

    <p style="color: #8c90a1; font-size: 13px;">If the button doesn't work, copy and paste this link: <br>
    <span style="color: #4edea3;">${verifyUrl}</span></p>

    <p style="margin-top: 30px; color: #dae2fd;">Best regards,<br><strong style="color: #4edea3;">The Magic World Team</strong></p>
  `;
  return emailWrapper(content);
};

export const forgotPasswordTemplate = (resetUrl) => {
  const content = `
    <h2 style="color: #dae2fd; margin-top: 0; font-size: 24px;">Password Reset Request</h2>
    <p style="color: #c2c6d8; font-size: 15px;">We received a request to reset the password for your account. Safety first—no changes have been made yet.</p>

    <div style="text-align: center; margin: 40px 0;">
      <a href="${resetUrl}" style="background-color: transparent; color: #4edea3; border: 1px solid #4edea3; padding: 14px 32px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block; font-size: 14px;">
        RESET PASSWORD
      </a>
    </div>

    <div style="background-color: #131b2e; padding: 20px; border-radius: 12px; border-left: 4px solid #4edea3;">
        <p style="font-size: 13px; color: #c2c6d8; margin: 0;">
            <strong>Note:</strong> This link will expire in 60 minutes. If you did not make this request, please ignore this email or contact support.
        </p>
    </div>

    <p style="margin-top: 30px; color: #dae2fd;">Securely yours,<br><strong style="color: #afc6ff;">Magic World Security</strong></p>
  `;
  return emailWrapper(content);
};
