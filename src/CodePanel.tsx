import  { forwardRef, RefObject } from 'react'
import { DiffItem } from './types'

interface CodePanelProps {
  content: DiffItem[]
}

const CodePanel = forwardRef<HTMLDivElement, CodePanelProps>(function CodePanel(props, ref) {
  const { content } = props
  const classNameMap = {
    'delete': 'line-delete',
    'insert': 'line-insert',
    'match': 'line-match',
    'substitute': 'line-substitute'
  }
  return (
    <div className="rounded-sm w-64 border bg-white shadow-xl" ref={ref}>
      {
        content.map((item, index) => {
          return (
            <div key={index} className={`${classNameMap[item.type]} py-1 px-2 min-h-[28px] flex items-center`}>
              <div className="text-gray-500 pr-4 mr-2">
                {index + 1}
              </div>
              <div>
                {item.content}
              </div>
            </div>
          )
        })
      }
    </div>
  )
})

export default CodePanel