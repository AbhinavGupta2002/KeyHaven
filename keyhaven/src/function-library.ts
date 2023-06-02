
// to check if a URL is valid or not
export const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch (err) {
      return false
    }
}
