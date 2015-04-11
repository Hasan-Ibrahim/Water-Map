lloydApp.factory('dragService', [
    function (){
        function moveDiv(infoDiv, actionDiv, translateX){
            infoDiv.css('webkitTransform', 'translateX(' + translateX + 'px)');
            actionDiv.css('width', Math.abs(translateX) + 'px');
        }

        function hideActions(infoDiv, actionDiv){
            actionDiv.css('width', '0%');
            infoDiv.css('webkitTransform', 'translateX(' + 0 + '%)');
        }

        function showActions(infoDiv, actionDiv){
            infoDiv.css('webkitTransform', 'translateX(-' + 100 + '%)');
            actionDiv.css('width', '100%');
        }

        function setTransitionDuration(infoDiv, actionDiv, transitionTime) {
            infoDiv.css('transition-duration', transitionTime);
            actionDiv.css('transition-duration', transitionTime);
        }

        return {
            dragInfo: function (infoDiv, actionDiv, e) {
                setTransitionDuration(infoDiv, actionDiv, '0s');

                if(e.gesture.deltaX < 0){
                    moveDiv(infoDiv, actionDiv, e.gesture.deltaX);
                }
            },
            dragActions: function (infoDiv, actionDiv, e) {
                setTransitionDuration(infoDiv, actionDiv, '0s');

                if(e.gesture.deltaX > 0){
                    moveDiv(infoDiv, actionDiv, -(infoDiv.outerWidth() - e.gesture.deltaX));
                }
            },
            releaseInfo: function (infoDiv, actionDiv, e) {
                setTransitionDuration(infoDiv, actionDiv, '0.2s');

                if(e.gesture.velocityX > 1.5 || Math.abs(e.gesture.deltaX) > infoDiv.outerWidth()/2){
                    showActions(infoDiv, actionDiv);
                }
                else {
                    hideActions(infoDiv, actionDiv);
                }
            },
            releaseActions: function (infoDiv, actionDiv, e) {
                setTransitionDuration(infoDiv, actionDiv, '0.2s');

                if (e.gesture.velocityX > 1.5 || Math.abs(e.gesture.deltaX) > infoDiv.outerWidth()/2) {
                    hideActions(infoDiv, actionDiv);
                }
                else {
                    showActions(infoDiv, actionDiv);
                }
            }
        };
    }
]);
