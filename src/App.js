import React from "react";
import "./App.css";

function Post({ post, setWall, wall }) {
  const [editText, setEditText] = React.useState(post.text);
  const [approval, setApproval] = React.useState(0);

  return (
    <div>
      <div>
        <p
          onClick={() => {
            alert(post.text);
          }}
        >
          {post.text}
        </p>
      </div>
      <div>
        <button
          onClick={() => {
            setEditText(post.text);
            setWall(
              wall.map((wallPost) => {
                return wallPost === post
                  ? { ...wallPost, edit: true }
                  : wallPost;
              })
            );
          }}
        >
          EDIT
        </button>
        {post.edit ? (
          <span>
            <div>
              <textarea
                onChange={(event) => {
                  setEditText(event.target.value);
                }}
                value={editText}
              ></textarea>
            </div>
            <button
              onClick={() => {
                setWall(
                  wall.map((obj) => {
                    return obj === post
                      ? { ...obj, text: editText, edit: false }
                      : obj;
                  })
                );
              }}
            >
              DONE
            </button>
          </span>
        ) : null}
        <button
          onClick={() => {
            setWall(
              wall.filter((each) => {
                return each !== post;
              })
            );
          }}
        >
          DELETE POST
        </button>
      </div>
      <button
        onClick={() => {
          setApproval(approval + 1);
        }}
      >
        APPROVE
      </button>
      <button
        onClick={() => {
          approval ? setApproval(approval - 1) : setApproval(approval);
        }}
      >
        {approval > 1
          ? `${approval} PEOPLE APPROVE`
          : approval === 1
          ? `${approval} PERSON APPROVES`
          : `NOBODY APPROVES OF THIS STATEMENT`}
      </button>
      <Comments post={post} wall={wall} setWall={setWall}></Comments>
    </div>
  );
}

function Comments({ wall, setWall, post }) {
  const [comment, setComment] = React.useState("");

  return (
    <div>
      <div>
        <textarea
          onChange={(event) => {
            setComment(event.target.value);
          }}
          value={comment}
        ></textarea>
      </div>
      <button
        onClick={() => {
          setWall(
            wall.map((currentPost) => {
              return currentPost !== post
                ? currentPost
                : {
                    ...currentPost,
                    comments: [
                      ...currentPost.comments,
                      { id: Math.random() + 1, text: comment },
                    ],
                  };
            })
          );
        }}
      >
        COMMENT
      </button>

      {post.comments.map((currentComment) => {
        return (
          <OneComment
            key={currentComment.id}
            setWall={setWall}
            wall={wall}
            currentComment={currentComment}
            post={post}
          ></OneComment>
        );
      })}
    </div>
  );
}

function OneComment({ currentComment, wall, setWall, post }) {
  const [approveComm, setApproveComm] = React.useState(0);
  return (
    <div>
      <div>{currentComment.text}</div>
      <button
        onClick={() => {
          setApproveComm(approveComm + 1);
        }}
      >
        APPROVE
      </button>
      <button
        onClick={() => {
          approveComm
            ? setApproveComm(approveComm - 1)
            : setApproveComm(approveComm);
        }}
      >
        {approveComm > 1
          ? `${approveComm} PEOPLE APPROVE`
          : approveComm === 1
          ? `${approveComm} PERSON APPROVES`
          : `NOBODY APPROVES OF THIS STATEMENT`}
      </button>
      <button
        onClick={() => {
          setWall(
            wall.map((thisPost) => {
              return thisPost !== post
                ? thisPost
                : {
                    ...thisPost,
                    comments: thisPost.comments.filter((wtf) => {
                      return wtf !== currentComment;
                    }),
                  };
            })
          );
        }}
      >
        DELETE
      </button>
    </div>
  );
}

function Wall({ wall, setWall }) {
  return wall.map((post) => {
    return (
      <div key={post.id}>
        <Post wall={wall} setWall={setWall} post={post}></Post>
        ====================================================
      </div>
    );
  });
}

function Write({ wall, setWall }) {
  const [post, setPost] = React.useState("");
  return (
    <div>
      <div>
        <textarea
          onChange={(event) => {
            setPost(event.target.value);
          }}
          value={post}
        ></textarea>
      </div>
      <button
        onClick={() => {
          setWall([
            { text: post, id: Math.random(), edit: false, comments: [] },
            ...wall,
          ]);
        }}
      >
        POST
      </button>
    </div>
  );
}

function App() {
  const [wall, setWall] = React.useState([]);
  return (
    <div className="App">
      <header>THE ANARCHIST FACEBOOK</header>
      <Write wall={wall} setWall={setWall}></Write>
      <Wall wall={wall} setWall={setWall}></Wall>
    </div>
  );
}

export default App;
