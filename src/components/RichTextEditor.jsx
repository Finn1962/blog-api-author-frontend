import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
    ["code-block"],
    ["link"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "link",
  "code-block",
  "list",
];

function RichTextEditor({ textEditorValue, setTextEditorValue }) {
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={textEditorValue}
        onChange={setTextEditorValue}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

export default RichTextEditor;
