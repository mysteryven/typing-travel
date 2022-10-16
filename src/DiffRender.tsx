import { useState } from 'react'
import DiffView from './DiffView'
import doDiff from './doDiff'
import TextArea from './TextArea'
import { DiffItem, DiffTravel } from './types'

function stringToDiff(list: string[]): DiffItem[] {
  return list.map(item => {
    return {
      type: 'match',
      content: item
    }
  })
}

const DiffRender = () => {
  const [from, setFrom] = useState('')
  const [result, setResult] = useState<DiffTravel[]>([])
  const [diffStack, setDiffStack] = useState<string[]>([])

  function handleCompare() {
    if (diffStack.length <= 1) {
      alert('you should add text to <diff stack> first')
    }
    const result: DiffTravel[] = []
    for (let i = 1; i < diffStack.length; i++) {
      const prev = diffStack[i - 1].split('\n')
      const next = diffStack[i].split('\n')
      result.push([stringToDiff(prev), doDiff(prev, next), stringToDiff(next)])
    }

    setResult(result)
  }

  function handleAddRecord() {
    const newHistory = [...diffStack]
    newHistory.push(from)
    setDiffStack(newHistory)
  }

  function handleChangeHistory(index: number, newHistory: string) {
    diffStack[index] = newHistory
    setDiffStack([...diffStack])
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
              diffStack.map((content, index) => (
                <div key={index} className="mb-2 bg-gray-100 rounded-sm">
                  <TextArea value={content} onChange={(newContent) => handleChangeHistory(index, newContent)} />
                </div>
              ))
            }
          </div>

        </div>
      </div>
      <div className="ml-4 flex-grow">
        {
          result.length > 0 && (
            <DiffView diffResult={result} />
          )
        }
      </div>
    </div>
  )
}

export default DiffRender