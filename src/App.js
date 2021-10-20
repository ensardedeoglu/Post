import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";

function App() {
  const [posts, setPosts] = useState([]);
  const[comment, setComment] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
      .then((response) => response.json())
      .then(setPosts)
      .catch((error) => {
        console.log(error)
      });
  }, []);

  return (
    <div className="App">
      {posts.map((post) => {
        const clickHandler = () => {
          if(!comment[post.id]){
            fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
          .then((res) => res.json())
          .then((newComment) => setComment({...comment, [post.id]:newComment}))
          }else{
            setComment({...comment, [post.id]:null})
          }
        }
        return(
          <div>
        <h1 onClick={clickHandler}>{post.body}</h1>
          {(comment[post.id] || []).map((comments) => <h4>{comments.body}</h4>)}
            </div>
        )
      })}
    </div>
  );
}

export default App;