var express = require('express');
var router = express.Router();

/**
 * Downtown Donuts home page
 */

// router.get('/', function(req, res, next) {
//   try { 
    
//   }
// })


/* GET home page. */
router.get('/', function(req, res, next){
  try {
    const limit = parseInt(req.query.limit) || 10; // Default to 0-9 if no limit is provided
    const offset = parseInt(req.query.offset) || 0; // Default to 0 if no offset is provided
    req.db.query('SELECT * FROM comments ORDER BY id DESC LIMIT ? OFFSET ?;', [limit, offset], (err, results) => {
      if (err) {
        console.error('Error fetching comments:', err);
        return res.status(500).send('Error fetching comments');
      }

      // check how many comments exist in total to determine how to load comments on homepage
      req.db.query('SELECT COUNT(*) AS count FROM comments;', (err, countResults) => {
        if (err) {
          console.error('Error counting comments:', err);
          return res.status(500).send('Error counting comments');
        }
        const total = countResults[0].count;
        const hasMore = offset + results.length < total; // Determine if there are more comments to load

        // only render the limited amount of comments
        res.render('index', { title: 'Downtown Donuts', comments: results, hasMore });
      });
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});


// GET menu page
router.get('/menu', function(req, res) {
  try {
    res.render('menu', { title: 'Menu' });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).send('Error fetching menu items');
  }
});

// GET about page
router.get('/about', function(req, res) {
  res.render('about', { title: 'About Us' });
});

// GET order page
router.get('/order', function(req, res) {
  res.render('order', { title: 'Order Donuts' });
});

// POST create comment
router.post('/submit-comment', function (req, res, next) {
    let comment = req.body.comment;
    try {

      if (comment.length > 500) {
        comment = comment.substring(0, 500); // Truncate comment to 500 characters
      }
      
      req.db.query('INSERT INTO comments (body) VALUES (?);', [comment], (err, results) => {
        if (err) {
          console.error('Error adding comment:', err);
          return res.status(500).send('Error adding comment');
        }
        console.log('Comment added successfully:', results);
        // Redirect to the home page after adding
        res.redirect('/');
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).send('Error adding comment');
    }
});

// New route for AJAX loading of comments (returns JSON)
router.get('/comments', function(req, res, next) {
  try {
    const limit = parseInt(req.query.limit) || 10; // Default to 0-9 if no limit is provided
    const offset = parseInt(req.query.offset) || 0;
    req.db.query('SELECT * FROM comments ORDER BY id DESC LIMIT ? OFFSET ?;', [limit, offset], (err, results) => {
      if (err) {
        console.error('Error fetching comments:', err);
        return res.status(500).json({ error: 'Error fetching comments' });
      }
     
      // Check if more comments exist
      req.db.query('SELECT COUNT(*) AS total FROM comments;', (countErr, countResults) => {
        if (countErr) {
          console.error('Error counting comments:', countErr);
          return res.status(500).json({ error: 'Error counting comments' });
        }
        const total = countResults[0].total;
        const hasMore = offset + results.length < total;
        res.json({ comments: results, hasMore });
      });
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Error fetching comments' });
  }
});


module.exports = router;