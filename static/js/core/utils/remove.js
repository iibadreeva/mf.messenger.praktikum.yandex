export default function remove(query, block) {
    const root = document.querySelector(query);
    if (root) {
        root.removeChild(block.getContent());
    }
    return root;
}
//# sourceMappingURL=remove.js.map