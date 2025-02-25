import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

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

export async function getStorys(token: string) {
  try {
    const res = await fetch(`/story`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });

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

export async function createStory(title: string, userId: string) {
  try {
    const token = useSelector<RootState>((state) => state.auth.token) as String;
    const res = await fetch(`/story`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({ title, userId }),
    });

    return res.json();
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

export async function createRouleSet(title: string, userId: string) {
  try {
    const token = useSelector<RootState>((state) => state.auth.token) as String;
    const res = await fetch(`/story`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({ title, userId }),
    });

    return res.json();
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
