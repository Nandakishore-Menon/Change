import { Button, Input, Stack,Textarea} from "@chakra-ui/react";
import { FileUploader, FileCard } from "evergreen-ui";
import { useState } from "react";
import { useStateValue } from "../StateProvider";
import {uploadPetition} from "../util/ipfs";

function PetitionForm(props){
    const [state,dispatch] = useStateValue();

    let [titleValue, setTitleValue] = useState('');
    let [image, setImage] = useState();
    let [content, setContent] = useState('');
    let [tags,setTags] = useState('');

    let handleTitleChange = (e) => {
        let inputValue = e.target.value;
        setTitleValue(inputValue);
        console.log("TITLE:\n",titleValue);
    }

    let handleContentChange = (e) => {
        let inputValue = e.target.value;
        setContent(inputValue);
        console.log("CONTENT:\n",content);
    }

    let handleImageChange = (e) => {
        let inputValue = e;
        console.log(e);
        setImage(inputValue);
        console.log("IMAGE:\n",image);
    }

    let handleRemove = (e) => {
        setImage(undefined);
        console.log("IMAGE:\n",image);
    }

    let handleTagChange = (e) => {
        let inputValue = e.target.value;
        setTags(inputValue);
        console.log("TAGS:\n",tags);
    }

    let handleSubmit = async (e) => {
        let tempTags = tags.split(" ");
        console.log("TITLE:\n",titleValue);
        console.log("CONTENT:\n",content);
        console.log("IMAGE:\n",image.toString("base64"));
        console.log("TAGS:\n",tempTags);
        console.log("submitted");
        let time = new Date().toLocaleString();
        await uploadPetition(titleValue, content, time, tags, image);
        setContent("");
        setImage("");
        setTags("");
        setTitleValue("");
        // props.onClickFunction(0);
    }

    return (<>
        <Stack spacing={3} width='4xl'>
            {/* <Input placeholder='extra small size' size='xs' />
            <Input placeholder='small size' size='sm' />
            <Input placeholder='medium size' size='md' /> */}
            <Input placeholder='Enter the title of your petition' size='lg' onChange={handleTitleChange} value={titleValue} />
            {/* <Textarea
                value={imageLink}
                onChange={handleImageLinkChange}
                placeholder='Link for the image'
                size='sm'
            /> */}
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
      <FileUploader
        label="Upload File"
        description="You can upload 1 file. File can be up to 50 MB."
        maxSizeInBytes={50 * 1024 ** 2}
        maxFiles={1}
        onChange={handleImageChange}
        renderFile={(file) => {
            const { name, size, type } = file
            const { message } = (size < 50 * 1024 ** 2) ? `Image of size ${size} bytes uploaded` :"File too large";
            return (
              <FileCard
                key={name}
                isInvalid={size > 50 * 1024 ** 2}
                name={name}
                onRemove={handleRemove}
                sizeInBytes={size}
                type={type}
                validationMessage={message}
              />
            )
        }}
        values={image}
      />
            <Button colorScheme='blue' onClick={handleSubmit}>SUBMIT</Button>
            {/* <Button></Button> */}
        </Stack>
    </>);
}

export default PetitionForm;