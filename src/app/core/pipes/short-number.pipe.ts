import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'shortNumber',
})
export class ShortNumberPipe implements PipeTransform {
  transform(number: number | string | null): string | null {
    // Verify types
    if (number === null || number === undefined) return null
    if (typeof number === 'string') return null
    if (isNaN(number)) return null
    if (number === 0) return "0"
    if (number < 10_000) return `${number}`

    let absoluteNumber = Math.abs(number)
    const rounder = 10 ** 1
    const isNegative = number < 0

    let key = ''

    const powers = [
      { key: 'Q', value: 10 ** 24 },
      { key: 'T', value: 10 ** 18 },
      { key: 'B', value: 10 ** 12 },
      { key: 'MM', value: 10 ** 9 },
      { key: 'M', value: 10 ** 6 },
      { key: 'K', value: 10 ** 3 },
    ]

    for (let i = 0; i < powers.length; i++) {
      let reduced = absoluteNumber / powers[i].value
      reduced = Math.round(reduced * rounder) / rounder
      if (reduced >= 1) {
        absoluteNumber = reduced
        key = powers[i].key
        break
      }
    }
    return `${isNegative ? '-' : ''}${absoluteNumber} ${key}`.replace('.', ',')
  }
}
