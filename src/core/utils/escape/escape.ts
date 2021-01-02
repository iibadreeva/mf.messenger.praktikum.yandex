export function escape(input: HTMLInputElement) {
  const div = document.createElement("div");
  if(input && input.value !== '') {
    div.textContent = input.value;
  }

  return  div.innerHTML;
}