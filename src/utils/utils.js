const MakeSlug = (string) => {
      return string.replace(/ /g,'-');
}
const MakeScore = (str) => {
      return str?.trim()?.toLowerCase()?.replace(/[^\w ]+/g,'')?.replace(/ +/g,'_');   
  }
export {
      MakeSlug,
      MakeScore
}