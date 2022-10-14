import { describe, it, expect, test } from 'vitest'
import diff from '../src/doDiff'

describe('diff', () => {
  it('should get right diff result by inserting', () => {
    const part1 = [
      'a',
    ]
    const part2 = [
      'a',
      'b'
    ]

    expect(diff(part1, part2)).toStrictEqual(
      [
        {
          'content': 'a',
          'type': 'match',
        },
        {
          'content': 'b',
          'type': 'insert',
        },
      ]
    )
  })

  it('should get right diff result by deleting', () => {
    const part1 = [
      'a',
      'b',
      'c'
    ]
    const part2 = [
      'a',
    ]

    expect(diff(part1, part2)).toStrictEqual(
      [
        {
          content: 'a',
          type: 'match'
        },
        {
          'content': 'b',
          'type': 'delete',
        },
        {
          'content': 'c',
          'type': 'delete',
        },
      ]
    )
  })
})