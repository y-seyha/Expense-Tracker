import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import UserContext from "../../context/UserContext";
import { useUserAuth } from "../../hooks/useUserAuth";
import Modal from "../../components/Layout/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";

const Income = ({ activeMenu }) => {
  useUserAuth();
  const { user } = useContext(UserContext);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  //Get All Income Details
  const fetchIncomeDetails = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again later", error);
    } finally {
      setLoading(false);
    }
  };

  //Handle Add Income
  const handleAddIncome = async (income) => {};

  //Delete Income
  const deleteIncome = async (id) => {};

  //Handle download income details
  const handleDownloadIncomeDetails = async () => {};

  useEffect(() => {
    if (!user) return;
    fetchIncomeDetails();
  }, [user]);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
