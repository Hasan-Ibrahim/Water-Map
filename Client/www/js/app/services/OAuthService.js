function OAuthService($window) {
    this.requestFacebookLoginInfo = function (success, fail) {
        $window.OAuth.popup('facebook')
            .done(function (facebook) {
                var accessToken = facebook.access_token;
                facebook.me().done(function (me) {
                    success(accessToken, me.id, me.name, me.avatar);
                })
            })
            .fail(function (error) {
                fail();
            });
    };

    this.facebookLogout = function (success, fail) {
        success();
    };

    this.initOAuth = function () {
        $window.OAuth.initialize('T3Ixv0g2yqHyMGvMLJGY7-Dz-7M');
    };
}

function PluginOAuthService($window) {
    var permissions = ['public_profile'];
    var appId = '291722901017949';

    this.requestFacebookLoginInfo = function (success, fail) {
        facebookConnectPlugin.login(
            permissions, function (response) {
                var authResponse = response.authResponse;
                var accessToken = authResponse.accessToken;

                var graphPath = '/me';
                facebookConnectPlugin.api(graphPath, ["public_profile"],
                    function (result) {
                        var id = result.id;
                        var name = result.name;
                        var profilePicturePath = authResponse.userID + '/picture?redirect=0&height=200&type=normal&width=200';
                        facebookConnectPlugin.api(profilePicturePath, permissions, function (result) {
                            var avatar = result.data.url;
                            success(accessToken, id, name, avatar);
                        }, function (error) {
                            fail(error);
                        });
                    },
                    function (error) {
                        fail(error);
                    });
            }, function (obj) {
                fail(obj);
            });
    };

    this.facebookLogout = function (success, fail) {
        facebookConnectPlugin.logout(success, fail);
    };

    function initPlugin() {
        facebookConnectPlugin.browserInit(appId);
    }

    this.initOAuth = function () {
    };
}

function MockOAuthService() {
    var fakeUsers = [
        {
            facebookId: 339050869601398,
            facebookImage: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/c86.0.320.320/p320x320/1010486_339051509601334_5121435908368243724_n.jpg?oh=cbb008f03c6209330e0d96c5524a43bf&oe=555F52FB&__gda__=1432338693_bf10b6837a146da3999a472096f86b24',
            facebookName: 'Jantrickery FakeOne',
            facebookToken: 'CAAEJUgfjVV0BAFZBZBZAf5gZBIegGLVxAkdoeP4xtcaZAmj08cC0ZB8zej9oJEIe1EE8YpVMxAfRFA8plUuXNOzhzWlZBIdWmDzyl901TAx4SUZA5zTmkqK00EXeozwePWXqSz6XwXdWylUl27QB3VwkUE6uxsD7EdqtnpghK9pZCXCvKBNOfuPwomrI7dxnxeVRiSw0Pzryd29VHUf3ghDiu'
        },
        {
            facebookId: 292045131003395,
            facebookImage: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/c53.0.320.320/p320x320/10686861_287837364757505_4371024673970908036_n.jpg?oh=1aa0a73ff788c1ca8888ac13b569d9a1&oe=556C0798&__gda__=1432664287_01c9e57f38804c886d07a904a0fcca8a',
            facebookName: 'Jantrichery FakeTwo',
            facebookToken: 'CAAEJUgfjVV0BAPUI9cqNENyvXDRaYG8Qsslg33vFlA1R0dfresJQyymZCnYZBefOkJZBTRhMXdhlGVqYs99IwQjiJ3CQZCCqfDsj6ZCPh6xKixwmsnUNqnwDkmrcVfN9brjZClxuLEoIo55GRE4BmZBdNAL6TdMm4OHZAnrYBLHZA1eq5e81ZCQ9ieGzEOtZBOzkN4LOqKJZBCv5hdsmwYSw5lb4'
        }
    ];

    var currentIndex;

    this.requestFacebookLoginInfo = function (success, fail) {
        var currentUser = fakeUsers[currentIndex];
        success(currentUser.facebookToken, currentUser.facebookId, currentUser.facebookName, currentUser.facebookImage);
    };

    this.facebookLogout = function (success, fail) {
        currentIndex = (currentIndex + 1) % fakeUsers.length;
        success();
    };

    this.initOAuth = function () {
        currentIndex = 0;
    };
}
