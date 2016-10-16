/**
 * Created by D1Rty on 07.10.2016.
 */

/**
 * Start config for video player
 */
var tag = document.createElement('script'),
    player,
    firstScriptTag = document.getElementsByTagName('script')[0];

tag.src = "https://www.youtube.com/iframe_api";
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

/**
 * Function run autoplay
 * video player
 *
 * @param event {Object}
 */
function onPlayerReady(event) {
    event.target.playVideo();
    event.target.mute()
}

/**
 * Function play video player
 */
function playVideo() {
    player.playVideo();
}

/**
 * Function stop video player
 */
function stopVideo() {
    player.pauseVideo();
}

/**
 * Function set config
 * to video player
 */
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-frame', {
        height: '356',
        width: '202',
        videoId: '9xKR8Vcjias',
        events: {
            'onReady': onPlayerReady
        }
    });
}
/**
 * End config for video player
 */

(function () {
    "use strict";

    var elements = {
            $range: document.getElementById("range"),
            $product: document.getElementById("product"),
            $itemContainer: document.getElementById("item-container"),
            $video: document.getElementById("video"),
            $productText: document.getElementById("information"),
            $reflection: document.getElementById("reflection"),
            $flashlight: document.getElementById("flashlight"),
            $memoryLightning: document.getElementById("memory-lightning"),
            $memorySocket: document.getElementById("memory-socket")
        },
        opts = {
            stepSize: -221
        },
        actionConfig = {
            iterationDelay: {
                min: 3000,
                max: 5000
            }
        },
        productTexts = [
            {text: "Rethink what a phone can do"},
            {text: "Water and dust resistant: Real world ready"},
            {text: "Capture picture perfect moments in all conditions"},
            {text: "Expandable memory: Fit more of what you love"}
        ],
        isRaining = false,
        defaultVal = elements.$range.defaultValue;
    /**
     * Method generate random number
     *
     * @method randomNumber
     * @returns {number}
     */
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Method toggle video state
     *
     * @method isDefaultState
     * @returns {boolean}
     */
    function isDefaultState() {
        return defaultVal === elements.$range.value;
    }

    /**
     * Method toggle video state
     *
     * @method toggleVideo
     * @param state {boolean} - state of video
     * @returns {void}
     */
    function toggleVideo(state) {
        if (state) {
            elements.$video.style.display = "block";
            playVideo();
        } else {
            elements.$video.style.display = "none";
            stopVideo();
        }
    }

    /**
     * Method change image
     *
     * @method changeImage
     * @returns {void}
     */
    function changeImage() {
        elements.$product.style.backgroundPositionY = opts.stepSize * elements.$range.value + "px";
    }

    /**
     * Method show product text
     *
     * @method showProductText
     * @param position {number} - position of range slider
     * @returns {void}
     */
    function showProductText(position) {
        var indexOfStart = 0,
            indexOfFirstStep = 5,
            indexOfSecondStep = 25,
            indexOfEnd = 45;

        if (position >= indexOfStart && position < indexOfFirstStep) {
            elements.$productText.innerHTML = productTexts[0].text;
        } else if (position >= indexOfFirstStep && position < indexOfSecondStep) {
            elements.$productText.innerHTML = productTexts[1].text;
        } else if (position >= indexOfSecondStep && position < indexOfEnd) {
            elements.$productText.innerHTML = productTexts[2].text;
        } else if (position >= indexOfEnd) {
            elements.$productText.innerHTML = productTexts[3].text;
        }
    }

    /**
     * Method toggles view of
     * item container
     *
     * @method toggleStateOfItem
     * @param state {Boolean} - true: show, false: hide
     * @return {void}
     */
    function toggleStateOfItem(state) {
        elements.$itemContainer.style.opacity = state ? 1 : 0;
    }

    /**
     * Method toggles reflection of product
     *
     * @method toggleReflection
     * @param position {number} - position of range slider
     * @returns {void}
     */
    function toggleReflection(position) {
        elements.$reflection.style.display = (position > 0) ? "none" : "block";
    }

    /**
     * Method show flashlight camera
     *
     * @method flashlight
     * @param position {number} - position of range slider
     * @returns {void}
     */
    function toggleFlashlight(position) {
        if (position == 30) {
            elements.$flashlight.style.display = "block";

            setTimeout(function () {
                elements.$flashlight.style.backgroundSize = "130%";
                setTimeout(function () {
                    elements.$flashlight.style.display = "none";
                    elements.$flashlight.style.backgroundSize = "40%";
                }, 200);
            }, 70);
        }
    }

    /**
     * Method slide item to bottom
     *
     * @method itemSlideDown
     * @param rainItem {object}
     * @returns {void}
     */
    function itemSlideDown(rainItem) {
        setTimeout(function () {
            rainItem.style.top = "300px";
        }, 500);
    }

    /**
     * Method render item
     *
     * @method rainItem
     * @param item {Object}
     * @return {void}
     */
    function renderItem(item) {
        var rainItem = document.createElement("div"),
            units = "px";

        rainItem.className = "rain-item rain-drop-" + item.rainDropType;
        rainItem.style.top = item.startPositionY + units;
        rainItem.style.left = item.startPositionX + units;

        elements.$itemContainer.appendChild(rainItem);
        itemSlideDown(rainItem);
    }

    /**
     * Method render items
     *
     * @method renderItems
     * @param items {Array}
     * @returns {void}
     */
    function renderItems(items) {
        for (var i = 0; i < items.length; i++) {
            renderItem(items[i]);
        }
    }

    /**
     * Method start rendering items
     *
     * @method startAction
     * @returns {void}
     */
    function startAction() {
        var items = [],
            timerId,
            delay = randomNumber(actionConfig.iterationDelay.min, actionConfig.iterationDelay.max);

        toggleStateOfItem(true);
        timerId = setInterval(function () {
            items.push({
                rainDropType: randomNumber(1, 4),
                startPositionX: randomNumber(1, 450),
                startPositionY: randomNumber(1, 190)
            });

            renderItems(items);
        }, 750);

        setTimeout(function () {
            clearInterval(timerId);
        }, delay);

        isRaining = false;
    }

    /**
     * Method hide rendered items
     *
     * @method stopAction
     * @returns {void}
     */
    function stopAction() {
        toggleStateOfItem(false);
    }

    function initAction(position) {
        var isRainRange = position >= 5 && position <= 25;
        if (!isRaining && isRainRange) {
            isRaining = true;
            startAction();
        } else {
            stopAction();
        }
    }

    /**
     * Method show memory lightning
     *
     * @method memoryLightning
     * @param position {number} - position of range slider
     * @returns {void}
     */
    function memoryLightning(position) {
        var indexOfMemoryLightning = 59;

        if (position == indexOfMemoryLightning) {
            elements.$memorySocket.style.display = "block";
            setTimeout(function () {
                elements.$memoryLightning.style.backgroundPosition = "55px 0px";
                setTimeout(function () {
                    elements.$memoryLightning.style.backgroundPosition = "-45px 0px";
                }, 200);
            }, 200);
        } else {
            elements.$memorySocket.style.display = "none";
        }
    }

    /**
     * Method sets handlers for events
     *
     * @method setEventHandlers
     * @returns {void}
     */
    function setEventHandlers() {
        elements.$range.oninput = function () {
            toggleVideo(isDefaultState());
            changeImage();
            showProductText(elements.$range.value);
            initAction(elements.$range.value);
            toggleReflection(elements.$range.value);
            toggleFlashlight(elements.$range.value);
            memoryLightning(elements.$range.value);
        };
    }

    /**
     * Method init of this module
     *
     * @method init
     * @return {void}
     */
    (function init() {
        setEventHandlers();
        showProductText(0);
    }());

}());
