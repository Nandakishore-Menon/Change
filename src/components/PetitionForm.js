import { Button, Input, Stack,Textarea } from "@chakra-ui/react";
import { useState } from "react";


function PetitionForm(props){
    let [titleValue, setTitleValue] = useState('');
    let [imageLink, setImageLink] = useState('');
    let [content, setContent] = useState('');
    let [tags,setTags] = useState('');

    let handleTitleChange = (e) => {
        let inputValue = e.target.value;
        setTitleValue(inputValue);
        // console.log("TITLE:\n",titleValue);
    }

    let handleContentChange = (e) => {
        let inputValue = e.target.value;
        setContent(inputValue);
        // console.log("CONTENT:\n",content);
    }

    let handleImageLinkChange = (e) => {
        let inputValue = e.target.value;
        setImageLink(inputValue);
        // console.log("IMAGELINK:\n",imageLink);
    }

    let handleTagChange = (e) => {
        let inputValue = e.target.value;
        setTags(inputValue);
        // console.log("TAGS:\n",tags);
    }

    let handleSubmit = (e) => {
        let tempTags = tags.split(" ");
        console.log("TITLE:\n",titleValue);
        console.log("CONTENT:\n",content);
        console.log("IMAGELINK:\n",imageLink);
        console.log("TAGS:\n",tempTags);
        console.log("submitted");
        setContent("");
        setImageLink("");
        setTags("");
        setTitleValue("");
        props.onClickFunction(0);
    }

    return (<>
        <Stack spacing={3} width='4xl'>
            {/* <Input placeholder='extra small size' size='xs' />
            <Input placeholder='small size' size='sm' />
            <Input placeholder='medium size' size='md' /> */}
            <Input placeholder='Enter the title of your petition' size='lg' onChange={handleTitleChange} value={titleValue} />
            <Textarea
                value={imageLink}
                onChange={handleImageLinkChange}
                placeholder='Link for the image'
                size='sm'
            />
            <Textarea
                value={content}
                onChange={handleContentChange}
                placeholder='Enter the content of your petition'
                size='sm'
            />
            <Textarea
                value={tags}
                onChange={handleTagChange}
                placeholder='Enter the tags for your petition separated by space'
                size='sm'
            />
            <Button colorScheme='blue' onClick={handleSubmit}>SUBMIT</Button>
            {/* <Button></Button> */}
        </Stack>
    </>);
}

export default PetitionForm;