import { Button, Center, Input, Spacer, Stack, HStack, Textarea} from "@chakra-ui/react";
import { FileUploader, FileCard, Heading } from "evergreen-ui";
import { useState } from "react";
import { useStateValue } from "../StateProvider";
import {uploadPetition, base64} from "../util/ipfs";
import { useNavigate } from "react-router-dom";
import {Card, CardHeader, CardBody, CardFooter, Text} from '@chakra-ui/react';
import {ArrowBackIcon, ArrowForwardIcon} from '@chakra-ui/icons'
import { TagInput, CornerDialog } from "evergreen-ui";

function PetitionForm(props){
    const [state,dispatch] = useStateValue();
    const navigate = useNavigate();
    const [formState, setFormState] = useState("0");
    let [titleValue, setTitleValue] = useState('');
    let [image, setImage] = useState();
    let [content, setContent] = useState('');
    let [tagList,setTagList] = useState([]);
    

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


    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    let handleSubmit = async (e) => {
        // let tempTags = tags.split(" ");
        let img_base64;
        await base64(image[0]).then((base)=>{
            // console.log(base);
            img_base64 = base;
        })
        setFormState("4");
        // console.log("TITLE:\n",titleValue);
        // console.log("CONTENT:\n",content);
        // console.log("IMAGE:\n",img_base64);
        // console.log("TAGS:\n",tempTags);
        // console.log("submitted");
        let time = new Date().toLocaleString();
        
        const metadata = await uploadPetition(titleValue, content, time, tagList.join(" "), img_base64);
        console.log("metadata")
        console.log(metadata)
        setContent("");
        setImage(undefined);
        setTagList([]);
        setTitleValue("");
        console.log("metadata:", metadata[0].path)
        const response = await state.contract.methods.addPetition(metadata[0].path).send({from:state.account});
        console.log("response",response);
        setFormState("5")
        await sleep(5000);
        setFormState("0");
        await sleep(3000);
        navigate("/");
    }
    let handleBack = async (e) => {
        if(formState == "1") {
            setFormState("0");
        }
        else if(formState == "2") {
            setFormState("1");
        }
        else if(formState == "3") {
            setFormState("2");
        }
    }
    let handleContinue = async (e) => {
        if(formState == "0") {
            setFormState("1");
        }
        else if(formState == "1") {
            setFormState("2");
        }
        else if(formState == "2") {
            setFormState("3");
        }
    }
    return (<>
            {
                    {
                    "0": 
                    <Center bgColor={"brand.formBG"} h="91vh">
                        <Card borderRadius="modalRadius" w="60%" h="70vh"  bgColor={"white"}>
                            
                            <CardHeader>
                                <Center>
                                    <Text fontSize="headings" fontWeight="700" mt="2vh">
                                        Let's start a movement!
                                    </Text>
                                </Center>
                            </CardHeader>
                            <CardBody >
                                <Center h={"100%"}>
                                    <Stack w={"80%"} h={"100%"}>
                                    {/* <Text>
                                        Give a title for your cause. <br></br>
                                    </Text> */}
                                    <Text fontWeight="700"> Petition title</Text>
                                    <Input w="100%" size='lg' onChange={handleTitleChange} value={titleValue} h={"10vh"}/>
                                    <HStack w={"100%"} h={"100%"} mt="10vh" >
                                        <Spacer/>
                                        <Button
                                        onClick={()=>{handleBack()}}
                                        bgColor='white'
                                        // colorScheme={"black"}
                                        color='brand.fontDark'
                                        border='2px'
                                        borderRadius='buttonRadius'
                                        variant='solid'
                                        // width="6vw"
                                        disabled={formState=="0"}
                                        m="0px"
                                        p="20px"
                                        _hover={{
                                            background: "brand.mainBG",
                                            color: "brand.fontDark",
                                            border: "2px",
                                            borderColor: "brand.buttonHover",
                                        }}
                                        >
                                        {/* <ArrowBackIcon boxSize={8}/> */}
                                        Back
                                        </Button>
                                        <Spacer/>
                                        <Button
                                        bgColor='black'
                                        // colorScheme={"black"}
                                        color='brand.fontLight'
                                        border='2px'
                                        // width="6vw"
                                        borderRadius='buttonRadius'
                                        variant='solid'
                                        disabled={titleValue == ""}
                                        m="0px"
                                        p="20px"
                                        _hover={{
                                            background: "white",
                                            color: "brand.buttonHover",
                                            borderColor: "black",

                                        }}
                                        onClick={()=> handleContinue()}
                                        >
                                            {/* <ArrowForwardIcon boxSize={8}/></Button> */}
                                            Continue
                                            </Button>
                                        <Spacer/>
                                    </HStack>

                                    </Stack>
                                </Center>
                            </CardBody>
                            <CardFooter></CardFooter>
                        </Card>
                    </Center>,
                    "1": <Center bgColor={"brand.mainBG"} h="91vh">
                    <Card borderRadius="modalRadius" w="60%" h="70vh"  bgColor={"white"}>
                        
                        <CardHeader>
                            <Center>
                                <Text fontSize="headings" fontWeight="700" mt="2vh">
                                    Describe your movement
                                </Text>
                            </Center>
                        </CardHeader>
                        <CardBody >
                            <Center h={"100%"}>
                                <Stack w={"80%"} h={"100%"}>
                                {/* <Text>
                                    Give a title for your cause. <br></br>
                                </Text> */}
                                <Text fontWeight="700"> Detailed desciption of the petition</Text>
                                <Textarea
                                    value={content}
                                    onChange={handleContentChange}
                                    // resize={"none"}
                                    sx={{height: "40vh"}}

                                />
                                <HStack w={"100%"} h={"100%"} pt="5vh" alignItems={"top"}>
                                    <Spacer/>
                                    <Button
                                    onClick={()=>{handleBack()}}
                                    bgColor='white'
                                    // colorScheme={"black"}
                                    color='brand.fontDark'
                                    border='2px'
                                    borderRadius='buttonRadius'
                                    variant='solid'
                                    // width="6vw"
                                    disabled={formState=="0"}
                                    m="0px"
                                    p="20px"
                                    _hover={{
                                        background: "brand.mainBG",
                                        color: "brand.fontDark",
                                        border: "2px",
                                        borderColor: "brand.buttonHover",
                                    }}
                                    >
                                    {/* <ArrowBackIcon boxSize={8}/> */}
                                    Back
                                    </Button>
                                    <Spacer/>
                                    <Button
                                    bgColor='black'
                                    // colorScheme={"black"}
                                    color='brand.fontLight'
                                    border='2px'
                                    // width="6vw"
                                    borderRadius='buttonRadius'
                                    variant='solid'
                                    disabled={titleValue == ""}
                                    m="0px"
                                    p="20px"
                                    _hover={{
                                        background: "white",
                                        color: "brand.buttonHover",
                                        borderColor: "black",

                                    }}
                                    onClick={()=> handleContinue()}
                                    >
                                        {/* <ArrowForwardIcon boxSize={8}/></Button> */}
                                        Continue
                                        </Button>
                                    <Spacer/>
                                </HStack>

                                </Stack>
                            </Center>
                        </CardBody>
                        <CardFooter></CardFooter>
                    </Card>
                </Center>,
                "2": <Center bgColor={"brand.mainBG"} h="91vh">
                <Card borderRadius="modalRadius" w="60%" h="70vh"  bgColor={"white"}>
                    
                    <CardHeader>
                        <Center>
                            <Text fontSize="headings" fontWeight="700" mt="2vh">
                                Describe your movement
                            </Text>
                        </Center>
                    </CardHeader>
                    <CardBody >
                        <Center h={"100%"}>
                            <Stack w={"80%"} h={"100%"}>
                            {/* <Text>
                                Give a title for your cause. <br></br>
                            </Text> */}
                            <Text fontWeight="700"> List topics that best fits your movement</Text>
                            {/* <Textarea
                                value={tags}
                                onChange={handleTagChange}
                                // resize={"none"}
                                sx={{height: "40vh"}}

                            /> */}


                            <TagInput
                            inputProps={{ placeholder: 'Add topics...', height:"50px"}}
                            tagSubmitKey="space"
                            tagProps={{height:"40px", fontSize: "15px", color:"#efe8fe"}}
                            values={tagList}
                            onChange={(tag) => {
                                setTagList(tag)
                            }}
                            />
                            <HStack w={"100%"} h={"100%"} pt="5vh" alignItems={"top"}>
                                <Spacer/>
                                <Button
                                onClick={()=>{handleBack()}}
                                bgColor='white'
                                // colorScheme={"black"}
                                color='brand.fontDark'
                                border='2px'
                                borderRadius='buttonRadius'
                                variant='solid'
                                // width="6vw"
                                disabled={formState=="0"}
                                m="0px"
                                p="20px"
                                _hover={{
                                    background: "brand.mainBG",
                                    color: "brand.fontDark",
                                    border: "2px",
                                    borderColor: "brand.buttonHover",
                                }}
                                >
                                {/* <ArrowBackIcon boxSize={8}/> */}
                                Back
                                </Button>
                                <Spacer/>
                                <Button
                                bgColor='black'
                                // colorScheme={"black"}
                                color='brand.fontLight'
                                border='2px'
                                // width="6vw"
                                borderRadius='buttonRadius'
                                variant='solid'
                                disabled={titleValue == ""}
                                m="0px"
                                p="20px"
                                _hover={{
                                    background: "white",
                                    color: "brand.buttonHover",
                                    borderColor: "black",

                                }}
                                onClick={()=> handleContinue()}
                                >
                                    {/* <ArrowForwardIcon boxSize={8}/></Button> */}
                                    Continue
                                    </Button>
                                <Spacer/>
                            </HStack>

                            </Stack>
                        </Center>
                    </CardBody>
                    <CardFooter></CardFooter>
                </Card>
            </Center>,
            "3": <Center bgColor={"brand.mainBG"} h="91vh">
            <Card borderRadius="modalRadius" w="60%" h="70vh"  bgColor={"white"}>
                
                <CardHeader>
                    <Center>
                        <Text fontSize="headings" fontWeight="700" mt="2vh">
                            Describe your movement
                        </Text>
                    </Center>
                </CardHeader>
                <CardBody >
                    <Center h={"100%"}>
                        <Stack w={"80%"} h={"100%"}>
                        {/* <Text>
                            Give a title for your cause. <br></br>
                        </Text> */}
                        <Text fontSize="20px" fontWeight="700">Show people an image that best describes your movement</Text>
                        {/* <Textarea
                            value={tags}
                            onChange={handleTagChange}
                            // resize={"none"}
                            sx={{height: "40vh"}}

                        /> */}


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
                        <HStack w={"100%"} h={"100%"} pt="1vh" alignItems={"top"}>
                            <Spacer/>
                            <Button
                            onClick={()=>{handleBack()}}
                            bgColor='white'
                            // colorScheme={"black"}
                            color='brand.fontDark'
                            border='2px'
                            borderRadius='buttonRadius'
                            variant='solid'
                            // width="6vw"
                            disabled={formState=="0"}
                            m="0px"
                            p="20px"
                            _hover={{
                                background: "brand.mainBG",
                                color: "brand.fontDark",
                                border: "2px",
                                borderColor: "brand.buttonHover",
                            }}
                            >
                            {/* <ArrowBackIcon boxSize={8}/> */}
                            Back
                            </Button>
                            <Spacer/>
                            <Button
                            bgColor='black'
                            // colorScheme={"black"}
                            color='brand.fontLight'
                            border='2px'
                            // width="6vw"
                            borderRadius='buttonRadius'
                            variant='solid'
                            disabled={titleValue == ""}
                            m="0px"
                            p="20px"
                            _hover={{
                                background: "white",
                                color: "brand.buttonHover",
                                borderColor: "black",

                            }}

                            onClick={()=> handleSubmit()}
                            isLoading={formState=="4"}
                            >
                                {/* <ArrowForwardIcon boxSize={8}/></Button> */}
                                Submit
                                </Button>
                            <Spacer/>
                        </HStack>

                        </Stack>
                    </Center>
                </CardBody>
                <CardFooter></CardFooter>
            </Card>
        </Center>,
        "4": <Center bgColor={"brand.mainBG"} h="91vh">
        <Card borderRadius="modalRadius" w="60%" h="70vh"  bgColor={"white"}>
            
            <CardHeader>
                <Center>
                    <Text fontSize="headings" fontWeight="700" mt="2vh">
                        Describe your movement
                    </Text>
                </Center>
            </CardHeader>
            <CardBody >
                <Center h={"100%"}>
                    <Stack w={"80%"} h={"100%"}>
                    {/* <Text>
                        Give a title for your cause. <br></br>
                    </Text> */}
                    <Text fontSize="20px" fontWeight="700">Show people an image that best describes your movement</Text>
                    {/* <Textarea
                        value={tags}
                        onChange={handleTagChange}
                        // resize={"none"}
                        sx={{height: "40vh"}}

                    /> */}


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
                    <HStack w={"100%"} h={"100%"} pt="1vh" alignItems={"top"}>
                        <Spacer/>
                        <Button
                        onClick={()=>{handleBack()}}
                        bgColor='white'
                        // colorScheme={"black"}
                        color='brand.fontDark'
                        border='2px'
                        borderRadius='buttonRadius'
                        variant='solid'
                        // width="6vw"
                        disabled={formState=="0"}
                        m="0px"
                        p="20px"
                        _hover={{
                            background: "brand.mainBG",
                            color: "brand.fontDark",
                            border: "2px",
                            borderColor: "brand.buttonHover",
                        }}
                        >
                        {/* <ArrowBackIcon boxSize={8}/> */}
                        Back
                        </Button>
                        <Spacer/>
                        <Button
                        bgColor='black'
                        // colorScheme={"black"}
                        color='brand.fontLight'
                        border='2px'
                        // width="6vw"
                        borderRadius='buttonRadius'
                        variant='solid'
                        disabled={titleValue == ""}
                        m="0px"
                        p="20px"
                        _hover={{
                            background: "white",
                            color: "brand.buttonHover",
                            borderColor: "black",

                        }}

                        onClick={()=> handleSubmit()}
                        isLoading={formState=="4"}
                        >
                            {/* <ArrowForwardIcon boxSize={8}/></Button> */}
                            Submit
                            </Button>
                        <Spacer/>
                    </HStack>

                    </Stack>
                </Center>
            </CardBody>
            <CardFooter></CardFooter>
        </Card>
    </Center>,
    "5": <Center bgColor={"brand.mainBG"} h="91vh">
    <Card borderRadius="modalRadius" w="60%" h="70vh"  bgColor={"white"}>
        
        <CardHeader>
            <Center>
                <Text fontSize="headings" fontWeight="700" mt="2vh">
                    Describe your movement
                </Text>
            </Center>
        </CardHeader>
        <CardBody >
            <Center h={"100%"}>
                <Stack w={"80%"} h={"100%"}>
                {/* <Text>
                    Give a title for your cause. <br></br>
                </Text> */}
                <Text fontSize="20px" fontWeight="700">Show people an image that best describes your movement</Text>
                {/* <Textarea
                    value={tags}
                    onChange={handleTagChange}
                    // resize={"none"}
                    sx={{height: "40vh"}}

                /> */}


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
                <HStack w={"100%"} h={"100%"} pt="1vh" alignItems={"top"}>
                    <Spacer/>
                    <Button
                    onClick={()=>{handleBack()}}
                    bgColor='white'
                    // colorScheme={"black"}
                    color='brand.fontDark'
                    border='2px'
                    borderRadius='buttonRadius'
                    variant='solid'
                    // width="6vw"
                    disabled={formState=="0"}
                    m="0px"
                    p="20px"
                    _hover={{
                        background: "brand.mainBG",
                        color: "brand.fontDark",
                        border: "2px",
                        borderColor: "brand.buttonHover",
                    }}
                    >
                    {/* <ArrowBackIcon boxSize={8}/> */}
                    Back
                    </Button>
                    <Spacer/>
                    <Button
                    bgColor='black'
                    // colorScheme={"black"}
                    color='brand.fontLight'
                    border='2px'
                    // width="6vw"
                    borderRadius='buttonRadius'
                    variant='solid'
                    disabled={titleValue == ""}
                    m="0px"
                    p="20px"
                    _hover={{
                        background: "white",
                        color: "brand.buttonHover",
                        borderColor: "black",

                    }}

                    onClick={()=> handleSubmit()}
                    isLoading={formState=="4"}
                    >
                        {/* <ArrowForwardIcon boxSize={8}/></Button> */}
                        Submit
                        </Button>
                    <Spacer/>
                </HStack>

                </Stack>
            </Center>
        </CardBody>
        <CardFooter></CardFooter>
    </Card>
</Center>,
                }[formState]

            }



        {/* <Stack spacing={3} width='4xl'>

            <Input placeholder='Enter the title of your petition' size='lg' onChange={handleTitleChange} value={titleValue} />

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
        </Stack> */}
        <CornerDialog
            title="Petition submitted SUCCESSFULLY!"
            isShown={formState=="5"}
            // onCloseComplete={() => {}}
            hasFooter={false}
        >
            You will be redirected to the Home Page.
      </CornerDialog>
        
    </>);
}

export default PetitionForm;