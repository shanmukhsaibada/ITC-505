document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('posts');

    postForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;

        if (title.trim() === '' || content.trim() === '') {
            alert('Both title and content are required!');
            return;
        }

        addPost(title, content);
        postForm.reset();
    });

    function addPost(title, content) {
        const post = document.createElement('div');
        post.className = 'post';
        post.innerHTML = `
            <h3>${title}</h3>
            <p>${content}</p>
        `;
        postsContainer.appendChild(post);
    }
});
