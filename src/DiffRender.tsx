import { useState } from 'react'
import DiffView from './DiffView'
import doDiff from './doDiff'
import TextArea from './TextArea'
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
    <div className="flex p-2">
      <div className="w-1/3">
        <div>
          <div className="font-semibold mb-2">From:</div>
          <TextArea onChange={setFrom} />
        </div>
        <div>
          <div className="font-semibold mt-4 mb-2">To:</div>
          <TextArea onChange={setTo} />
        </div>
        <button className="text-white mt-4 p-1 font-semibold rounded-none bg-sky-500 text-sm shadow-sm" onClick={handleCompare}>Compare !</button>
      </div>
      <div className="ml-4 flex-grow">
        <DiffView content={result} />
      </div>
    </div>
  )
}

export default DiffRender