import { useState } from 'react'
import DiffView from './DiffView'
import doDiff from './doDiff'
import TextArea from './TextArea'
import { DiffResult } from './types'

const DiffRender = () => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [result, setResult] = useState<DiffResult[]>([])
  const [history, setHistory] = useState<string[]>([])

  function handleCompare() {
    setResult(
      doDiff(from.split('\n'), to.split('\n'))
    )
  }

  function handleAddRecord() {
    const newHistory = [...history]
    newHistory.push(from)
    setHistory(newHistory)
  }

  function handleChangeHistory(index: number, newHistory: string) {
    history[index] = newHistory
    setHistory([...history])
  }

  return (
    <div className="flex p-2">
      <div className="w-1/3">
        <div>
          <div className="mb-2 text-lg font-mono font-bold">Typing Travel</div>
          <TextArea onChange={setFrom} />
          <div className="text-right">
            <button className="text-white mt-4 mr-2 py-1 px-2 font-semibold rounded-sm bg-pink-400 text-md shadow-sm" onClick={handleAddRecord}>Add to diff stack</button>
            <button className="text-white mt-4 py-1 px-2 font-semibold rounded-sm bg-teal-500 text-md shadow-sm" onClick={handleCompare}>Generate !</button>
          </div>
        </div>

        <div>
          <div className="font-mono mt-4 mb-2">Diff Stack</div>
          <div className="overflow-y-auto h-[400px] border border-gray-600 rounded-sm px-2 py-1">
            {
              history.map((eachHistory, index) => (
                <div key={index} className="mb-2 bg-gray-100 rounded-sm">
                  <TextArea value={eachHistory} onChange={(newHistory) => handleChangeHistory(index, newHistory)} />
                </div>
              ))
            }
          </div>

        </div>
      </div>
      <div className="ml-4 flex-grow">
        <DiffView content={result} />
      </div>
    </div>
  )
}

export default DiffRender