var border = function(paper, element) {
    var rect = paper.drawnRect(element.offset().left,
                               element.offset().top,
                               element.outerWidth(false), // no margin
                               element.outerHeight(false), // no margin
                               1.2);
    rect.attr("stroke", "#fff");

    return element;
};

var crosshatch = function(paper, element, interval) {
    var l = element.offset().left;
    var t = element.offset().top;
    var w = element.outerWidth(false);
    var h = element.outerHeight(false);
    for (var i = 0; i < w + h; i += interval) {
        var line = paper.drawnLine(l + Math.min(i, w),
                                   t + Math.max(0, i - w),
                                   l + Math.max(0, i - h),
                                   t + Math.min(i, h),
                                   1.2);
        line.attr("stroke", "#fff");
        line.attr("opacity", "0.6");
    }

    return element;
};

$(window).load(function() { 
    var paper = Raphael(0,0, $(document).width(), $(document).height());

    $('.bpborder').each(function() {
        border(paper, $(this));
    });

    $('[class*="bphatch"]').each(function() {
        var classes = this.className.split(/\s+/);
        var that = this;
        $.each(classes, function() {
            if (this.match(/^bphatch\-[0-9]+$/)) {
                var interval = parseInt(this.split('-')[1], 10);
                crosshatch(paper, $(that), interval);
                return false;
            }
            else if (this.match(/^bphatch/)) {
                crosshatch(paper, $(that), 10);
                return false;
            }
        });

    });

});
