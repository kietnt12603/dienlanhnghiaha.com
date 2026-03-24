'use client';

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface EditorProps {
  value: string;
  onChange: (data: string) => void;
  placeholder?: string;
}

export default function Editor({ value, onChange, placeholder }: EditorProps) {
  return (
    <div className="prose-editor dark:prose-invert">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          placeholder: placeholder,
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote',
            'insertTable',
            'undo',
            'redo'
          ],
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
      <style jsx global>{`
        .prose-editor .ck-editor__editable {
          min-height: 400px;
          border-radius: 0 0 24px 24px !important;
          background-color: transparent !important;
          color: inherit !important;
          padding: 0 2rem !important;
        }
        .prose-editor .ck-toolbar {
          border-radius: 24px 24px 0 0 !important;
          background-color: rgba(0, 0, 0, 0.02) !important;
          border-color: rgba(0, 0, 0, 0.05) !important;
          padding: 0.5rem 1rem !important;
        }
        .dark .prose-editor .ck-toolbar {
          background-color: rgba(255, 255, 255, 0.05) !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
        }
        .dark .prose-editor .ck-toolbar__items {
          background-color: transparent !important;
        }
        .dark .prose-editor .ck-button {
          color: #f8fafc !important;
        }
        .dark .prose-editor .ck-button:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .dark .prose-editor .ck-content {
          background-color: #0f172a !important;
          color: #f8fafc !important;
        }
        .dark .prose-editor .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused) {
            border-color: rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>
    </div>
  );
}
