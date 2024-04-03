import { Paper, Button } from "@mantine/core"
import { RichTextEditor } from "@mantine/tiptap"
import Highlight from "@tiptap/extension-highlight"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import TextStyle from "@tiptap/extension-text-style"
import Underline from "@tiptap/extension-underline"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import axios from "axios"
import { useAuth } from "../../hooks/useAuth"
import { toast } from "react-toastify"

const content = ""

const CreateComment = () => {
    const { user } = useAuth()
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Highlight,
            TextStyle,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Placeholder.configure({ placeholder: "Write a comment..." })
        ],
        content
    })

    const postComment = async () => {
        if (!editor) {
            toast("Comment Box not initialized", {
                type: "error",
                autoClose: 3000
            })
            return
        }
        const commentContent = editor.getHTML()
        const res = await axios.post(
            import.meta.env.VITE_DEFAULT_URL + "/api/comment/",
            {
                content: commentContent
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`
                }
            }
        )       
        if (res.status !== 200) {
            toast("Something went wrong", {
                type: "error",
                autoClose: 3000
            })
            return
        }
        toast("Comment added successfully!", {
            type: "success",
            autoClose: 3000
        })
    }


    return (
        <>
            <Paper className="bg-white w-auto h-auto rounded-t-2xl rounded-b-none border-b border-input-grey mt-6 p-6">
                <div className="flex justify-between">
                    <div>
                        <div className="lg:w-12 xl:w-16">
                            <img src="/user-profile.svg" alt="Profile" />
                        </div>
                    </div>

                    <div className="w-full pl-6">
                        <RichTextEditor editor={editor}>
                            <RichTextEditor.Toolbar sticky stickyOffset={60}>

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
                                    <RichTextEditor.Blockquote />
                                    <RichTextEditor.Hr />
                                    <RichTextEditor.BulletList />
                                    <RichTextEditor.OrderedList />
                                    <RichTextEditor.Subscript />
                                    <RichTextEditor.Superscript />
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

                        <div className="flex flex-row text-primary-blue justify-between items-end">
                            <Button 
                                className="ml-auto rounded-2xl hover:bg-black mt-4 duration-300 ease-in-out"
                                onClick={postComment}
                            >
                                Comment
                            </Button>
                        </div>
                    </div>


                </div>

            </Paper>
        </>
    );
};

export default CreateComment;

