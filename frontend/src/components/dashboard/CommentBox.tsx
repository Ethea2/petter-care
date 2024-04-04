import { Paper } from "@mantine/core"
import CreateComment from '../dashboard/CreateComment'
import Comments from '../dashboard/Comments'

const CommentBox = () => {

    return (
        <>
            <Paper className="bg-white w-auto h-auto rounded-2xl mt-6 pb-2 shadow-md hover:cursor-pointer hover:brightness-95 transition duration-300 ease-in-out">
                < CreateComment />
                < Comments />
                < Comments />
                < Comments />
            </Paper>
        </>
    );
};

export default CommentBox;

