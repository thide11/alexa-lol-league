async function getConstants() {
  const response = await fetch("/constants");
  const json = await response.json();
  return json;
}