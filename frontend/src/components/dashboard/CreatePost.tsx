import { ActionIcon, Button, FileButton } from "@mantine/core"

import { Link, RichTextEditor } from "@mantine/tiptap"
import { IconColorPicker } from "@tabler/icons-react"
import { Color } from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import Placeholder from "@tiptap/extension-placeholder"
import SubScript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import TextStyle from "@tiptap/extension-text-style"
import Underline from "@tiptap/extension-underline"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import { PiImageBold } from "react-icons/pi"

// add import from controller

import axios from "axios"
import { useAuth } from "../../hooks/useAuth"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
//import { uploadPost } from '../../controllers/post.controller'

const content = ""

const CreatePost = () => {
    const { user } = useAuth()
    const [image, setImage] = useState<File | null>()
    const [imageName, setImageName] = useState<string>("")
    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image)
            setImageName(objectUrl)
        } else {
            setImageName("")
        }
    }, [image])
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
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Placeholder.configure({ placeholder: "Start a post..." })
        ],
        content
    })

    const uploadPost = async () => {
        if (!editor) {
            toast("Post Box not initialized", {
                type: "error",
                autoClose: 3000
            })
            return
        }
        const postContent = editor.getHTML().toString()
        if (!imageName) {
            const res = await fetch(
                import.meta.env.VITE_DEFAULT_URL + "/api/post/upload",
                {
                    method: "POST",
                    body: JSON.stringify({ title: "test", body: postContent }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.token}`
                    }
                }
            )
            const json = await res.json()
            if (!res.ok) {
                toast("Something went wrong", {
                    type: "error",
                    autoClose: 3000
                })
                console.log(json)
                return
            }
            toast("Post added successfully!", {
                type: "success",
                autoClose: 3000
            })
            window.location.reload()
            return
        }
        const res = await axios.post(
            `${import.meta.env.VITE_DEFAULT_URL}/api/post/upload`,
            {
                body: postContent,
                img: image
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
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
        console.log(res)
        toast("Post added successfully!", {
            type: "success",
            autoClose: 3000
        })
        window.location.reload()
        return
    }

    return (
        <div className="bg-white w-full h-auto rounded-2xl p-6 mb-8 shadow-md">
            <div className="flex justify-between">
                <div>
                    <div className="lg:w-12 xl:w-16">
                        <img src="/user-profile.svg" alt="Profile" />
                    </div>
                </div>

                <div className="w-full pl-6">
                    <RichTextEditor editor={editor}>
                        <RichTextEditor.Toolbar sticky stickyOffset={60}>
                            <RichTextEditor.ColorPicker
                                colors={[
                                    "#25262b",
                                    "#868e96",
                                    "#fa5252",
                                    "#e64980",
                                    "#be4bdb",
                                    "#7950f2",
                                    "#4c6ef5",
                                    "#228be6",
                                    "#15aabf",
                                    "#12b886",
                                    "#40c057",
                                    "#82c91e",
                                    "#fab005",
                                    "#fd7e14"
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

                    <div className="flex flex-row text-primary-blue justify-between items-end">
                        <div className="-mb-1">
                            {imageName ? (
                                <img
                                    src={imageName}
                                    className="object-cover rounded-lg w-[10%] h-[10%]"
                                />
                            ) : (
                                <FileButton
                                    accept="image/png,image/jpeg"
                                    onChange={setImage}
                                >
                                    {(props) => (
                                        <ActionIcon
                                            {...props}
                                            radius="xl"
                                            size="xl"
                                        >
                                            <PiImageBold size={20} />
                                        </ActionIcon>
                                    )}
                                </FileButton>
                            )}
                        </div>
                        <Button
                            className="rounded-2xl hover:bg-black mt-4 duration-300 ease-in-out"
                            onClick={uploadPost}
                        >
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
