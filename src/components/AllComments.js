import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Comment from "./Comment";

function AllComments(props) {
    const [comments,setComments] = useState([]);
    useEffect(()=>{
        const getComments = async () => {
            const tempComments = await state.contract.methods.getCommentsByID(props.petitionID).call({from: state.account});
            setComments(tempComments);
        }
        getComments();
    });

    return (<>
        <Stack spacing='4'> 
            {
                comments.map((comment) => {
                    return <Comment key={comment.commentID} commentID={comment.commentID} commentURL={comment.commentHash} commentedBy={comment.userAddress}></Comment>;
                })
            }
        </Stack>
    </>);
}

export default AllComments;