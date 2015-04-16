/*
 (c) 2014, Vladimir Agafonkin
 simpleheat, a tiny JavaScript library for drawing heatmaps with Canvas
 https://github.com/mourner/simpleheat
 */

(function () { 'use strict';

    function simpleheat(canvas, map) {
        // jshint newcap: false, validthis: true
        if (!(this instanceof simpleheat)) { return new simpleheat(canvas, map); }

        this._map = map;

        this._canvas = canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;

        this._ctx = canvas.getContext('2d');
        this._width = canvas.width;
        this._height = canvas.height;

        this._max = 1;
        this._data = [];
    }

    simpleheat.prototype = {

        defaultRadius: 25,

        defaultGradient: {
            0.4: 'blue',
            0.6: 'cyan',
            0.7: 'lime',
            0.8: 'yellow',
            1.0: 'red'
        },

        data: function (data) {
            this._data = data;
            return this;
        },

        max: function (max) {
            this._max = max;
            return this;
        },

        add: function (point) {
            this._data.push(point);
            return this;
        },

        clear: function () {
            this._data = [];
            return this;
        },

        cellSize: function(cellSize){
            this._cellSize = cellSize;
        },

        radius: function (r, blur) {
            blur = blur || 15;

            // create a grayscale blurred circle image that we'll use for drawing points
            var circle = this._circle = document.createElement('canvas'),
                ctx = this._rectCtx = circle.getContext('2d');
                //r2 = this._r = r + blur;

            //circle.width = circle.height = r2 * 2;
            circle.width = 10;//this._cellSize === undefined ? this.defaultRadius : this._cellSize.x;
            circle.height = 10;//this._cellSize === undefined ? this.defaultRadius : this._cellSize.y;

            //ctx.shadowOffsetX = ctx.shadowOffsetY = 200;
            //ctx.shadowBlur = blur;
            //ctx.shadowColor = 'black';

            ctx.beginPath();
            //ctx.arc(r2 - 200, r2 - 200, r, 0, Math.PI * 2, true);
            ctx.rect(0, 0, circle.width, circle.height);
            ctx.closePath();
            ctx.fill();

            return this;
        },

        rectangle: function(width, height, color){
            this._circle.width = width;
            this._circle.height = height;
            //ctx.shadowOffsetX = ctx.shadowOffsetY = 200;
            //ctx.shadowBlur = blur;
            //ctx.shadowColor = 'black';
            this._rectCtx.beginPath();
            //ctx.arc(r2 - 200, r2 - 200, r, 0, Math.PI * 2, true);
            this._rectCtx.rect(0, 0, width, height);
            this._rectCtx.fillStyle = "blue";
            this._rectCtx.fill();
            this._rectCtx.closePath();
        },

        gradient: function (grad) {
            // create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d'),
                gradient = ctx.createLinearGradient(0, 0, 0, 256);

            canvas.width = 1;
            canvas.height = 256;

            for (var i in grad) {
                gradient.addColorStop(i, grad[i]);
            }

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 1, 256);

            this._grad = ctx.getImageData(0, 0, 1, 256).data;

            return this;
        },

        draw: function (minOpacity) {
            if(!this._cellSize){
                this._cellSize = {x: 0.1, y:0.1};
            }
            if (!this._circle) {
                this.radius(this.defaultRadius);
            }
            if (!this._grad) {
                this.gradient(this.defaultGradient);
            }

            var ctx = this._ctx;

            ctx.clearRect(0, 0, this._width, this._height);

            // draw a grayscale heatmap by putting a blurred circle at each data point
            for (var i = 0, len = this._data.length, p; i < len; i++) {
                p = this._data[i];
                var topLeft = this._map.latLngToContainerPoint(L.latLng(p[0]+this._cellSize.y, p[1]-this._cellSize.x));
                var bottomRight = this._map.latLngToContainerPoint(L.latLng(p[0], p[1]));
                var width = Math.abs(bottomRight.x - topLeft.x);
                var height = Math.abs(bottomRight.y - topLeft.y);

                //ctx.fillStyle = "#cfed12";
                //ctx.globalAlpha = 1;//Math.max(p[2] / this._max, minOpacity === undefined ? 0.05 : minOpacity);
                //ctx.drawImage(this._circle, p[0] - this._r, p[1] - this._r);
                //this.rectangle(width, height, p[2]);
                //ctx.drawImage(this._circle, topLeft.x, topLeft.y, width, height);
                ctx.globalAlpha = 0.75;
                ctx.beginPath();
                ctx.rect(topLeft.x, topLeft.y, width, height);
                ctx.fillStyle = this._colorCodeCalculator(p[2]);
                ctx.fill();
            }

            // colorize the heatmap, using opacity value of each pixel to get the right color from our gradient
            var colored = ctx.getImageData(0, 0, this._width, this._height);
            //this._colorize(colored.data, this._grad);
            ctx.putImageData(colored, 0, 0);

            return this;
        },

        colorCodeCalculator:  function(calc){
            this._colorCodeCalculator = calc;
        },

        _colorize: function (pixels, gradient) {
            for (var i = 3, len = pixels.length, j; i < len; i += 4) {
                j = pixels[i] * 4; // get gradient color from opacity value

                if (j) {
                    pixels[i - 3] = gradient[j];
                    pixels[i - 2] = gradient[j + 1];
                    pixels[i - 1] = gradient[j + 2];
                }
            }
        }
    };

    window.simpleheat = simpleheat;

})(), /*
 (c) 2014, Vladimir Agafonkin
 Leaflet.heat, a tiny and fast heatmap plugin for Leaflet.
 https://github.com/Leaflet/Leaflet.heat
 */

    L.HeatLayer = (L.Layer ? L.Layer : L.Class).extend({

        // options: {
        //     minOpacity: 0.05,
        //     maxZoom: 18,
        //     radius: 25,
        //     blur: 15,
        //     max: 1.0
        // },

        initialize: function (map, latlngs, options) {
            this._latlngs = latlngs;
            this._valueCalculator = options.calcFunction;
            this._getCellSize = options.getCellSize;
            this._getStartLatLng = options.getStartLatLng;
            this._getLatLngs = options.getLatLngs;
            this._colorCodeCalculator = options.colorCodeCalculator;
            L.setOptions(this, options);
        },

        setLatLngs: function (latlngs) {
            this._latlngs = latlngs;
            return this.redraw();
        },

        addLatLng: function (latlng) {
            this._latlngs.push(latlng);
            return this.redraw();
        },

        setOptions: function (options) {
            L.setOptions(this, options);
            if (this._heat) {
                this._updateOptions();
            }
            return this.redraw();
        },

        redraw: function () {
            if (this._heat && !this._frame && !this._map._animating) {
                this._frame = L.Util.requestAnimFrame(this._redraw, this);
            }
            return this;
        },

        onAdd: function (map) {
            this._map = map;

            if (!this._canvas) {
                this._initCanvas();
            }

            map._panes.overlayPane.appendChild(this._canvas);

            map.on('moveend', this._reset, this);

            if (map.options.zoomAnimation && L.Browser.any3d) {
                map.on('zoomanim', this._animateZoom, this);
            }

            this._reset();
        },

        onRemove: function (map) {
            map.getPanes().overlayPane.removeChild(this._canvas);

            map.off('moveend', this._reset, this);

            if (map.options.zoomAnimation) {
                map.off('zoomanim', this._animateZoom, this);
            }
        },

        addTo: function (map) {
            map.addLayer(this);
            return this;
        },

        _initCanvas: function () {
            var canvas = this._canvas = L.DomUtil.create('canvas', 'leaflet-heatmap-layer leaflet-layer');
            var size = this._map.getSize();
            canvas.width  = size.x;
            canvas.height = size.y;

            var animated = this._map.options.zoomAnimation && L.Browser.any3d;
            L.DomUtil.addClass(canvas, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'));

            this._heat = simpleheat(canvas, this._map);
            this._updateOptions();
        },

        _updateOptions: function () {
            this._heat.radius(this.options.radius || this._heat.defaultRadius, this.options.blur);

            if (this.options.gradient) {
                this._heat.gradient(this.options.gradient);
            }
            if (this.options.max) {
                this._heat.max(this.options.max);
            }
        },

        _reset: function () {
            var topLeft = this._map.containerPointToLayerPoint([0, 0]);
            L.DomUtil.setPosition(this._canvas, topLeft);

            var size = this._map.getSize();

            if (this._heat._width !== size.x) {
                this._canvas.width = this._heat._width  = size.x;
            }
            if (this._heat._height !== size.y) {
                this._canvas.height = this._heat._height = size.y;
            }

            this._redraw();
        },

        _redraw: function () {

            this._latlngs = this._getLatLngs();
            var data = [],
                r = 25,//this._heat._r,
                size = this._map.getSize(),
                borderTolerance = 5,
                bounds = new L.LatLngBounds(
                    this._map.containerPointToLatLng(L.point([-r*borderTolerance, -r*borderTolerance])),
                    this._map.containerPointToLatLng(size.add([r*borderTolerance, r*borderTolerance]))),

                maxZoom = this.options.maxZoom === undefined ? this._map.getMaxZoom() : this.options.maxZoom,
                cellSize = this._getCellSize(),
                i, len, p, cell, x, y, j, len2, k;

            var startLatlng = this._getStartLatLng();
            var startLat = startLatlng.lat;
            var startLon = startLatlng.lng;
            // console.time('process');
            for (var rowNumber in this._latlngs) {
                var row = this._latlngs[rowNumber];
                var lat = startLat - rowNumber * cellSize.y;
                if(lat < bounds._southWest.lat || lat > bounds._northEast.lat )
                    continue;

                for(var columnNumber in row){
                    var lng = startLon + columnNumber * cellSize.x;
                    if(lng < bounds._southWest.lng || lng > bounds._northEast.lng )
                        continue;

                    var k = this._valueCalculator(this._latlngs[rowNumber][columnNumber]);
                    data.push([lat, lng, k]);
                }

            }

            // console.timeEnd('process');

            this._heat.cellSize(cellSize);
            this._heat.colorCodeCalculator(this._colorCodeCalculator);
            //this._heat.radius(r);
            // console.time('draw ' + data.length);
            this._heat.data(data).draw(this.options.minOpacity);
            // console.timeEnd('draw ' + data.length);

            this._frame = null;
        },

        _animateZoom: function (e) {
            var scale = this._map.getZoomScale(e.zoom),
                offset = this._map._getCenterOffset(e.center)._multiplyBy(-scale).subtract(this._map._getMapPanePos());

            if (L.DomUtil.setTransform) {
                L.DomUtil.setTransform(this._canvas, offset, scale);

            } else {
                this._canvas.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString(offset) + ' scale(' + scale + ')';
            }
        }
    });

L.heatLayer = function (map, latlngs, options) {
    return new L.HeatLayer(map, latlngs, options);
};
