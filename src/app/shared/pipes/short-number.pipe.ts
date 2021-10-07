import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'shortNumber',
})
export class ShortNumberPipe implements PipeTransform {
  transform(number: number): string | null {
    // Verify types
    if (isNaN(number)) return null
    if (number === null) return null
    if (number === 0) return null

    let absoluteNumber = Math.abs(number)
    const rounder = Math.pow(10, 1)
    const isNegative = number < 0

    let key = ''

    const powers = [
      { key: 'Q', value: Math.pow(10, 15) },
      { key: 'T', value: Math.pow(10, 12) },
      { key: 'B', value: Math.pow(10, 9) },
      { key: 'M', value: Math.pow(10, 6) },
      { key: 'K', value: 1000 },
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
    return `${isNegative ? '-' : ''}${absoluteNumber}${key}`
  }
}
