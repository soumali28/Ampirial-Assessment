export const logout = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (response.ok) {
      return true;
    } else {
      console.error("Logout failed:", response.statusText);
    }
    return false;
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
