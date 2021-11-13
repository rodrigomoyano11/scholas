export const convertDate = (date: string): string => {
  const dateToConvert = new Date(date)

  let day: string = dateToConvert.getDate().toString()
  day = +day < 10 ? '0' + day : day
  let month: string = (dateToConvert.getMonth() + 1).toString()
  month = +month < 10 ? '0' + month : month
  const year = dateToConvert.getFullYear()

  return `${year}-${month}-${day}`
}
