export default class Tabs {
    constructor({ element, tabs }) {
        this.element = element;
        this.tabs = tabs;
        this.callBackObj = {};
        this.currentTab = tabs[0];

        this.render();
        this.addEvents();
    }
    render() {
        this.element.innerHTML = `
            <div class="tabs__header">
            ${this.tabs.map(tab => {
                return `<div class="tabs__tab ${tab === this.currentTab ? 'tabs__tab--active' : ''}", data-title="${tab.title}">${tab.title}</div>`
            }).join('')}
            </div>
            <div class="tabs__content">
                ${this.currentTab.content}
            </div>
        `
    }
    getCurrentTabData() {
        return this.currentTab;
    }
    addEvents() {
        this.on('click', 'tabs__tab', (e) => {
            this.tabs.find(tab => {
                if(tab.title === e.target.dataset.title) {
                    this.currentTab = tab;
                    this.callBackObj['tab-selected'](this.currentTab);

                    this.render();
                }
            })
        })
    }
    subscribe(eventName, fn) {
       this.callBackObj[eventName] = fn;
    }
    on(eventName, elementName, callBack) {
        this.element.addEventListener(eventName,(e) => {
            if(e.target.closest(`.${elementName}`)) {
                callBack(e);
            }
        })
    }
}