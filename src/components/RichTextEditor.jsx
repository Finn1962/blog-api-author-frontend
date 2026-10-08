import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function RichTextEditor({ textEditorValue, setTextEditorValue }) {
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={textEditorValue}
        onChange={setTextEditorValue}
      />
    </div>
  );
}

export default RichTextEditor;
