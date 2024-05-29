
export const API_URL = 'https://outgoing-strong-nail.glitch.me';
// export const API_URL = "https://mirano-api-9k3t.onrender.com";
// export const API_URL = 'http://localhost:3000';

const formatQueryString = (params) => {
  if (Object.keys(params).length === 0) {
    return "";
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value);
  });

  return `?${searchParams.toString()}`;
};

export const fetchProducts = async (params = {}) => {
  try {
    const response = await fetch(
      `${API_URL}/api/products${formatQueryString(params)}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();

    return products;
  } catch (error) {
    console.error(`Ошибка при получении данных: ${error}`);
    return [];
  }
};

export const sendOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error(`Ошибка при заказе! Попробуйте позже. Код ошибки: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
