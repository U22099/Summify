export function storeValue(name, value){
  const summify = JSON.parse(localStorage.getItem("Summify"));
  summify[name] = value;
  localStorage.setItem("Summify", JSON.stringify(summify));
}

export function getValue(name) {
  const summify = JSON.parse(localStorage.getItem("Summify"));
  return summify[name];
}

export function clearAll(){
  localStorage.setItem("Summify", JSON.stringify({}));
}