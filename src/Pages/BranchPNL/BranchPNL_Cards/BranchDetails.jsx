import { Skeleton } from "antd";
import React from "react";
import { useSelector } from "react-redux";

function BranchDetails({ title }) {
  const { branchData, branchLoading, branchError } = useSelector(
    (state) => state.branchwise
  );
  const [data] = branchData;
  if (!data) return null;

  return (
    <div className="balance-container">
      <span className="balance-title">{title}</span>
      <div className="underline-balance-heading"></div>
      {branchLoading ? (
        <>
          {Array(5)
            .fill()
            .map((_, index) => (
              <div className="balance-item" key={index}>
                <Skeleton.Input
                  key={index}
                  active
                  style={{ height: "25px", width: 200 }}
                />
              </div>
            ))}
        </>
      ) : branchError ? (
        <div className="error">
          <span>{branchError}</span>
        </div>
      ) : (
        <>
          <React.Fragment>
            <div className="balance_card">
              <div className={`balance-name balance-name-rbl`}>Web Lube</div>
              <div className="balance-amount">
                {data["Web Lube"]?.toFixed(2)}
              </div>
            </div>
            <div className="underline-balance"></div>
          </React.Fragment>
          <React.Fragment>
            <div className="balance_card">
              <div className={`balance-name balance-name-icici`}>Fidal</div>
              <div className="balance-amount">{data?.Fidal?.toFixed(2)}</div>
            </div>
            <div className="underline-balance"></div>
          </React.Fragment>
          <React.Fragment>
            <div className="balance_card">
              <div className={`balance-name balance-name-rak`}>Althameem</div>
              <div className="balance-amount">
                {data?.Althameem?.toFixed(2)}
              </div>
            </div>
            <div className="underline-balance"></div>
          </React.Fragment>
          <React.Fragment>
            <div className="balance_card">
              <div className={`balance-name balance-name-hdfc`}>Axis</div>
              <div className="balance-amount">{data?.Axis?.toFixed(2)}</div>
            </div>
            <div className="underline-balance"></div>
          </React.Fragment>
          <React.Fragment>
            <div className="balance_card">
              <div className={`balance-name balance-name-cash`}>CASH</div>
              <div className="balance-amount">{data?.CASH?.toFixed(2)}</div>
            </div>
            <div className="underline-balance"></div>
          </React.Fragment>
          <React.Fragment>
            <div className="balance_card">
              <div className={`balance-name balance-name-cash`}>Others</div>
              <div className="balance-amount">{data?.Others?.toFixed(2)}</div>
            </div>
            <div className="underline-balance"></div>
          </React.Fragment>
        </>
      )}
    </div>
  );
}

export default BranchDetails;
