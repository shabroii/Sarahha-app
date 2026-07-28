export const otpTemplate = ({firstName, otp})=>{

    return  `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Verification</title>
</head>

<body style="margin:0;padding:0;background-color:#f5f7fb;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f7fb;padding:30px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" border="0"
style="background:#ffffff;border-radius:16px;overflow:hidden;">

<tr>
<td align="center"
style="background:#4f46e5;padding:35px;color:white;">

<h1 style="margin:0;font-size:28px;">
Verify Your Email 📩
</h1>

</td>
</tr>

<tr>
<td style="padding:40px;color:#333;">

<h2 style="margin-top:0;">
Hello ${firstName} 👋
</h2>

<p style="font-size:16px;line-height:1.8;">
Thanks for creating your Sarahah account.
To complete your registration, please use the verification code below:
</p>

<div style="margin:35px 0;text-align:center;">
<span style="
display:inline-block;
background:#4f46e5;
color:#ffffff;
font-size:34px;
font-weight:bold;
letter-spacing:8px;
padding:18px 40px;
border-radius:12px;
">
${otp}
</span>
</div>

<p style="font-size:16px;line-height:1.8;">
This code is valid for <strong>10 minutes</strong>.
Please do not share it with anyone.
</p>

<p style="font-size:16px;line-height:1.8;">
If you didn't create a Sarahah account, you can safely ignore this email.
</p>

<p style="margin-top:35px;color:#777;">
Sarahah Team 💙
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`
}