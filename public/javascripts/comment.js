/* client-side JavaScript for handling comment submission with enter key and validation */

document.addEventListener('DOMContentLoaded', () => {
  const commentInput = document.getElementById('user-comment');
  const commentForm = document.getElementById('submit-comment');
  const charCount = document.getElementById('char-count');

  if (!commentInput || !commentForm) return;

  const submitButton = commentForm.querySelector('input[type="submit"], button[type="submit"]');
  let isSubmitting = false;

  // Live character counter with hard limit enforcement
  commentInput.addEventListener('input', function () {
    if (this.value.length > 500) {
      this.value = this.value.slice(0, 500);
    }
    if (charCount) {
      const count = this.value.length;
      charCount.textContent = `${count}/500`;
      charCount.style.color = count > 450 ? '#d32f2f' : '#666';
    }
  });

  // Handle form submission with whitespace validation, duplicate-submit protection, and fetch-based error handling
  commentForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    // Check if comment is empty or only whitespace
    if (!commentInput.value.trim()) {
      alert('Comment cannot be empty or contain only whitespace.');
      return;
    }

    isSubmitting = true;
    if (submitButton) {
      submitButton.disabled = true;
      if (submitButton.tagName.toLowerCase() === 'input') {
        submitButton.value = 'Submitting...';
      } else {
        submitButton.textContent = 'Submitting...';
      }
    }

    const formData = new URLSearchParams(new FormData(commentForm));

    fetch(commentForm.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formData.toString()
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text || `Server error: ${response.status}`);
        });
      }
      return response.text();
    })
    .then(() => {
      window.location.href = '/';
    })
    .catch(error => {
      let message = 'Unable to submit your comment. Please try again.';
      if (error instanceof TypeError) {
        message = 'Unable to reach the server. Please check your internet connection and try again.';
      } else if (error.message) {
        message = error.message;
      }
      alert(message);
      console.error('Comment submission failed:', error);
    })
    .finally(() => {
      isSubmitting = false;
      if (submitButton) {
        submitButton.disabled = false;
        if (submitButton.tagName.toLowerCase() === 'input') {
          submitButton.value = 'Submit';
        } else {
          submitButton.textContent = 'Submit';
        }
      }
    });
  });

  commentInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      commentForm.dispatchEvent(new Event('submit'));
    }
  });
});
