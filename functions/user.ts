import { supabase } from "@/supabase";
import { SignInUser, UpdateUser } from "@/types/user";
import { Session } from "@supabase/supabase-js";

export const checkIfLoggedIn = async () => {
  const session = await supabase.auth.getSession();
  return session.data.session ? session.data.session : false;
};

export const signInAnonymously = async (): Promise<Session | null> => {
  try {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) {
      throw new Error("Failed Login");
    }
    const { session } = data;
    if (!session?.user) {
      throw new Error("Failed Login");
    }
    return session;
  } catch (error) {
    console.error("Error during sign-in:", error);
    return null;
  }
};

export const patchHandover = async (
  body: Omit<UpdateUser, "transfer_password">
) => {
  const { error } = await supabase.auth.updateUser({
    email: body.transfer_mail,
  });
  if (error) {
    throw Error("Error at update user data");
  }
};

export const updatePassword = async (
  body: Omit<UpdateUser, "transfer_mail">
) => {
  const { error } = await supabase.auth.updateUser({
    password: body.transfer_password,
  });
  if (error) {
    throw Error("Error at update user data");
  }
};

export const fetchHandover = async (body: SignInUser) => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    return new Error("Error at sign out");
  }
  const signIn = await supabase.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });
  const signInData = signIn.data;
  const signInError = signIn.error;
  if (signInError || !signInData.session) {
    return new Error("Error at sign in");
  }
  return signInData.session;
};
