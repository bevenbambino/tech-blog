//*************************** Reference Variables ************************************//
const makePostsEl = document.querySelector(".make-posts-el");
const editPostsEl = document.querySelector(".edit-post-form");
const addPostbtn = document.querySelector("#new-post-btn");

//*************************** Functions ************************************//

// function to display add post, hide button
const displayAddPost = async () => {
  makePostsEl.style.display = "block";
  addPostbtn.style.display = "none";
  editPostsEl.style.display = "none";
};

// function to add a post
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-name").value.trim();
  const content = document.querySelector("#post-desc").value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create post");
    }
  }
};

// function to delete a post
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-delete")) {
    const id = event.target.getAttribute("data-delete");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete post");
    }
  }
};

// function to show the edit form
const showEditButtonHandler = async (event) => {
  const dataEdit = event.target.getAttribute("data-edit");
  // if (dataEdit) {

  // }
  const dataForm = document.querySelector(`form[data-form="${dataEdit}"]`);
  makePostsEl.style.display = "none";
  dataForm.style.display = "block";
};

// function for the cancel edit (hides edit form)
const cancelEditButtonHandler = async () => {
  editPostsEl.style.display = "none";
  makePostsEl.style.display = "none";
};

// function to update a post
const editButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-editid")) {
    event.preventDefault();

    const id = event.target.getAttribute("data-editid");
    const title = document.querySelector(`#edit-post-name-${id}`).value.trim();
    const content = document
      .querySelector(`#edit-post-desc-${id}`)
      .value.trim();

    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete post");
    }
  }
};

//*************************** Event Listeners ************************************//

addPostbtn.addEventListener("click", displayAddPost);

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".post-list")
  .addEventListener("click", delButtonHandler);

const editBtns = document.querySelectorAll(".edit-btn");

editBtns.forEach((el) => {
  el.addEventListener("click", showEditButtonHandler);
});

const editSubmitBtns = document.querySelectorAll(".save-edit-btn");

editSubmitBtns.forEach((el) => {
  el.addEventListener("click", editButtonHandler);
});

document
  .querySelector("#cancel-btn")
  .addEventListener("click", cancelEditButtonHandler);
