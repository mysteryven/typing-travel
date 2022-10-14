import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface TextAreaProps {
    onChange: (code: string) => void
}

const TextArea = (props: TextAreaProps) => {
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
    onUpdate({editor}) {
      const text = editor.getText()
      props.onChange(text)
    }
  })
    
  return (
    <EditorContent editor={editor} />
  ) 
}

export default TextArea