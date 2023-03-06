import "./App.css";
import React, { useState } from "react";
import { Radio } from "antd";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Posts from "./components/posts";
import CreatePost from "./components/create-post";

function App() {
  const [viewState, updateViewState] = useState("viewPosts");

  return (
    <div
      style={{
        width: 500,
        margin: "0 auto",
        padding: 50,
      }}
    >
      <h1>Photo App</h1>
      <Radio.Group
        value={viewState}
        onChange={(e) => updateViewState(e.target.value)}
      >
        <Radio.Button value="viewPost">View Posts</Radio.Button>
        <Radio.Button value="addPost">Add Post</Radio.Button>
      </Radio.Group>
      {viewState === "viewPosts" ? (
        <Posts />
      ) : (
        <CreatePost updateViewState={updateViewState} />
      )}
    </div>
  );
}

export default App;
