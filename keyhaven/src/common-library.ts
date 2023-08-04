
// to check if a URL is valid or not
export const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch (err) {
      return false
    }
}

export const checkBearerTokenExpiry = (obj: any): boolean => {
  return obj?.type === 'FAIL' && obj?.message === 'bearer token missing'
}

// types of email that can be sent
export const EmailType = {
  changeMasterPassword: (email: string, firstName: string) => {
    return {
      receiverID: email,
      firstName: firstName,
      title: 'Request to Change Master Password',
      content: 'Please click the following link to change your master password for the account linked to this email. If you did not request this, contact customer support immediately.',
      type: 'changeMasterPassword'
    }
  },
  verifyEmail: (email: string, firstName: string) => {
    return {
      receiverID: email,
      firstName: firstName,
      title: 'Request to Verify Account',
      content: 'Please click the following link to verify your account. If you did not request this, contact customer support immediately.',
      type: 'verifyAccount'
    }
  }
}