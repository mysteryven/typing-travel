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
          <div className="font-semibold mb-2">Record</div>
          <TextArea onChange={setFrom} />
          <div className="text-right">
            <button className="text-white mt-4 mr-2 py-1 px-2 font-semibold rounded-sm bg-pink-400 text-md shadow-sm" onClick={handleCompare}>Add a record</button>
            <button className="text-white mt-4 py-1 px-2 font-semibold rounded-sm bg-teal-500 text-md shadow-sm" onClick={handleCompare}>Generate!</button>
          </div>

        </div>
        <div>
          <div className="font-semibold mt-4 mb-2">To:</div>
          <TextArea onChange={setTo} />
        </div>
      </div>
      <div className="ml-4 flex-grow">
        <DiffView content={result} />
      </div>
    </div>
  )
}

export default DiffRender