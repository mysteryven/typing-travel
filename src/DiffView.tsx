import { DiffResult } from './types'

interface DiffViewProps {
  content: DiffResult[]
}

const DiffView = (props: DiffViewProps) => {
  const { content } = props
  const classNameMap = {
    'delete': 'line-delete',
    'insert': 'line-insert',
    'match': 'line-match',
    'substitute': 'line-substitute'
  }

  return (
    <div>
      <h1 className="text-lg text-center font-bold"> Result</h1>
      {
        content.map((item, index) => {
          return (
            <div key={index} className={`${classNameMap[item.type]} py-1 px-2 rounded-sm text-gray-700 min-h-[28px]`}>
              {item.content} 
            </div>
          )
        })
      }
    </div>
  )
}

export default DiffView