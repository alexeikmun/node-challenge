const StorageService = () => {
  const uploadFile = async (bucket, file) => await bucket.upload(file)
  const getFile = async (bucket, fileName) => await bucket.file('images/' + fileName)

  return {
    uploadFile,
    getFile
  }
}

export default StorageService
