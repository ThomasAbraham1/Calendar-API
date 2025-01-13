import { useRef, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { textStreamContextFunction } from "../Contexts/textStreamContext";
import BasicButton from "./BasicButton"
import BasicTextField from './BasicTextField';


export default function TinyEditor() {
  const { textStream, setTextStream } = useContext(textStreamContextFunction());
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent() + "HELLOasda");
    }
  };
  
  return (
    <>  
      <BasicTextField label={"Send To:"} />
      <BasicTextField label={"CC:"} />
      <Editor
        apiKey='dyx9rerkxx3nkqsd5c9k5kclc7paxv2pev6b8kdsingwtxcs'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue={textStream}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <BasicButton onClickFn={log} />
      {/* <button onClick={log}>Email</button> */}
    </>
  );
}