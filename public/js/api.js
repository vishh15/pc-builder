export const fetchComponents = async () => {
  const response = await fetch("/components");
  return response.json();
};

export const fetchBuild = async () => {
  const response = await fetch("/build");
  return response.json();
};

export const addComponent = async (type, id) => {
  const response = await fetch("/build/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, id })
  });
  return response.json();
};

export const removeComponent = async (type) => {
  const response = await fetch("/build/remove", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type })
  });
  return response.json();
};

export const checkout = async (payload) => {
  const response = await fetch("/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return response.json();
};
