export default function remove(query:string, block:any) {
  const root = document.querySelector(query);
  if (root) {
    root.removeChild(block.getContent());
  }
  return root;
}