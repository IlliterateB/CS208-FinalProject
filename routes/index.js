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
    req.db.query('SELECT * FROM comments;', (err, results) => {
      if (err) {
        console.error('Error fetching comments:', err);
        return res.status(500).send('Error fetching comments');
      }
      res.render('index', { title: 'Downtown Donuts', comments: results });
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


// GET order page


// POST create comment
router.post('/submit-comment', function (req, res, next) {
    const { comment } = req.body;
    try {
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

// router.post('/create', function (req, res, next) {
//     const { task } = req.body;
//     try {
//       req.db.query('INSERT INTO todos (task) VALUES (?);', [task], (err, results) => {
//         if (err) {
//           console.error('Error adding todo:', err);
//           return res.status(500).send('Error adding todo');
//         }
//         console.log('Todo added successfully:', results);
//         // Redirect to the home page after adding
//         res.redirect('/');
//       });
//     } catch (error) {
//       console.error('Error adding todo:', error);
//       res.status(500).send('Error adding todo');
//     }
// });

// router.post('/delete', function (req, res, next) {
//     const { id } = req.body;
//     try {
//       req.db.query('DELETE FROM todos WHERE id = ?;', [id], (err, results) => {
//         if (err) {
//           console.error('Error deleting todo:', err);
//           return res.status(500).send('Error deleting todo');
//         }
//         console.log('Todo deleted successfully:', results);
//         // Redirect to the home page after deletion
//         res.redirect('/');
//     });
//     }catch (error) {
//         console.error('Error deleting todo:', error);
//         res.status(500).send('Error deleting todo:');
//     }
// });

module.exports = router;