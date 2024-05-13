'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { Toolbar } from './toolbar';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

export default function Tiptap({
  description,
  onChange,
}: {
  description: string;
  onChange: (rishText: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        HTMLAttributes: {
          class: 'text-xl font-bold',
          levels: [1],
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc m-4 ps-10',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal m-4 ps-10',
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'underline cursor-pointer text-primary',
        },
      }),
      Image,
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          'min-h-[150px] rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      },
    },
    onUpdate({ editor }: { editor: Editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[250px] gap-1">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
