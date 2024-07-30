import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  console.log(data);
  return data;
}


export async function getCurrentUser() {
  try {
    const { data: session, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError) throw new Error(sessionError.message);

    if (!session?.session) return null;

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError) throw new Error(userError.message);

    console.log(user); // This should log the user data
    return user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if(error) {
    console.log(error);
  }
}
