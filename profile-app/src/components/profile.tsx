import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

const handleButton = () => {
  window.history.back();
};

return (
  isAuthenticated && (
    <>
      <div className="top-buttons">
        <button className="logout-button" onClick={handleButton}>Back</button>
      </div>

      <div className="profile">
        <img src={user?.picture} alt={user?.name} />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>
    </>
  )
);
};

export default Profile;
