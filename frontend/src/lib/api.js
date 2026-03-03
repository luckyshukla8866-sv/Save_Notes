const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

/**
 * Create a new note.
 * @param {{ access_code: string, content: string, expiry_hours: number }} data
 * @returns {Promise<{ success: boolean, data?: object, error?: object }>}
 */
export async function createNote({ access_code, content, expiry_hours }) {
  try {
    const res = await fetch(`${API_BASE}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_code, content, expiry_hours }),
    });
    return await res.json();
  } catch {
    return {
      success: false,
      error: { code: "NETWORK_ERROR", message: "Unable to reach the server. Please check your connection." },
    };
  }
}

/**
 * Retrieve a note by access code.
 * @param {string} code
 * @returns {Promise<{ success: boolean, data?: object, error?: object }>}
 */
export async function getNote(code) {
  try {
    const res = await fetch(`${API_BASE}/notes/${encodeURIComponent(code)}`);
    return await res.json();
  } catch {
    return {
      success: false,
      error: { code: "NETWORK_ERROR", message: "Unable to reach the server. Please check your connection." },
    };
  }
}
