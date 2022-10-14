import { useState } from 'react'
import DiffView from './DiffView'
import doDiff from './doDiff'
import { DiffResult } from './types'

const DiffRender = () => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [result, setResult] = useState<DiffResult[]>([])

  function handleCompare() {
    setResult(
      doDiff(from.split('\n'), to.split('\n'))
    )
  }

  return (
    <div>
      <div>
        <div>
          <textarea onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div>
          <textarea onChange={(e) => setTo(e.target.value)} />
        </div>
        <button onClick={handleCompare}>Compare !</button>
      </div>
      <div>
        <DiffView content={result} />
      </div>
    </div>
  )
}

export default DiffRender