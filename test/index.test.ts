import { describe, it, expect } from "vitest";
import diff from '../src/index'

describe('diff', () => {
    it('should get right ans', () => {
        const part1 = `
            const a = 1 
        `
        const part2 = `
            const a = 1 
            const b = 1 
        `
        expect(diff(part1, part1)).toBe('')
    })
})