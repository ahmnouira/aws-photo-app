import React, { useState } from "react";
import { Button, Input, Image } from "antd";
import { v4 as uuid } from "uuid";
import { Amplify, Storage } from "aws-amplify";

const initialFormState = {
  title: "",
  image: {},
};

function CreatePost({ updateViewState }) {
  const [formState, updateFormState] = useState(initialFormState);
  const [photoUrl, setPhotoUrl] = useState("");

  function onChange(key, value) {
    updateFormState({ ...formState, [key]: value });
  }

  function setPhoto(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    updateFormState({ ...formState, image: file });
  }

  async function savePhoto() {
    const { title, image } = formState;

    if (!image || !image.name) return;

    const imageKey =
      uuid() + formState.image.name.replace(/\s/g, "-").toLowerCase();

    let path = `${uuid()}/photo.png`;

    const result = await Storage.put(path, formState.image, {
      level: "public",

      contentType: "image/png",
    });

    console.log("result", result.key);

    const url = await Storage.get(path);

    console.log(url);

    setPhotoUrl(url);
    const post = { title, imageKey };
    // await API.graphql(graphqlOperation(createPost, { input: post }));
    // updateViewState("viewPosts");
  }

  return (
    <div>
      <h2
        style={{
          margin: "20x 0px",
        }}
      >
        Add Photo
      </h2>
      <Input
        onChange={(e) => onChange("title", e.target.value)}
        style={{
          marginTop: 10,
        }}
        placeholder="Title"
      />
      <input
        type="file"
        onChange={setPhoto}
        style={{
          marginTop: 10,
        }}
      />
      <Button
        style={{
          marginTop: 10,
        }}
        type="primary"
        onClick={savePhoto}
      >
        Save Photo
      </Button>
      {photoUrl && <Image src={photoUrl} sizes="300"></Image>}
    </div>
  );
}
export default CreatePost;
