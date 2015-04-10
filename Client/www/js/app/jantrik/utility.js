function isPhoneGap() {
    return ('cordova' in window || 'PhoneGap' in window || 'phonegap' in window)
        && /^file:\/{3}[^\/]/i.test(window.location.href)
        && /ios|iphone|ipod|ipad|android|/i.test(navigator.userAgent);
}