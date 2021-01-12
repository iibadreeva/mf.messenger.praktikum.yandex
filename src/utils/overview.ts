export function overviewShow() {
  const overview = document.querySelector('.overview');
  if (overview) {
    overview.classList.add('overview_active');
  }
}

export function overviewHide() {
  const overview = document.querySelector('.overview');
  if (overview) {
    overview.classList.remove('overview_active');
  }
}
