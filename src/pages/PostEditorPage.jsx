import RichTextEditor from "../Components/RichTextEditor.jsx";

function PostEditorPage() {
  return (
    <>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Page title</legend>
        <input type="text" className="input" placeholder="My awesome page" />
      </fieldset>
      <RichTextEditor />
    </>
  );
}

export default PostEditorPage;
