export const isPhone = (number) => {
  return /^\d{11}$/.test(number)
}
