/* client-side JavaScript for handling comment submission with enter key */

document.addEventListener('DOMContentLoaded', () => {
  const commentInput = document.getElementById('user-comment');
  const commentForm = document.getElementById('submit-comment');

  if (!commentInput || !commentForm) return;

  commentInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      commentForm.submit();
    }
  });
});
