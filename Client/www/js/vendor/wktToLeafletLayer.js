function getLeafletLayer(wkt) {
    var layer = omnivore.wkt.parse(wkt);
    var s = layer._layers;
    for (var i in s) {
        return s[i];
    }
}
