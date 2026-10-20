import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const modules = {
  toolbar: [
    // Dropdown für Überschriften und normalen Text
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }], // Listen
    ["clean"],
    ["code-block"], // Button für mehrzeilige Code-Blöcke (<pre>)
    ["link"],
  ],
};

// 2. Formate registrieren
const formats = ["header", "bold", "italic", "underline", "link", "code-block"];

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
