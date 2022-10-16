import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import Xarrow from 'react-xarrows'
import CodePanel from './CodePanel'
import { DiffTravel } from './types'

interface DiffViewProps {
  diffResult: DiffTravel[]
}

const DiffView = (props: DiffViewProps) => {
  const { diffResult } = props

  const ids = new Array(diffResult.length).fill(null).map((_, index) => {
    return [`code-start-${index}`, `code-end-${index}`]
  })

  return (
    <div>
      <h1 className="text-lg text-center font-bold mb-12"> Result</h1>
      <div className="fixed top-8 right-4 z-10">
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
      <div className="relative bg-teal-600 p-4">
        {
          diffResult.map((changeProcess, index) => (
            <div key={index} className="flex justify-between items-start relative mb-32">
              <div id={ids[index][0]}>
                <CodePanel content={changeProcess[0]} />
              </div>
              <div id={ids[index][1]} className="mt-6">
                <CodePanel content={changeProcess[2]} />
              </div>
              <div className="absolute left-[280px] top-[50%] z-10">
                <CodePanel content={changeProcess[1]}></CodePanel>
              </div>
            </div>
          ))
        }
      </div>
      {
        ids.map(([startId, endId], index) => {
          return (
            <Fragment key={Math.random()}>
              <Xarrow color="rgb(249, 168, 212, 0.4)" zIndex={3} curveness={0.4} strokeWidth={6} start={startId} end={endId} />
              {
                index !== ids.length - 1 && (
                  <Xarrow color="#f5d0fe" zIndex={1} showHead={false} curveness={0.4} strokeWidth={6} start={endId} end={ids[index+1][0]} />
                )
              }
            </Fragment>
          )
        })
      }
    </div >
  )
}

export default DiffView