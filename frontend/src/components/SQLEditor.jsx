import React from 'react';
import Editor from '@monaco-editor/react';

const SQLEditor = ({ value, onChange }) => {
  const handleEditorChange = (newValue) => {
    onChange(newValue || '');
  };

  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'on',
    theme: 'vs-light'
  };

  return (
    <div className="sql-editor">
      <Editor
        height="300px"
        defaultLanguage="sql"
        value={value}
        onChange={handleEditorChange}
        options={editorOptions}
        loading={<div className="editor-loading">Loading SQL Editor...</div>}
      />
    </div>
  );
};

export default SQLEditor;