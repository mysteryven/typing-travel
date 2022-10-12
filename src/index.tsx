type DiffResult = {
  type: 'normal',
  content: string 
} | {
  type: 'diff',
  from: string,
  to: string
}

export default function diff(previous: string, now: string) {
  const previousLines = previous.split('\n')
  const nowLines = now.split('\n')
}
