const getFilename = (path: string): string => {
  const pathArray = path.split("/")
  const fileNameWithExtension = pathArray[pathArray.length - 1].split(".")
  return fileNameWithExtension[0]
}

export default getFilename