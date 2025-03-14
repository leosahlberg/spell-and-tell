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
  username: string,
  email: string,
  password: string
) {
  try {
    const res = await fetch(`/user`, {
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
      throw new Error(
        error.message || "Failed to connect to the server. Please try again."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function createStory(
  title: string,
  userId: string,
  imgUrl: string,
  text: string,
  numberOfContributors: number,
  maxNumberOfWordsPerContribution: number,
  maxTime: number,
  spellChecking: boolean,
  scoring: boolean,
  token: string
) {
  try {
    console.log(
      JSON.stringify({
        title,
        userId,
        imgUrl,
        text,
        numberOfContributors,
        maxNumberOfWordsPerContribution,
        maxTime,
        spellChecking,
        scoring,
      })
    );
    const res = await fetch(`/story`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        title,
        userId,
        imgUrl,
        text,
        numberOfContributors,
        maxNumberOfWordsPerContribution,
        maxTime,
        spellChecking,
        scoring,
      }),
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

export async function deleteStory(id: string, token: string) {
  try {
    const res = await fetch(`/story/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete story");
    }

    return res;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error(error.message || "Failed to connect to the server.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}
