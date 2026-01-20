 export const usePermission = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const can = (code: string) => {
    if (user?.role === "SUPER_ADMIN") return true;
    return user?.permissions?.includes(code);
  };

  return { can, user };
};
