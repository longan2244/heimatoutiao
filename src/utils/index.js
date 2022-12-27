/**
 * 本地存储封装
 * @param {*} name 本地存储键 
 * @param {*} value 本地储存值
 */
export const setItem = (name, value) => {
  if (value == null) {
    return removeItem(name)
  }
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  } 
  localStorage.setItem(name, value);
}
export const getItem = (name) => {
  let data = localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
export const removeItem = (name) => {
  localStorage.removeItem(name)
}