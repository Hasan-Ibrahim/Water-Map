function SidebarService() {
    this.showTopBar = true;
    this.showRightBar = false;
    this.toggleRightBar = function () {
        if (this.showRightBar) {
            $('.sp-right-box').removeClass('animated fadeInRight');
            $('.sp-right-box').addClass('animated fadeOutRight');
        } else {
            $('.sp-right-box').removeClass('animated fadeOutRight');
            $('.sp-right-box').addClass('animated fadeInRight');
        }
        this.showRightBar = !this.showRightBar;
    };

    this.toggleTopBar = function () {
        if (this.showTopBar) {
            $('.sp-top-box').removeClass('animated fadeInDown');
            $('.sp-top-box').addClass('animated fadeOutUp');
        } else {
            $('.sp-top-box').removeClass('animated fadeOutUp');
            $('.sp-top-box').addClass('animated fadeInDown');
        }
        this.showTopBar = !this.showTopBar;
    };
}

lloydApp.service('sidebarService', SidebarService);