const key = "user_token";

// 暴露三个方法
export const setToken = (token: string) => {
  localStorage.setItem(key, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(key);
};

export const removeToken = () => {
  localStorage.removeItem(key);
};
