import React, { useEffect } from "react";
import PropTypes from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";
import UsersList from "../../components/UsersList";

const UsersListContainer = ({ usersList, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {!(usersList.length > 0) && (
        <CircularProgress
          size="3rem"
          style={{ position: "relative", left: "50%", color: "white" }}
        />
      )}
      {usersList.length > 0 && <UsersList usersList={usersList} />}
    </div>
  );
};

UsersListContainer.propTypes = {
  usersList: PropTypes.array,
  getUsers: PropTypes.func.isRequired
};

export default UsersListContainer;
