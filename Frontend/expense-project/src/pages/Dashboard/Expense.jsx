import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserContext from "../../context/UserContext";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";

const Expense = ({ activeMenu }) => {
  useUserAuth();

  const { user } = useContext(UserContext);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  //Get All Expense Details
  const fetchExpenseDetails = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again later", error);
    } finally {
      setLoading(false);
    }
  };

  //Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    //Validation Checks
    if (!category.trim()) {
      toast.error("Category is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully.");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error adding Expense : ",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    if (!user) return;

    fetchExpenseDetails();
    return () => {};
  }, [user]);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
