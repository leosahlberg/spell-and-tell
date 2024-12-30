export async function logIn(username: string, password: string) {
  try {
    const res = await fetch(`/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("An error accurd while login, " + error);
  }
}
