lloydApp.service('convexHullTest', function (ConvexHull) {
    var hull = new ConvexHull();
    hull.addPoint(0.3215348546593775, 0.03629583077160248);
    hull.addPoint(0.02402358131857918, -0.2356728797179394);
    hull.addPoint(0.04590851212470659, -0.4156409924995536);
    hull.addPoint(0.3218384001607433, 0.1379850698988746);
    hull.addPoint(0.11506479756447, -0.1059521474930943);
    hull.addPoint(0.2622539999543261, -0.29702873322836);
    var h = hull.getHull();
    console.log(h);
});