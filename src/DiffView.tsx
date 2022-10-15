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
      {
        content.map((item, index) => {
          return (
            <div key={index} className={`${classNameMap[item.type]} py-1 px-2 rounded-sm text-gray-700 min-h-[28px] flex items-center`}>
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
}

export default DiffView