(function() {
  const scrollDown = () => {
    const chart = document.getElementsByClassName('js-chart')[0];

    if (chart) {
      chart.scrollTop = chart.scrollHeight;
    }
  };

  const infoModal = (text='Ошибка, попробуйте ещё раз') => {
    const overview = document.getElementsByClassName('overview')[0];
    const body = document.body;

    const isModal = document.getElementsByClassName('modal')[0];

    if (!isModal) {
      const modal = document.createElement('div');
      const template = `<div class="modal__body">
                          <div class="modal__text modal__text_center">${text}</div>
                        </div>
                        <footer class="modal__footer modal__footer_center">
                          <button class="modal__btn modal__btn_wide js-add-user-btn">Поменять</button>
                        </footer>`;

      overview.classList.add('overview_active');
      modal.classList.add('modal');
      modal.innerHTML = template;
      body.appendChild(modal);

      const btn = document.getElementsByClassName('js-add-user-btn')[0];
      btn.addEventListener('click', () => {
        overview.classList.remove('overview_active');
        body.removeChild(modal);
      });
    }
  };

  const addRemoveUser = (type) => {
    const user = type === 'add' ? document.getElementsByClassName('js-add-user')[0] : document.getElementsByClassName('js-remove-user')[0];
    const overview = document.getElementsByClassName('overview')[0];
    const body = document.body;

    user.addEventListener('click', () => {
      const isModal = document.getElementsByClassName('modal')[0];

      if (!isModal) {
        const modal = document.createElement('div');
        const nav = document.getElementsByClassName('nav-list')[0];
        const template = `<div class="modal__body">
                          <div class="modal__text modal__text_center">Добавить новго пользователя</div>
                          <div class="modal__control">
                            <div class="modal__label">Логин</div>
                            <input class="modal__value" value="${type === 'add' ? '' : 'Андрей'}" autofocus>
                          </div>
                        </div>
                        <footer class="modal__footer modal__footer_center">
                          <button class="modal__btn modal__btn_wide js-add-user-btn">Добавить</button>
                        </footer>`;

        overview.classList.add('overview_active');
        body.removeChild(nav);
        modal.classList.add('modal');
        modal.innerHTML = template;
        body.appendChild(modal);

        const btn = document.getElementsByClassName('js-add-user-btn')[0];
        btn.addEventListener('click', () => {
          overview.classList.remove('overview_active');
          body.removeChild(modal);
        });
      }
    });
  };

  const removeChat = () => {
    const removeList = document.getElementsByClassName('js-remove-chat')[0];
    const overview = document.getElementsByClassName('overview')[0];
    const body = document.body;

    if (removeList) {
      removeList.addEventListener('click', () => {
        const isModal = document.getElementsByClassName('modal')[0];

        if (!isModal) {
          const modal = document.createElement('div');
          const nav = document.getElementsByClassName('nav-list')[0];
          const template = `<div class="modal__body">
                            <div class="modal__text">Удалить чат с “Андрей”?</div>
                          </div>
                          <footer class="modal__footer">
                            <button class="modal__btn modal__btn_secondary js-close-modal">ОТМЕНА</button>
                            <button class="modal__btn js-remove-chat">УДАЛИТЬ</button>
                          </footer>`;

          overview.classList.add('overview_active');
          body.removeChild(nav);
          modal.classList.add('modal', 'modal_average');
          modal.innerHTML = template;
          body.appendChild(modal);

          const btnClose = document.getElementsByClassName('js-close-modal')[0];
          btnClose.addEventListener('click', () => {
            overview.classList.remove('overview_active');
            body.removeChild(modal);
          });
          const btnRemove = document.getElementsByClassName('js-remove-chat')[0];
          btnRemove.addEventListener('click', () => {
            overview.classList.remove('overview_active');
            body.removeChild(modal);
          });
        }
      });
    }
  };

  const hamburger = (() => {
    const hamburgerProfile = document.getElementsByClassName('js-hamburger-profile')[0];
    const hamburgerChat = document.getElementsByClassName('js-hamburger-chat')[0];
    const hamburgerFiles = document.getElementsByClassName('js-hamburger-files')[0];
    const hamburgerArrows = document.getElementsByClassName('js-hamburger-arrow');
    const body = document.body;

    return {
      createProfile: function() {
        if (hamburgerProfile) {
          hamburgerProfile.addEventListener('click', (e) => {
            const nav = document.getElementsByClassName('nav-list')[0];
            if (!nav) {
              const nav = document.createElement('nav');

              const template = `<li class="nav-list__item js-add-user">Добавить пользователя</li>
                                <li class="nav-list__item js-remove-user">Удалить пользователя</li>
                              <li class="nav-list__item">Профиль</li>`;

              nav.classList.add('nav-list');
              nav.innerHTML = template;
              body.appendChild(nav);

              const navWidth = nav.offsetWidth;
              const x = e.pageX;
              const y = e.pageY;

              nav.style.left = `${x - navWidth + 10}px`;
              nav.style.top = `${y}px`;
              addRemoveUser('add');
              addRemoveUser('remove');
            } else {
              body.removeChild(nav);
            }
          });
        }
      },
      createChat: function() {
        if (hamburgerChat) {
          hamburgerChat.addEventListener('click', (e) => {
            const nav = document.getElementsByClassName('nav-list')[0];
            if (!nav) {
              const nav = document.createElement('nav');

              const template = '<li class="nav-list__item js-remove-chat">Удалить чат</li>';

              nav.classList.add('nav-list');
              nav.innerHTML = template;
              body.appendChild(nav);

              const navWidth = nav.offsetWidth;
              const x = e.pageX;
              const y = e.pageY;

              nav.style.left = `${x - navWidth + 10}px`;
              nav.style.top = `${y}px`;
              removeChat();
            } else {
              body.removeChild(nav);
            }
          });
        }
      },
      createFiles: function() {
        if (hamburgerFiles) {
          hamburgerFiles.addEventListener('click', (e) => {
            const nav = document.getElementsByClassName('nav-list')[0];
            if (!nav) {
              const nav = document.createElement('nav');

              const template = `<li class="nav-list__item">
                                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 1.5H18C19.3807 1.5 20.5 2.619 20.5 4V14L14.5194 12.405C13.5108 12.136 12.4714 12 11.4275 12H10.5725C9.5286 12 8.4892 12.136 7.4806 12.405L1.5 14V4C1.5 2.619 2.6193 1.5 4 1.5ZM0 4C0 1.791 1.7909 0 4 0H18C20.2091 0 22 1.791 22 4V18C22 20.209 20.2091 22 18 22H4C1.7909 22 0 20.209 0 18V4ZM8 6C8 7.105 7.1046 8 6 8C4.8954 8 4 7.105 4 6C4 4.895 4.8954 4 6 4C7.1046 4 8 4.895 8 6Z" fill="#2F43F2"></path>
                                  </svg>Фото или Видео
                                </li>
                                <li class="nav-list__item">
                                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 1.5H18C19.3807 1.5 20.5 2.619 20.5 4V12H16C13.7909 12 12 13.791 12 16V20.5H4C2.6193 20.5 1.5 19.381 1.5 18V4C1.5 2.619 2.6193 1.5 4 1.5ZM12 22H4C1.7909 22 0 20.209 0 18V4C0 1.791 1.7909 0 4 0H18C20.2091 0 22 1.791 22 4V12V18C22 20.209 20.2091 22 18 22H12Z" fill="#2F43F2"></path>
                                  </svg>Файл
                                </li>
                                <li class="nav-list__item">
                                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 11C20.5 16.247 16.2467 20.5 11 20.5C5.7533 20.5 1.5 16.247 1.5 11C1.5 5.753 5.7533 1.5 11 1.5C16.2467 1.5 20.5 5.753 20.5 11ZM22 11C22 17.075 17.0751 22 11 22C4.9249 22 0 17.075 0 11C0 4.925 4.9249 0 11 0C17.0751 0 22 4.925 22 11ZM11 14C12.6569 14 14 12.657 14 11C14 9.343 12.6569 8 11 8C9.3431 8 8 9.343 8 11C8 12.657 9.3431 14 11 14Z" fill="#2F43F2"></path>
                                  </svg>Локация
                                </li>`;

              nav.classList.add('nav-list');
              nav.innerHTML = template;
              body.appendChild(nav);

              const navHeight = nav.offsetHeight;
              const x = e.pageX;
              const y = e.pageY;

              nav.style.left = `${x + 10}px`;
              nav.style.top = `${y - navHeight}px`;
              removeChat();
            } else {
              body.removeChild(nav);
            }
          });
        }
      },
      createArrow: function() {
        Array.from(hamburgerArrows).forEach(item => {
          if (item) {
            item.addEventListener('click', (e) => {
              const nav = document.getElementsByClassName('nav-list')[0];
              if (!nav) {
                const nav = document.createElement('nav');
                const template = '<li class="nav-list__item js-remove-chat">Удалить чат</li>';

                nav.classList.add('nav-list');
                nav.innerHTML = template;
                body.appendChild(nav);

                const navWidth = nav.offsetWidth;
                const x = e.pageX;
                const y = e.pageY;

                nav.style.left = `${x - navWidth + 10}px`;
                nav.style.top = `${y}px`;
                removeChat();
              } else {
                body.removeChild(nav);
              }
            });
          }
        });
      },
      removeNav: function() {
        body.addEventListener('click', (e) => {
          const nav = document.getElementsByClassName('nav-list')[0];

          if (nav && (hamburgerProfile || hamburgerChat)) {
            const isReady = !e.target.classList.contains('js-hamburger-profile') &&
                            !e.target.classList.contains('fa-bars') &&
                            !e.target.classList.contains('nav-list__item') &&
                            !e.target.classList.contains('js-hamburger-arrow') &&
                            !e.target.classList.contains('fa-caret-down') &&
                            !e.target.closest('.js-hamburger-files');
            if (isReady) {
              body.removeChild(nav);
            }
          }
        });
      }
    };
  })();

  const log = (() => {
    const phoneRe = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
    const emailRe = /^[\w-\.]+@[\w-]+\.[a-z]{2,3}$/i;
    let matchList = [];

    return {
      showError: function(error, input) {
        if (error) {
          error.textContent = input.dataset.text;
          input.closest('.log-form__control').classList.add('log-form__control_error');
        }
        matchList.push(0);
      },
      validate: function(input, modal, e) {
        const error = input.nextElementSibling;
        const isPassword = input.dataset.type === 'password_again' && input.value !== input.parentNode.previousElementSibling.querySelector('input').value;

        if (isPassword) {
          this.showError(error, input);
        } else if (input.dataset.type === 'email' && !input.value.match(emailRe)) {
          this.showError(error, input);
        } else if (input.dataset.type === 'phone' && !input.value.match(phoneRe)) {
          this.showError(error, input);
        } else if (input.dataset.size && input.value.length < parseInt(input.dataset.size)) {
          this.showError(error, input);
        } else if (input.dataset.text && input.value === '') {
          this.showError(error, input);
        } else {
          if (error) {
            error.textContent = '';
            input.closest('.log-form__control').classList.remove('log-form__control_error');
          }
          matchList.push(1);
        }
      },
      send: function(inputs, modal) {
        const data = [];
        matchList = [];
        Array.from(inputs).forEach((input, i) => {
          this.validate(input, modal);

          const dataItem = {};
          dataItem[input.dataset.type] = input.value;
          data.push(dataItem);
        });
        const isValid = matchList.find(item => item === 0);
        if (isValid !== 0) {
          console.log('Данные: ', data);
        } else if (modal) {
          infoModal('Не все поля правильно заполнены');
        }
      },
      in: function() {
        const form = document.getElementsByClassName('log-form')[0];
        const inputs = form ? form.querySelectorAll('input') : null;
        const btn = document.getElementsByClassName('js-login')[0];
        if (btn) {
          Array.from(inputs).forEach(item => item.addEventListener('keyup', this.validate.bind(this, item)));

          btn.addEventListener('click', this.send.bind(this, inputs, false));
        }
      },
      registration: function() {
        const form = document.getElementsByClassName('log-form')[0];
        const inputs = form ? form.querySelectorAll('input') : null;
        const btn = document.getElementsByClassName('js-registration')[0];
        if (btn) {
          Array.from(inputs).forEach(item => item.addEventListener('keyup', this.validate.bind(this, item)));

          btn.addEventListener('click', this.send.bind(this, inputs, false));
        }
      },
      update: function() {
        const form = document.getElementsByClassName('profile__items')[0];
        const inputs = form ? form.querySelectorAll('input') : null;
        const btn = document.getElementsByClassName('js-update')[0];
        if (btn) {
          Array.from(inputs).forEach(item => item.addEventListener('keyup', this.validate.bind(this, item)));

          btn.addEventListener('click', this.send.bind(this, inputs, true));
        }
      }
    };
  })();

  setTimeout(() => scrollDown(), 100);

  hamburger.createProfile();
  hamburger.createChat();
  hamburger.createFiles();
  hamburger.createArrow();
  hamburger.removeNav();
  log.in();
  log.registration();
  log.update();


  /**/
  (function() {
    class Tooltip {
      constructor() {
        this.el = document.createElement('div');
        this.el.style.position = 'absolute';

        this.el.classList.add(this.name);
        document.body.appendChild(this.el);

        this.onHide = this.onHide.bind(this);
        this.listeners = [];
      }

      get name() {
        return 'tooltip';
      }

      get indent() {
        return 5;
      }

      delegate(eventName, element, cssSelector, callback) {
        const fn = event => {
          if (!event.target.matches(cssSelector)) {
            return;
          }

          callback(event);
        };


        element.addEventListener(eventName, fn);
        this.listeners.push({ fn, element, eventName });

        return this;
      }

      onShow = (event) => {
        const that = event.target;
        const text = that.dataset.tooltip;
        const bodyHeight = document.documentElement.clientHeight;
        const domRec = that.getBoundingClientRect();
        const left = domRec.left;

        this.el.style.display = 'block';
        this.el.textContent = text;

        const top = (num = 5) => {
          if ( (domRec.bottom + domRec.height) < bodyHeight) {
            return domRec.top + domRec.height + num;
          }
          return domRec.top - this.el.offsetHeight - num;
        }

        this.el.style.top = `${top()}px`;
      }

      onHide() {
        this.el.style.top = '';
        this.el.style.display = 'none';
        this.el.textContent = '';
        this.detach();
        this.attach(document.body);
      }

      attach(root) {
        this
          .delegate('mouseover', root, '[data-tooltip]', this.onShow)
          .delegate('mouseout', root, '[data-tooltip]', this.onHide);
      }

      detach() {
        this.listeners.forEach(item => {
          item.element.removeEventListener(item.eventName, item.fn)
        });
        this.listeners = [];
      }
    }

    window.Tooltip = Tooltip;
  })();

  const tooltip = new Tooltip();
  tooltip.attach(document.body);
})();
const test = 'test ';

const fn = (arg) => console.log(arg);
fn(test)