import pinyin_data from './pinyin-data'

export default function (val) {
  if (!val) throw new Error('拼音不能为空!')

  val = String(val)
  return val.split('')
    .map(item => pinyin_data[item]||item)
    .join(' ')
}
