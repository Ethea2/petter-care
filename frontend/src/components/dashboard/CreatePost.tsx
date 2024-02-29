import {
  ActionIcon
} from '@mantine/core';

import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { IconColorPicker } from '@tabler/icons-react';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';

const content = ''

import {
  Textarea,
} from '@mantine/core';
import { PiImageBold, PiArrowRightBold } from "react-icons/pi";

const CreatePost = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
  });

  return (
    <div className="flex bg-white w-auto h-auto rounded-2xl space-x-6 p-6 mb-10 shadow-md">
      <div>
        <div className="w-10 lg:w-12 xl:w-16 h-auto">
          <img src="/user-profile.svg" alt="Profile" />
        </div>
      </div>

      <RichTextEditor className="w-full pt-1" editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ColorPicker
            colors={[
              '#25262b',
              '#868e96',
              '#fa5252',
              '#e64980',
              '#be4bdb',
              '#7950f2',
              '#4c6ef5',
              '#228be6',
              '#15aabf',
              '#12b886',
              '#40c057',
              '#82c91e',
              '#fab005',
              '#fd7e14',
            ]}
          />

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control interactive={false}>
              <IconColorPicker size="1rem" stroke={1.5} />
            </RichTextEditor.Control>
            <RichTextEditor.Color color="#F03E3E" />
            <RichTextEditor.Color color="#7048E8" />
            <RichTextEditor.Color color="#1098AD" />
            <RichTextEditor.Color color="#37B24D" />
            <RichTextEditor.Color color="#F59F00" />
            <RichTextEditor.UnsetColor />
          </RichTextEditor.ControlsGroup>


          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
      {/* <Textarea
                variant="filled"
                placeholder="Start a post..."
                radius='md'
                autosize
                minRows={2}
                className="w-full pt-1"
            /> */}

      <div className="flex space-x-4 text-4xl text-primary-blue">
        <ActionIcon radius='xl' size='xl'>
          <PiImageBold size={20} />
        </ActionIcon>
        {/* TODO: Add dropzone */}
        <ActionIcon radius='xl' size='xl'>
          <PiArrowRightBold size={20} />
        </ActionIcon>
      </div>
    </div>
  );
};

export default CreatePost;
