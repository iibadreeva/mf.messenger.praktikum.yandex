export function escape(input) {
    const div = document.createElement("div");
    if (input && input.value !== '') {
        div.textContent = input.value;
    }
    return div.innerHTML;
}
//# sourceMappingURL=escape.js.map