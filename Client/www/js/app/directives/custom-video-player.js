lloydApp.directive('customVideoPlayer', [
    function () {
        return {
            restrict: 'E',
            scope: {
                ngSrc: '@'
            },
            templateUrl: 'partials/custom-video-player.html',
            controller: ['$scope', '$sce', '$interval', '$ionicSlideBoxDelegate', function ($scope, $sce, $interval, $ionicSlideBoxDelegate) {
                $scope.preventDefault = function (e) {
                    $ionicSlideBoxDelegate.enableSlide(false);
                }

                $scope.VideoUrl = $sce.trustAsResourceUrl($scope.ngSrc);
                $scope.video = document.getElementById('video');

                initTimeCount();
                var countTime;

                $scope.video.addEventListener('ended', function () {
                    pause();
                    $scope.video.currentTime = 0;
                    initTimeCount();
                });

                $scope.togglePlayPause = function () {
                    if ($scope.video.paused) {
                        play();
                    } else {
                        pause();
                    }
                };

                $scope.toggleMuteVolume = function (e) {
                    if (!$scope.video.muted) {
                        $scope.video.muted = true;
                        e.srcElement.classList.remove('ion-volume-high');
                        e.srcElement.classList.remove('ion-volume-medium');
                        e.srcElement.classList.remove('ion-volume-low');
                        e.srcElement.classList.add('ion-volume-mute');
                    } else {
                        $scope.video.muted = false;
                        e.srcElement.classList.remove('ion-volume-mute');
                        e.srcElement.classList.add('ion-volume-high');
                    }
                };

                $scope.seek = function (e) {
                    var time = ($scope.video.duration * $scope.seekTime) / 100;
                    $scope.video.currentTime = time;
                };

                $scope.setVolume = function (e) {
                    $scope.video.volume = e.srcElement.value;
                    var volumeIcon = document.getElementById('volume-control');
                    volumeIcon.classList.remove('ion-volume-high');
                    volumeIcon.classList.remove('ion-volume-medium');
                    volumeIcon.classList.remove('ion-volume-low');
                    volumeIcon.classList.remove('ion-volume-mute');
                    var addClass = getvolumeState(e.srcElement.value);
                    volumeIcon.classList.add(addClass);
                };

                function initTimeCount() {
                    $scope.seekTime = 0;
                    $scope.seekSecond = twoDigit(0);
                    $scope.seekMinute = 0;
                }

                function updateTimeCount() {
                    $scope.seekTime = ($scope.video.currentTime/$scope.video.duration) * 100;
                    $scope.seekSecond = twoDigit($scope.video.currentTime%60);
                    $scope.seekMinute = $scope.video.currentTime/60 | 0;
                }

                function play(){
                    $scope.video.play();
                    var playIcon = document.getElementById('play-control');
                    playIcon.classList.remove('ion-play');
                    playIcon.classList.add('ion-pause');

                    countTime = $interval(function () {
                        if(!isNaN($scope.video.duration)){
                            updateTimeCount();
                        }
                    }, 100);
                }

                function pause(){
                    $scope.video.pause();
                    var playIcon = document.getElementById('play-control');
                    playIcon.classList.remove('ion-pause');
                    playIcon.classList.add('ion-play');

                    $interval.cancel(countTime);
                }

                function getvolumeState(value) {
                    if(value === 0){
                        return 'ion-volume-mute';
                    } else if(value >= 0.1 && value < 0.34){
                        return 'ion-volume-low';
                    } else if(value >= 0.34 && value < 0.67){
                        return 'ion-volume-medium';
                    } else {
                        return 'ion-volume-high';
                    }
                }

                function twoDigit(number) {
                    number = number | 0;
                    var twodigit = number >= 10 ? number : "0"+number.toString();
                    return twodigit;
                }
            }]
        };
    }
]);
