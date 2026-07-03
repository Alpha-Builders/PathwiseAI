import * as otpGenerator from 'otp-generator';

export function generateOTP(): string {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
}