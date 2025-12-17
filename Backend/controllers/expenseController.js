const User = require("../models/User");
const Expense = require("../models/Expense");
const xlsx = require("xlsx");

//Add Expense Source
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    //validation : Check for missing field
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are require!" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//getAllItem Expense Source
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};

//delete expense Source
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Income not found!" });
    }
    //Security Check
    if (expense.userId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this income!" });
    }
    await expense.deleteOne();
    res.json({ message: "Income deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};

//download excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    //Prepare data for Excel
    const data = expense.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};
