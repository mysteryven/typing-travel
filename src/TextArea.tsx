import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

interface TextAreaProps {
  onChange: (code: string) => void;
  value?: string;
  type?: 'html' | 'text'
}

const TextArea = (props: TextAreaProps) => {
  const { value } = props

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none border px-2 py-1 min-h-[180px]',
      },
    },
    content: '',
    onUpdate({ editor }) {
      if (props.type === 'html') {
        const text = editor.getHTML()
        props.onChange(text)
      } else {
        const text = editor.getText().replaceAll('\n\n', '\n')
        props.onChange(text)
      }
    }
  })

  useEffect(() => {
    if (value) {
      editor?.commands.setContent(`<div>${value}</div>`)
    }

  }, [value, editor])

  return (
    <EditorContent editor={editor} />
  )
}

export default TextArea