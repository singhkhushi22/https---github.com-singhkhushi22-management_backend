








const transectionModel = require('../models/transectionModel');
const moment = require('moment');

const getAlltransection = async (req, res) => {
  try {
    res.setHeader('Cache-Control', 'no-store');

    const { frequency, selectedDate, userId } = req.query;

    console.log('Frequency:', frequency);
    console.log('Selected Date:', selectedDate);
    console.log('User ID:', userId);

    let dateFilter = {};
    if (frequency !== 'custom') {
      dateFilter = {
        date: {
          $gte: moment().subtract(Number(frequency), 'd').toDate(),
        },
      };
    } else if (selectedDate && selectedDate.length === 2) {
      dateFilter = {
        date: {
          $gte: new Date(selectedDate[0]),
          $lte: new Date(selectedDate[1]),
        },
      };
    }

    console.log('Date Filter:', dateFilter);

    const query = {
      ...dateFilter,
      userId: userId,
    };

    console.log('MongoDB Query:', query);

    const transections = await transectionModel.find(query);

    console.log('Query Results:', transections);

    res.status(200).json(transections);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const addAlltransection = async (req, res) => {
  try {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const newTransection = new transectionModel(req.body);
    await newTransection.save();
    res.status(201).send("Transaction created");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const deleteTransection = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTransection = await transectionModel.findByIdAndDelete(id);

    if (!deletedTransection) {
      return res.status(404).send("Transaction not found");
    }

    res.status(200).send("Transaction deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

const updateTransection = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Find and update the transaction
    const updatedTransection = await transectionModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

    if (!updatedTransection) {
      return res.status(404).send("Transaction not found");
    }

    res.status(200).json(updatedTransection);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};





// const getAnalyticsData = async (req, res) => {
//   try {
//     console.log('Received Query Parameters:', req.query);
//     const { userId, startDate, endDate } = req.query;
//     const dateFilter = {};

//     if (startDate && endDate) {
//       const start = new Date(startDate);
//       const end = new Date(endDate);
      
//       // Adjust the end date to include the whole day
//       end.setHours(23, 59, 59, 999);

//       dateFilter.date = {
//         $gte: start,
//         $lte: end,
//       };
//     }

//     const query = {
//       ...dateFilter,
//       userId: userId,
//     };

//     console.log('MongoDB Query:', query);

//     const transections = await transectionModel.find(query);

//     if (!transections || transections.length === 0) {
//       console.error('No transactions found for the specified user and date range.');
//       return res.status(404).send('No transactions found');
//     }

//     const totalTransection = transections.length;

//     const totalIncomeTransections = transections.filter(transection => transection.type === 'income');
//     const totalExpenseTransections = transections.filter(transection => transection.type === 'expense');

//     const totalIncomePercent = (totalIncomeTransections.length / totalTransection) * 100 || 0;
//     const totalExpensePercent = (totalExpenseTransections.length / totalTransection) * 100 || 0;

//     const totalTurnover = transections.reduce(
//       (acc, transection) => acc + transection.amount, 0
//     );

//     const totalIncomeTurnover = totalIncomeTransections.reduce(
//       (acc, transection) => acc + transection.amount, 0
//     );

//     const totalExpenseTurnover = totalExpenseTransections.reduce(
//       (acc, transection) => acc + transection.amount, 0
//     );

//     const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100 || 0;
//     const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100 || 0;

//     // Category-wise data
//     const categories = [
//       "salary",
//       "tip",
//       "project",
//       "movie",
//       "food",
//       "bills",
//       "medical",
//       "fee",
//       "tax"
//     ];

//     const categoryWiseIncome = categories.reduce((acc, category) => {
//       const totalCategoryIncome = totalIncomeTransections
//         .filter(transection => transection.category === category)
//         .reduce((acc, transection) => acc + transection.amount, 0);
//       acc[category] = totalCategoryIncome;
//       return acc;
//     }, {});

//     const categoryWiseExpense = categories.reduce((acc, category) => {
//       const totalCategoryExpense = totalExpenseTransections
//         .filter(transection => transection.category === category)
//         .reduce((acc, transection) => acc + transection.amount, 0);
//       acc[category] = totalCategoryExpense;
//       return acc;
//     }, {});

//     res.setHeader('Cache-Control', 'no-store');
//     res.status(200).json({
//       totalTransection,
//       totalIncomeTransections: totalIncomeTransections.length,
//       totalExpenseTransections: totalExpenseTransections.length,
//       totalIncomePercent,
//       totalExpensePercent,
//       totalTurnover,
//       totalIncomeTurnover,
//       totalExpenseTurnover,
//       totalIncomeTurnoverPercent,
//       totalExpenseTurnoverPercent,
//       categoryWiseIncome,
//       categoryWiseExpense
//     });
//   } catch (error) {
//     console.error("Error in getAnalyticsData:", error.message);
//     res.status(500).send('Error fetching analytics data');
//   }
// };

// const getAnalyticsData = async (req, res) => {
//   try {
//     console.log('Received Query Parameters:', req.query);
//     const { userId, startDate, endDate } = req.query;

//     const dateFilter = {};

//     if (startDate && endDate) {
//       const start = new Date(startDate);
//       const end = new Date(endDate);
//       end.setHours(23, 59, 59, 999);
//       dateFilter.date = {
//         $gte: start,
//         $lte: end,
//       };
//     }

//     const query = {
//       ...dateFilter,
//       userId: userId,
//     };

//     const transections = await transectionModel.find(query);

//     if (!transections || transections.length === 0) {
//       console.error('No transactions found for the specified user and date range.');
//       return res.status(404).send('No transactions found');
//     }

//     // Your existing calculation logic
//     // ...

//     res.setHeader('Cache-Control', 'no-store');
//     res.status(200).json({
//       // Your calculated fields
//       // ...
//     });
//   } catch (error) {
//     console.error("Error in getAnalyticsData:", error.message);
//     res.status(500).send('Error fetching analytics data');
//   }
// };


const getAnalyticsData = async (req, res) => {
  try {
    console.log('Received Query Parameters:', req.query);
    const { startDate, endDate } = req.query;
    const dateFilter = {};

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Adjust the end date to include the whole day
      end.setHours(23, 59, 59, 999);

      dateFilter.date = {
        $gte: start,
        $lte: end,
      };
    }

    console.log('Date Filter:', dateFilter);

    const transections = await transectionModel.find(dateFilter);

    if (!transections || transections.length === 0) {
      console.error('No transactions found for the specified date range.');
      return res.status(404).send('No transactions found');
    }

    // Continue with the analytics calculations as before
    const totalTransection = transections.length;

    const totalIncomeTransections = transections.filter(transection => transection.type === 'income');
    const totalExpenseTransections = transections.filter(transection => transection.type === 'expense');

    const totalIncomePercent = (totalIncomeTransections.length / totalTransection) * 100 || 0;
    const totalExpensePercent = (totalExpenseTransections.length / totalTransection) * 100 || 0;

    const totalTurnover = transections.reduce(
      (acc, transection) => acc + transection.amount, 0
    );

    const totalIncomeTurnover = totalIncomeTransections.reduce(
      (acc, transection) => acc + transection.amount, 0
    );

    const totalExpenseTurnover = totalExpenseTransections.reduce(
      (acc, transection) => acc + transection.amount, 0
    );

    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100 || 0;
    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100 || 0;

    // Category-wise data
    const categories = [
      "salary",
      "tip",
      "project",
      "movie",
      "food",
      "bills",
      "medical",
      "fee",
      "tax"
    ];

    const categoryWiseIncome = categories.reduce((acc, category) => {
      const totalCategoryIncome = totalIncomeTransections
        .filter(transection => transection.category === category)
        .reduce((acc, transection) => acc + transection.amount, 0);
      acc[category] = totalCategoryIncome;
      return acc;
    }, {});

    const categoryWiseExpense = categories.reduce((acc, category) => {
      const totalCategoryExpense = totalExpenseTransections
        .filter(transection => transection.category === category)
        .reduce((acc, transection) => acc + transection.amount, 0);
      acc[category] = totalCategoryExpense;
      return acc;
    }, {});

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
      totalTransection,
      totalIncomeTransections: totalIncomeTransections.length,
      totalExpenseTransections: totalExpenseTransections.length,
      totalIncomePercent,
      totalExpensePercent,
      totalTurnover,
      totalIncomeTurnover,
      totalExpenseTurnover,
      totalIncomeTurnoverPercent,
      totalExpenseTurnoverPercent,
      categoryWiseIncome,
      categoryWiseExpense
    });
  } catch (error) {
    console.error("Error in getAnalyticsData:", error.message); // More detailed error logging
    res.status(500).send('Error fetching analytics data');
  }
};




module.exports = {
  getAlltransection,
  addAlltransection,
  deleteTransection,
  updateTransection,
  getAnalyticsData
};








