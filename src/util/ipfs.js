import axios from 'axios';



const base64 = async (file) => {
  return new Promise(resolve => {
    let fileInfo;
    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      console.log("Called", reader);
      baseURL = reader.result;
      console.log(baseURL);
      resolve(baseURL);
    };
    // console.log(fileInfo);
  });
};

const uploadImage = async (title, time, image) => {
  const options = {
    method: 'POST',
    url: 'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-API-Key': `${process.env.REACT_APP_MORALIS_API_KEY}`
    },
    data: [
      {
        path: `${title.replace(/ /g,'')}.png`,
        content: image
      }
    ]
  };

  var image_response;
  await axios
  .request(options)
  .then(async (response) => {
    image_response =  response;
    // console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

    return image_response
}

const uploadPetition = async (title, content, time, tags, image, target_support) => {
    const image_response = await uploadImage(title, time, image)
    console.log(image_response.data[0].path)

    const options = {
      method: 'POST',
      url: 'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-Key': `${process.env.REACT_APP_MORALIS_API_KEY}`
      },
      data: [
        {
          path: `${title.replace(/ /g,'')}.json`,
          content: {
            title: title,
            content: content,
            time: time,
            image: image_response.data[0].path,
            tags: tags,
            target_support: target_support,
            
          }
        }
      ]
    };

    var metadata_path;
    await axios
    .request(options)
    .then(async (response) => {
      metadata_path = await response.data;
      // console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

    return metadata_path
}

const uploadUserData = async (account, profileInfo,bio, dp) => {
  // const image_response = await uploadImage(title, time, image)
  // console.log(image_response.data[0].path)
  const img_options = {
    method: 'POST',
    url: 'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-API-Key': `${process.env.REACT_APP_MORALIS_API_KEY}`
    },
    data: [
      {
        path: `nft/${profileInfo.replace(/ /g,'')}.png`,
        content: dp
      }
    ]
  };

  var image_response;
  await axios
  .request(img_options)
  .then(async (response) => {
    image_response =  response;
    // console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });





  const options = {
    method: 'POST',
    url: 'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-API-Key': `${process.env.REACT_APP_MORALIS_API_KEY}`
    },
    data: [
      {
        path: `${account}.json`,
        content: {
          profile: profileInfo,
          bio: bio,
          image: image_response.data[0].path
        }
      }
    ]
  };
  var metadata_path;
  await axios
  .request(options)
  .then(async (response) => {
    metadata_path = await response.data;
    // console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

  console.log(metadata_path);
  return metadata_path[0].path
}


const uploadComment = async (comment,account) => {
  const options = {
    method: 'POST',
    url: 'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-API-Key': `${process.env.REACT_APP_MORALIS_API_KEY}`
    },
    data: [
      {
        path: `/comment/${account}.json`,
        content: {
          comment: comment,
        }
      }
    ]
  };

  var metadata_path;
  await axios
  .request(options)
  .then(async (response) => {
    metadata_path = await response.data;
    // console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

  return metadata_path[0].path
}

const uploadToken = async (owner,hash,pid) => {
  // const image_response = await uploadImage(title, time, image)
  // console.log(image_response.data[0].path)

  const options = {
    method: 'POST',
    url: 'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-API-Key': `${process.env.REACT_APP_MORALIS_API_KEY}`
    },
    data: [
      {
        path: `NFT/${pid}.json`,
        content: {
          petitionID: pid,
          owner: owner,
          metadataHash: hash
        }
      }
    ]
  };

  var metadata_path;
  await axios
  .request(options)
  .then(async (response) => {
    metadata_path = await response.data;
    // console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

  return metadata_path
}


export {uploadPetition, base64, uploadUserData, uploadComment,uploadToken};