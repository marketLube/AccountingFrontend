import React from "react";
import ChameleonBtn from "../../../Components/Buttons/ChameleonBtn";
import Chart from "./Chart";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";
import formatAmount from "../../../Services/amountFormatter";
import jsPDF from "jspdf";

const BranchesYearlyPNL = () => {
  const { yearlyPnl, yearlyPnlLoading, yearlyPnlError, curBranch } =
    useSelector((state) => state.branchwise);

  const yearlyPnlKeys = Object?.keys(yearlyPnl || {});

  let secondLastYear, lastyear, curYear;

  if (yearlyPnlKeys.length >= 3) {
    [secondLastYear, lastyear, curYear] = yearlyPnlKeys;
  }

  const years = [
    {
      year: secondLastYear,

      income: yearlyPnl[secondLastYear]?.income || 0,
      expense: yearlyPnl[secondLastYear]?.expense || 0,
      profit: yearlyPnl[secondLastYear]?.profit || 0,
    },
    {
      year: lastyear,
      income: yearlyPnl[lastyear]?.income || 0,
      expense: yearlyPnl[lastyear]?.expense || 0,
      profit: yearlyPnl[lastyear]?.profit || 0,
    },
    {
      year: curYear,
      income: yearlyPnl[curYear]?.income || 0,
      expense: yearlyPnl[curYear]?.expense || 0,
      profit: yearlyPnl[curYear]?.profit || 0,
    },
  ];

  const defaultHashColor = {
    background: "#E0E0E0",
    border: "#E0E0E0",
    borderWidth: 5,
    hoverOffset: 10,
  };

  const colors = [
    {
      background: "#270164",
      border: "#270164",
      borderWidth: 5,
      hoverOffset: 10,
    },
    {
      background: "rgb(39, 1, 100)",
      border: "rgb(39, 1, 100)",
      borderWidth: 5,
      hoverOffset: 10,
    },
    {
      background: "rgb(39, 1, 100)",
      border: "rgb(39, 1, 100)",
      borderWidth: 5,
      hoverOffset: 10,
    },
    {
      background: "#CCCCCC",
      border: "#CCCCCC",
      borderWidth: 2,
      hoverOffset: 5,
    },
  ];

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    // Get current date
    const currentDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // Set font for date
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    // Add current date at the top right
    doc.text(
      `Date: ${currentDate}`,
      190, // X position at the far right
      20, // Y position towards the top
      { align: "right" }
    );

    // Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`Yearly PNL Report of ${curBranch}`, 105, 30, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Overview of Past Years", 105, 40, { align: "center" });

    // Header row
    doc.setFontSize(10);
    doc.setFont("helvetica", "semibold");
    doc.text("Year", 20, 50);
    doc.text("Income", 60, 50);
    doc.text("Expense", 100, 50);
    doc.text("Profit", 140, 50);

    doc.setLineWidth(0.3);
    doc.line(20, 52, 190, 52);

    years.forEach((yearData, index) => {
      const { year, income, expense, profit } = yearData;
      const rowY = 60 + index * 10;

      doc.setFont("helvetica", "normal");
      doc.text(`${year || "N/A"}`, 20, rowY);
      doc.text(`${formatAmount(income)}`, 60, rowY);
      doc.text(`${formatAmount(expense)}`, 100, rowY);
      doc.text(`${formatAmount(profit)}`, 140, rowY);
    });

    // Add footer text
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Generated by Branchwise PNL System", 105, 280, {
      align: "center",
    });

    doc.save(`Yearly-PNL-Report-${curBranch}.pdf`);
  };

  return (
    <>
      <div className="pnl_container" style={{ fontFamily: "Inter" }}>
        <div className="pnl_header">
          <div className="left-content">
            <h4 className="pnl-title">Yearly PNL of {curBranch}</h4>
            <p className="sub-titles">Overview of Past years</p>
          </div>
          <div className="right-content" onClick={downloadPDF}>
            <ChameleonBtn className="target_info">Download Report</ChameleonBtn>
          </div>
        </div>
        {yearlyPnlLoading ? (
          <>
            <div className="pnlcontent_cards">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="card">
                  <div className="circle-description">
                    <Skeleton.Button
                      style={{ width: 100, height: 100 }}
                      active
                      shape="circle"
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : yearlyPnlError ? (
          <div className="pnlcontent_cards">
            <div className="card">
              <div className="circle-description">
                <div className="error">
                  <span>Error : {yearlyPnlError}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="pnlcontent_cards">
              {years.map((yearData, index) => {
                const { year, income, expense, profit } = yearData;
                const total = income + expense;
                const incomePercentage = (income / total) * 100;
                const expensePercentage = (expense / total) * 100;
                const formattedBalance = !isNaN(profit)
                  ? formatAmount(parseFloat(profit))
                  : "0.00";

                // Check if there's no income and expense
                const useDefaultColor = income === 0 && expense === 0;
                const chartColors = useDefaultColor
                  ? [defaultHashColor, defaultHashColor]
                  : [colors[index], colors[colors.length - 1]];

                return (
                  <div key={index} className="card">
                    <Chart
                      className="circle-align"
                      colors={chartColors}
                      data={
                        useDefaultColor
                          ? [0]
                          : [incomePercentage, expensePercentage]
                      }
                      labels={
                        useDefaultColor ? ["No Data"] : ["Income", "Expense"]
                      }
                      options={{
                        tooltips: {
                          enabled: false,
                        },
                        hover: {
                          mode: null,
                        },
                      }}
                    />
                    <span className="circle-content">{year}</span>
                    <div className="circle-description">
                      <p className="sub-titles">Profit in {year}</p>
                      <p className="pnl_amount">{formattedBalance}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BranchesYearlyPNL;
