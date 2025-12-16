const User = require("../models/User");
const Income = require("../models/Income");
const xlsx = require("xlsx");

//Add income Source
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    //validation : Check for missing field
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are require!" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//getAllItem income Source
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};

//delete income Source
exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);

    if (!income) {
      return res.status(404).json({ message: "Income not found!" });
    }

    //Security Check
    if (income.userId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this income!" });
    }

    await income.deleteOne();
    res.json({ message: "Income deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};

//download excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    //Prepare data for Excel
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
};
