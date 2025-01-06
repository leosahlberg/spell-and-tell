export async function logIn(username: string, password: string) {
  try {
    const res = await fetch(`/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      throw new Error(errorData.message || "Login failed");
    }

    return res;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error(
        error.message || "Failed to connect to the server. Please try again."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function registerUser(
  name: string,
  email: string,
  username: string,
  password: string
) {
  try {
    const res = await fetch(`/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name,
        username,
        email,
        password,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      throw new Error(errorData.message || "Registration failed");
    }

    return res;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error(
        error.message || "Failed to connect to the server. Please try again."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}
