function checkAuth(navigate) {
  return (response) => {
    if (response?.status === 401) {
      navigate("/login");
    }
    return response;
  };
}

export { checkAuth };
