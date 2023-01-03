import { Button, Input, Stack,Textarea} from "@chakra-ui/react";
import { FileUploader, FileCard } from "evergreen-ui";
import { useState } from "react";
import { useStateValue } from "../StateProvider";
import {uploadPetition, base64} from "../util/ipfs";
import { useNavigate } from "react-router-dom";

function PetitionForm(props){
    const [state,dispatch] = useStateValue();
    const navigate = useNavigate();

    let [titleValue, setTitleValue] = useState('');
    let [image, setImage] = useState();
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

    let handleImageChange = async (e) => {
        let inputValue = e;
        console.log(e);
        setImage(inputValue);
        base64(inputValue[0]).then((base)=>{
            console.log(base);
        })
        
    }

    let handleRemove = (e) => {
        setImage(undefined);
        // console.log("IMAGE:\n",image);
    }

    let handleTagChange = (e) => {
        let inputValue = e.target.value;
        setTags(inputValue);
        // console.log("TAGS:\n",tags);
    }

    let handleSubmit = async (e) => {
        let tempTags = tags.split(" ");
        let img_base64;
        await base64(image[0]).then((base)=>{
            // console.log(base);
            img_base64 = base;
        })
        // console.log("TITLE:\n",titleValue);
        // console.log("CONTENT:\n",content);
        // console.log("IMAGE:\n",img_base64);
        // console.log("TAGS:\n",tempTags);
        // console.log("submitted");
        let time = new Date().toLocaleString();
        
        const metadata = await uploadPetition(titleValue, content, time, tags, img_base64);
        console.log("metadata")
        console.log(metadata)
        setContent("");
        setImage(undefined);
        setTags("");
        setTitleValue("");
        console.log("metadata:", metadata[0].path)
        const response = await state.contract.methods.addPetition(metadata[0].path).send({from:state.account});
        console.log("response",response);
        navigate("/");
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
        </Stack>
    </>);
}

export default PetitionForm;