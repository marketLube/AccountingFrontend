import { useSelector } from "react-redux";

function User() {
  const { user, email } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="sideBar__user" style={{ paddingBlockStart: "1rem" }}>
        <div className="profile-card__info">
          <span className="profile-card__name">{user}</span>
          <span className="profile-card__email">{email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
