



// const express = require('express');
// const { getAlltransection, addAlltransection, deleteTransection, updateTransection  } = require('../controllers/transectionController');

// const router = express.Router();

// // Define routes
// router.get('/get-transection', getAlltransection); // Make sure this is correct
// router.post('/add-transection', addAlltransection); // Make sure this is correct
// router.delete('/delete-transection/:id', deleteTransection); 
// router.put('/update-transection/:id', updateTransection); 

// module.exports = router;



const express = require('express');
const {
  getAlltransection,
  addAlltransection,
  deleteTransection,
  updateTransection,
  getAnalyticsData // Add this new method
} = require('../controllers/transectionController');

const router = express.Router();

// Define routes
router.get('/get-transection', getAlltransection); // Get all transactions
router.post('/add-transection', addAlltransection); // Add a new transaction
router.delete('/delete-transection/:id', deleteTransection); // Delete a transaction
router.put('/update-transection/:id', updateTransection); // Update a transaction

// New route for analytics
router.get('/analytics', getAnalyticsData); // Get analytics data

module.exports = router;





