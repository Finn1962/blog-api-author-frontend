import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyMceEditor() {
  const [content, setContent] = useState("<p>Starten Sie hier...</p>");

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Editor
        // Ein kostenloser API-Schlüssel von tiny.cloud entfernt den Test-Hinweis
        apiKey="ihr-api-key-oder-no-api-key"
        value={content}
        onEditorChange={handleEditorChange}
        init={{
          height: 300,
          menubar: true, // Blendet die Menüleiste (Datei, Bearbeiten, Ansicht...) ein/aus
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          // Hier definieren Sie die fertige Toolbar – ganz ohne eigenes Styling!
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
}
