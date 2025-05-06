const getFileBase64 = async (file: File | Blob) => {
  const base64: string = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = function () {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(reader.result)
      }
    }
    reader.readAsDataURL(file)
  })
  return base64
}

export default getFileBase64
