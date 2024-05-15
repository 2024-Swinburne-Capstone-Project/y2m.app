'use client';
import { type Editor } from '@tiptap/react';
import { Bold, Strikethrough, Italic, List, ListOrdered, Heading1, Link } from 'lucide-react';
import { Toggle } from '../ui/toggle';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useState } from 'react';

type Props = {
  editor: Editor | null;
};

export function Toolbar({ editor }: Props) {
  const [showHyperlinkDialog, setShowHyperlinkDialog] = useState(false);
  const [hyperlinkUrl, setHyperlinkUrl] = useState('');

  if (!editor) {
    return null;
  }

  const showDialogAndPrefillURL = (state: boolean) => {
    const previousUrl = editor.getAttributes('link').href;
    if (previousUrl) {
      setHyperlinkUrl(previousUrl);
    }
    setShowHyperlinkDialog(state);
  };

  const addHyperlink = () => {
    //cancelled
    if (hyperlinkUrl === null) {
      return;
    }

    // empty
    if (hyperlinkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      setHyperlinkUrl('');
      setShowHyperlinkDialog(false);
      return;
    }

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: hyperlinkUrl, target: '_blank' })
      .run();
    setShowHyperlinkDialog(false);
  };

  return (
    <div className="m-b-2 border border-input bg-transparent">
      <Toggle
        size="sm"
        pressed={editor.isActive('heading')}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="size-4" />
      </Toggle>

      <Dialog open={showHyperlinkDialog} onOpenChange={showDialogAndPrefillURL}>
        <DialogTrigger asChild>
          <Toggle size="sm" pressed={editor.isActive('link')}>
            <Link className="size-4" />
          </Toggle>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Link</DialogTitle>
            <DialogDescription>
              Please make sure you have highlighted the text you want to add this link to before
              clicking on the Link button
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 pt-4">
            <Label htmlFor="url">URL:</Label>
            <Input
              id="url"
              value={hyperlinkUrl}
              onChange={(e) => setHyperlinkUrl(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={addHyperlink}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
