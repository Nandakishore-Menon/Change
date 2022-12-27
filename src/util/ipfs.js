import Moralis from "moralis";
import { EvmChain, uploadFolderOperation } from "@moralisweb3/common-evm-utils";

const setup = async () => {
    console.log("moralis: "+ process.env.REACT_APP_MORALIS_API_KEY)
    await Moralis.start({
        apiKey: `${process.env.REACT_APP_MORALIS_API_KEY}`,
        // ...and any other configuration
      });
}

const uploadImage = async (title, time, image) => {
    const abi = [
        {
          path: `${title}${time}.png`,
          content: btoa(JSON.stringify(image[0])),
        },
      ];

    const response = await Moralis.EvmApi.ipfs.uploadFolder({ abi });
    console.log("Image response: " + response);
    return response
}

const uploadPetition = async (title, content, time, tags, image) => {
    const image_response = await uploadImage(title, time, image)
    const abi = [
        {
          path: "petitions/${title}${time}.json",
          content: {
            title: title,
            content: content,
            // image: image_response[0].path,
            // time: time,
            tags: tags,
          },
        },
      ];
      const response = await Moralis.EvmApi.ipfs.uploadFolder({ "abi":abi[0] });
      console.log("Final response: " + response);
}

export {setup, uploadPetition};