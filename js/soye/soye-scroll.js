function soyeScroll(selector) {
    this.selector = selector;
    this.init = function (cb) {
        var selector = this.selector;
        var that = this;
        var arr = selector.split(' ');
        selector = arr.join('');
        var doc = '';
        if (selector.indexOf('.') === 0) {
            selector = selector.substring(1, selector.length);
            doc = document.getElementsByClassName(selector);
            if (doc === null) {
                console.error('soyeScroll errorMsg: this class is undefined!');
                return;
            }
            doc = doc[doc.length - 1];
            console.log(thisHeight + ':' + thisX);
            window.onscroll = function () {
                var thisClientHeight = document.body.clientHeight;
                var thisScrollHeight = document.body.scrollHeight;
                console.log(thisScrollHeight + ':' + (thisClientHeight + that.getScrollTop()));
                if (thisScrollHeight - 100 <= (thisClientHeight + that.getScrollTop())) {
                    cb();
                }
            };
        } else if (selector.indexOf('#') === 0) {
            selector = selector.substring(1, selector.length);
            doc = document.getElementById(selector);
            if (doc === null) {
                console.error('soyeScroll errorMsg: this id is undefined!');
                return;
            }
            var thisHeight = doc.style.height;
            var thisX = doc.getBoundingClientRect().left;
            console.log(thisHeight + ':' + thisX);
        }
    };
    this.getScrollTop = function () {
        var scrollTop = 0;
        var bodyScrollTop = 0;
        var documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    };
}

