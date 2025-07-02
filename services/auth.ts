import { account } from "@/lib/appwrite";

export const signup = async (name: string, email: string, password: string) => {
  try {
    await account.create("unique()", email, password, name);
    return await getCurrentUser();
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    await account.createEmailPasswordSession(email, password);
    return await getCurrentUser();
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error: any) {
    if (error?.message?.includes("missing scope") || error?.code === 401) {
      return null;
    }
    throw error;
  }
};
