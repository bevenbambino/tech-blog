const commentFormEl = document.querySelector("#add-comment");
const newCommentbtn = document.querySelector("#new-comment-btn");

const displayAddComment = async () => {
  newCommentbtn.style.display = "none";
  commentFormEl.style.display = "block";
};

const addNewComment = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#comment-desc").value.trim();
  const pathname = document.location.pathname.split("/");
  const post_id = pathname[pathname.length - 1];

  if (content && post_id) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ content, post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert("Failed to create comment");
    }
  }
};

newCommentbtn.addEventListener("click", displayAddComment);

document
  .querySelector(".submit-comment-btn")
  .addEventListener("click", addNewComment);
