import { Stack, Flex, Avatar, Box, StackDivider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import Comment from "./Comment";

function AllComments(props) {
    const [state, dispatch] = useStateValue();
    const [comments,setComments] = useState([]);

    const somethingChanged = ()=> {
        if(state.contract!=null && state.contract != undefined)state.contract.events.CommentAdded({fromBlock:0}).on(
            'data',
            async (event) => {
                console.log("Revieved event of CommentAdded in FullPetition",event);
                setComments([]);
                const tempComments = await state.contract.methods.getCommentsByID(props.petitionID).call({from: state.account});

                console.log("all comments", tempComments);
                setComments(tempComments);
            }
        )
    }

    useEffect(()=>{
        // console.log(props.dummy);
        const getComments = async () => {
            const tempComments = await state.contract.methods.getCommentsByID(props.petitionID).call({from: state.account});

            console.log("all comments", tempComments);
            setComments(tempComments);
        }
        somethingChanged();
        getComments();
    }, [props.dummy]);

    return (<>
        <Stack 
            divider={<StackDivider borderColor='brand.mainBG' />}
            mt="15px"
        > 
            {
                comments.map((comment, i) => {
                    // console.log("comment", comment);
                    return (<Comment 
                        key={comment.commentID} 
                        commentID={comment.commentID} 
                        commentURL={comment.commentHash} 
                        commentedBy={comment.userAddress}></Comment>
                        );
                    // return (<><h1>Comment {i}</h1></>)
                })
            }
        </Stack>
    </>);
}

export default AllComments;