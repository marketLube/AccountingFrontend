import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBankDetails } from "../../../../Global-Variables/fetch/details";
import { formatCurrency } from "../../../../Services/amountFormatter";
import { Skeleton } from "antd"; // Import Ant Design Skeleton

const TotAvailableBalance = () => {
  const { banks, loading, error } = useSelector((state) => state.bank);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!banks.length) {
      dispatch(fetchBankDetails());
    }
  }, [dispatch, banks.length]);

  const fidalBalance = banks.find((bank) => bank.name === "Fidal")?.balance;
  const althameemBalance = banks.find(
    (bank) => bank.name === "Althameem"
  )?.balance;
  const axisBalance = banks.find((bank) => bank.name === "Axis")?.balance;
  const cashBalance = banks.find((bank) => bank.name === "CASH")?.balance;

  const webLubeBalance = banks.find(
    (bank) => bank.name === "Web Lube"
  )?.balance;

  const othersBalance = banks.find((bank) => bank.name === "Others")?.balance;

  return (
    <div
      className="balance-container"
      style={{ fontFamily: "Inter, 'Open Sans', Roboto" }}
    >
      <h4 className="balance-title">Total Available Balance</h4>
      <div className="underline-balance-heading"></div>

      {/* Conditional rendering based on loading state */}
      {loading ? (
        <>
          {Array(5)
            .fill()
            .map((_, index) => (
              <div className="balance-item" key={index}>
                <Skeleton.Input
                  key={index}
                  active
                  style={{ height: "25px", width: 238 }}
                />
              </div>
            ))}
        </>
      ) : error ? (
        <div className="error">
          <span>{error}</span>
        </div>
      ) : (
        <>
          <div className="balance-item">
            <div className="balance-name balance-name-rbl">Web Lube</div>
            <div className="balance-amount">
              {formatCurrency(webLubeBalance)}
            </div>
          </div>
          <div className="underline-balance"></div>

          <div className="balance-item">
            <div className="balance-name balance-name-icici">Fidal</div>
            <div className="balance-amount">{formatCurrency(fidalBalance)}</div>
          </div>
          <div className="underline-balance"></div>

          <div className="balance-item">
            <div className="balance-name balance-name-rak">Althameem</div>
            <div className="balance-amount">
              {formatCurrency(althameemBalance)}
            </div>
          </div>
          <div className="underline-balance"></div>

          <div className="balance-item">
            <div className="balance-name balance-name-hdfc">Axis</div>
            <div className="balance-amount">{formatCurrency(axisBalance)}</div>
          </div>
          <div className="underline-balance"></div>

          <div className="balance-item">
            <div className="balance-name balance-name-cash">Cash</div>
            <div className="balance-amount">{formatCurrency(cashBalance)}</div>
          </div>
          <div className="underline-balance"></div>
          <div className="balance-item">
            <div className="balance-name balance-name-bandan">Others</div>
            <div className="balance-amount">
              {formatCurrency(othersBalance)}
            </div>
          </div>
          <div className="underline-balance"></div>
        </>
      )}
    </div>
  );
};

export default TotAvailableBalance;
