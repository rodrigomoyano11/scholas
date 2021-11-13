import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber'

export const convertPhoneNumber = (phoneNumberToConvert: string | null): string | null => {
  if (!phoneNumberToConvert) return null
  const phoneNumberUtil = PhoneNumberUtil.getInstance()

  const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(phoneNumberToConvert, 'AR')
  const convertedPhoneNumber = phoneNumberUtil.format(phoneNumber, PhoneNumberFormat.E164)

  return convertedPhoneNumber
}
