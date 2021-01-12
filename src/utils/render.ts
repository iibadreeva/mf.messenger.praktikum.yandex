import Block from '../core/block';

export default function render(query: string, block: Block<Object>) {
  const root = document.querySelector(query);
  if (root) {
    root.appendChild(block.getContent());
  }
  return root;
}
