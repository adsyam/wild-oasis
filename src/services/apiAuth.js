import supabase from "./supabase"

export async function signUp({ full_name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        avatar: "",
      },
    },
  })

  if (error) throw new Error(error.message)

  return data
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) throw new Error(error.message)

  //   console.log(data)
  return data
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()

  if (!session.session) return null

  const { data, error } = await supabase.auth.getUser()

  //   console.log(data)

  if (error) throw new Error(error.message)

  return data?.user
}

export async function logout() {
  const { error } = await supabase.auth.signOut()

  if (error) throw new Error(error.message)
}
