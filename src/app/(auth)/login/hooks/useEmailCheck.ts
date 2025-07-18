import { useCallback } from "react";

export const useEmailCheck = () => {
  const checkEmail = useCallback(async (email: string): Promise<boolean> => {
    const response = await fetch(
      `/api/user-exists?email=${encodeURIComponent(email)}`
    );

    if (!response.ok) {
      throw new Error("Failed to check email");
    }

    const data = await response.json();
    return data.exists;
  }, []);

  return { checkEmail };
};
