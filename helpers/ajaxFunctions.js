export async function sendDataWithAjax(url, sendData) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(sendData),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error on post');
  }
}
