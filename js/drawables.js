var Drawables = function () {
    var that = this;
    var arrDrawables = [];
    var renderLayer = makeRenderLayer(width, height);
    var context = renderLayer.getContext();

    this.addDrawable = function (drawable) {
        // TODO is this a good idea?
        // drawable.container = that;
        arrDrawables.push(drawable);
    };

    
    var execCallback = function (name) {
        arrDrawables.forEach(function (drawable) {
            if (typeof drawable[name] === "function") {
                drawable[name](context);
            }
        });
    };

    renderLayer.setCallbacks({
        init: function() {
            execCallback("init");
        },
        logic: function() {
            execCallback("logic");
        },
        draw: function() {
            context.clearRect(0,0,
                    width,height);
            execCallback("draw");
        },
        stop: function() {
            context.clearRect(0,0,
                    width,height);
        },
    });

    this.start = renderLayer.start;
    this.stop = renderLayer.stop;
    this.toggle = renderLayer.toggle;
};

var PlayerShip = function () {
    var that = this;

    var x = 0, y = 0;
    var vx = 0, vy = 0;

    this.init = function (context) {
        context.drawImage(res.invader, x, x);
    };

    this.draw = function (context) {
        context.drawImage(res.invader, x, y);
        x+=vx; y+=vy;
    };

    var controlHandlers = {
        up: function () {
            vy = -1;
        },
        down: function () {
            vy = 1;
        },
        left: function () {
            vx = -1;
        },
        right: function () {
            vx = 1;
        },
    };
    this.getController = function () {
        return controlHandlers;
    };
};
