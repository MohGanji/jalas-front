export const renderDate = (date) => {
  return '' + new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString()
}
