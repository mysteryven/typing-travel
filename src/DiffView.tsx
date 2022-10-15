import { useCallback, useEffect, useState } from 'react'
import CodePanel from './CodePanel'
import { DiffTravel } from './types'

interface DiffViewProps {
  diffResult: DiffTravel[]
}

const DiffView = (props: DiffViewProps) => {
  const { diffResult } = props
  const [beforeRef, setBeforeRef] = useState<HTMLDivElement>()
  const [afterRef, setAfterRef] = useState<HTMLDivElement>()

  const memoBeforeRefFn = useCallback((node: HTMLDivElement) => {
    if (node) {
      setBeforeRef(node)
    }
  }, [])

  const memoAfterRefFn = useCallback((node: HTMLDivElement) => {
    if (node) {
      setAfterRef(node)
    }
  }, [])

  useEffect(() => {
    if (beforeRef && afterRef) {

    }
  }, [beforeRef, afterRef])

  return (
    <div>
      <h1 className="text-lg text-center font-bold"> Result</h1>
      <div>
        <div className="flex justify-end items-center my-4">
          <div className="flex items-center mr-2 ">
            <div className="line-delete rounded-sm w-16 h-6" />
            <span className="ml-2 text-gray-600">Delete</span>
          </div>
          <div className="flex items-center mr-2">
            <div className="line-insert rounded-sm w-16 h-6" />
            <span className="ml-2 text-gray-600">Insert</span>
          </div>
          <div className="flex items-center">
            <div className="line-substitute rounded-sm w-16 h-6" />
            <span className="ml-2 text-gray-600">Substitute</span>
          </div>
        </div>
      </div>
      <div>
        {
          diffResult.map((changeProcess, index) => (
            <div key={index} className="flex">
              <CodePanel ref={memoBeforeRefFn} content={changeProcess[0]} />
              <CodePanel ref={memoAfterRefFn} content={changeProcess[2]} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DiffView