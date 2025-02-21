<template>
    <div class="vue-scroll-picker" @touchstart="onStart" @touchmove="onMove" @touchend="onEnd" @touchcancel="onCancel"
        @mousewheel="onScroll" @DOMMouseScroll="onScroll" @wheel="onScroll" @mousedown="onStart" @mousemove="onMove"
        @mouseup="onEnd" @mouseleave="onCancel">
        <div class="vue-scroll-picker-list">
            <div ref="list" :class="{
                'vue-scroll-picker-list-rotator': true,
                '-transition': transitioning
            }" :style="top !== null ? { top: `${top}px` } : {}">
                <div v-if="placeholder" :class="{
                    'vue-scroll-picker-item': true,
                    '-placeholder': true,
                    '-selected': currentIndex === -1,
                    '-next-1': currentIndex === -2,
                    '-next-2': currentIndex === -3,
                    '-prev-1': currentIndex === 0,
                    '-prev-2': currentIndex === 1
                }" ref="items" v-html="placeholder"></div>
                <div v-else-if="normalizedOptions.length === 0 && placeholder === null"
                    class="vue-scroll-picker-item -empty -selected" ref="items" v-html="empty"></div>
                <div v-for="(option, index) in normalizedOptions" :key="option.value" :class="{
                    'vue-scroll-picker-item': true,
                    '-selected': currentIndex === index,
                    '-next-1': currentIndex === index - 1,
                    '-next-2': currentIndex === index - 2,
                    '-prev-1': currentIndex === index + 1,
                    '-prev-2': currentIndex === index + 2
                }" ref="items" v-html="option.name"></div>
            </div>
        </div>
        <div class="vue-scroll-picker-layer">
            <div class="top" ref="top"></div>
            <div class="middle" ref="selection"></div>
            <div class="bottom" ref="bottom"></div>
        </div>
    </div>
</template>

<script>
function debounce(handle, delay) {
    let timeout = null;
    return function () {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        const self = this;
        const args = arguments;
        timeout = setTimeout(() => handle.apply(self, args), delay);
    };
}

function getClientCenterY(elem) {
    const { top, bottom } = elem.getBoundingClientRect();
    return (top + bottom) / 2;
}


function normalizeOptions(options) {
    return options.map((option) => {
        switch (typeof option) {
            case 'string': {
                return { value: option, name: option };
            }
            case 'number':
            case 'boolean': {
                return { value: option, name: `${option}` };
            }
        }
        return option;
    });
}

function isTouchEvent(event) {
    return event.changedTouches || event.touches;
}

function getEventXY(event) {
    if (isTouchEvent(event)) {
        return event.changedTouches[0] || event.touches[0];
    }
    return event;
}

export default {
    name: 'ScrollPicker',

    props: {
        value: null,
        options: {
            type: Array,
            default: () => [],
        },
        dragSensitivity: {
            type: Number,
            default: 1.7,
        },
        touchSensitivity: {
            type: Number,
            default: 1.7,
        },
        scrollSensitivity: {
            type: Number,
            default: 1,
        },
        empty: {
            type: String,
            default: 'No Items',
        },
        placeholder: {
            type: String,
            default: null,
        },
    },

    data() {
        const normalizedOptions = normalizeOptions(this.options);

        let innerIndex = normalizedOptions.findIndex(
            (option) => option.value == this.value
        );
        if (innerIndex === -1 && !this.placeholder && this.options.length > 0) {
            innerIndex = 0;
        }
        const innerValue =
            (normalizedOptions[innerIndex] && normalizedOptions[innerIndex].value) ||
            null;

        return {
            normalizedOptions,
            innerIndex,
            innerValue,
            currentIndex: innerIndex, // New property for real-time selection
            top: null,
            pivots: [],
            pivotMin: 0,
            pivotMax: 0,
            transitioning: false,
            transitionTO: null,
            start: null,
            isMouseDown: false,
            isDragging: false,
            scrollOffsetTop: 0,
            scrollMin: 0,
            scrollMax: 0,
        };
    },

    mounted() {
        this.calculatePivots();
        this.top = this.findScrollByIndex(this.innerIndex);
        if (this.innerValue !== this.value) {
            this.$emit('input', this.innerValue);
        }
    },

    watch: {
        value(value) {
            if ((value === null || value === undefined) && this.placeholder) {
                this.correction(-1);
                return;
            }

            const nextInnerIndex = this.normalizedOptions.findIndex(
                (option) => option.value == value
            );
            if (nextInnerIndex === -1) {
                this.$emit('input', this.innerValue);
                return;
            }

            if (this.innerIndex !== nextInnerIndex) {
                this.correction(nextInnerIndex);
            }
        },

        options(options) {
            const normalizedOptions = (this.normalizedOptions = normalizeOptions(
                options
            ));

            let internalIndex = normalizedOptions.findIndex(
                (option) => option.value == this.value
            );
            if (internalIndex === -1 && !this.placeholder && this.options.length > 0) {
                internalIndex = 0;
            }
            const innerValue =
                (normalizedOptions[internalIndex] &&
                    normalizedOptions[internalIndex].value) ||
                null;

            this.$nextTick(() => {
                this.calculatePivots();
                this.top = this.findScrollByIndex(internalIndex);
                this.innerIndex = internalIndex;
                this.currentIndex = internalIndex;
                if (this.innerValue !== innerValue) {
                    this.$emit('input', (this.innerValue = innerValue));
                }
            });
        },
    },

    methods: {
        resize() {
            this.$nextTick(() => {
                this.calculatePivots();
                this.top = this.findScrollByIndex(this.innerIndex);
            });
        },

        calculatePivots() {
            const rotatorTop = this.$refs.list.getBoundingClientRect().top;
            this.pivots = (this.$refs.items || [])
                .map(item => getClientCenterY(item) - rotatorTop)
                .sort((a, b) => a - b);

            this.pivotMin = Math.min(...this.pivots);
            this.pivotMax = Math.max(...this.pivots);

            const selectionEl = this.$refs.selection;
            this.scrollOffsetTop = selectionEl.offsetTop + (selectionEl.offsetHeight / 2);

            this.scrollMin = this.scrollOffsetTop - this.pivotMin;
            this.scrollMax = this.scrollOffsetTop - this.pivotMax;
        },

        sanitizeInternalIndex(index) {
            return Math.min(
                Math.max(index, this.placeholder ? -1 : 0),
                this.normalizedOptions.length - 1
            );
        },

        findIndexFromScroll(scroll) {
            this.calculatePivots();

            let prevDiff = null;
            let pivotIndex = 0;
            this.pivots.forEach((pivot, i) => {
                const diff = pivot + scroll - this.scrollOffsetTop;
                if (prevDiff === null || Math.abs(prevDiff) > Math.abs(diff)) {
                    pivotIndex = i;
                    prevDiff = diff;
                }
            });
            if (this.placeholder || this.options.length === 0) {
                return pivotIndex - 1;
            }
            return pivotIndex;
        },

        findScrollByIndex(index) {
            let pivotIndex = index;
            if (this.placeholder || this.options.length === 0) {
                pivotIndex++;
            }
            if (index > -1 && pivotIndex in this.pivots) {
                return this.scrollOffsetTop - this.pivots[pivotIndex];
            }
            if (index >= this.pivots.length) {
                return this.scrollOffsetTop - this.pivotMax;
            }

            return this.scrollOffsetTop - this.pivotMin;
        },

        updateCurrentIndex() {
            const currentIndex = this.sanitizeInternalIndex(
                this.findIndexFromScroll(this.top)
            );
            if (this.currentIndex !== currentIndex) {
                this.currentIndex = currentIndex;
            }
        },

        onScroll(e) {
            if (this.top >= this.scrollMin && e.deltaY < 0) return;
            if (this.top <= this.scrollMax && e.deltaY > 0) return;
            if (this.pivots.length === 1) return;

            e.preventDefault();

            const nextDirInnerIndex = this.sanitizeInternalIndex(
                this.innerIndex + (e.deltaY > 0 ? 1 : -1)
            );
            const deltaMax =
                e.deltaY > 0
                    ? this.findScrollByIndex(nextDirInnerIndex - 1) -
                    this.findScrollByIndex(nextDirInnerIndex)
                    : this.findScrollByIndex(nextDirInnerIndex) -
                    this.findScrollByIndex(nextDirInnerIndex + 1);

            const deltaY = Math.max(
                Math.min(e.deltaY, deltaMax),
                deltaMax * -1
            );

            this.top = Math.min(
                Math.max(
                    this.top - deltaY * this.scrollSensitivity,
                    this.scrollMax
                ),
                this.scrollMin
            );

            this.updateCurrentIndex();

            const nextInnerIndex = this.currentIndex;
            const nextInnerValue =
                (this.normalizedOptions[nextInnerIndex] &&
                    this.normalizedOptions[nextInnerIndex].value) ||
                null;

            this.innerIndex = nextInnerIndex;
            if (this.innerValue !== nextInnerValue) {
                this.$emit('input', (this.innerValue = nextInnerValue));
            }

            this.onAfterWheel();
        },

        onAfterWheel: debounce(function () {
            this.correction(this.findIndexFromScroll(this.top));
        }, 200),

        onStart(event) {
            if (event.cancelable) {
                event.preventDefault();
            }

            const { clientY } = getEventXY(event);
            this.start = [this.top, clientY];
            if (!isTouchEvent(event)) {
                this.isMouseDown = true;
            }
            this.isDragging = false;
        },

        onMove(e) {
            if (e.cancelable) {
                e.preventDefault();
            }
            if (!this.start) {
                return;
            }
            const { clientY } = getEventXY(e);
            const diff = clientY - this.start[1];
            if (Math.abs(diff) > 1.5) {
                this.isDragging = true;
            }
            this.top =
                this.start[0] +
                diff * (isTouchEvent(e) ? this.touchSensitivity : this.dragSensitivity);

            // Update current index during movement
            this.updateCurrentIndex();
        },

        onEnd(e) {
            if (e.cancelable) {
                e.preventDefault();
            }
            if (this.isDragging) {
                this.correction(this.findIndexFromScroll(this.top));
            } else if (this.isMouseDown) {
                this.handleClick(e);
            }
            this.start = null;
            this.isDragging = false;
            this.isMouseDown = false;
        },

        onCancel(e) {
            if (e.cancelable) {
                e.preventDefault();
            }
            this.correction(this.findIndexFromScroll(this.top));
            this.start = null;
            this.isMouseDown = false;
            this.isDragging = false;
        },

        handleClick(e) {
            const touchInfo = getEventXY(e);
            const x = touchInfo.clientX;
            const y = touchInfo.clientY;
            const topRect = this.$refs.top.getBoundingClientRect();
            const bottomRect = this.$refs.bottom.getBoundingClientRect();
            if (
                topRect.left <= x &&
                x <= topRect.right &&
                topRect.top <= y &&
                y <= topRect.bottom
            ) {
                this.correction(this.innerIndex - 1);
            } else if (
                bottomRect.left <= x &&
                x <= bottomRect.right &&
                bottomRect.top <= y &&
                y <= bottomRect.bottom
            ) {
                this.correction(this.innerIndex + 1);
            }
        },

        correction(index) {
            const nextInnerIndex = this.sanitizeInternalIndex(index);
            const nextInnerValue =
                (this.normalizedOptions[nextInnerIndex] &&
                    this.normalizedOptions[nextInnerIndex].value) ||
                null;
            this.top = this.findScrollByIndex(nextInnerIndex);

            this.transitioning = true;
            if (this.transitionTO) {
                clearTimeout(this.transitionTO);
                this.transitionTO = null;
            }

            this.transitionTO = setTimeout(() => {
                this.transitioning = false;
                this.transitionTO = null;

                this.innerIndex = nextInnerIndex;
                this.currentIndex = nextInnerIndex;
                if (this.innerValue !== nextInnerValue) {
                    this.innerValue = nextInnerValue;
                    this.$emit('input', this.innerValue);
                }
            }, 100);
        },
    },
};
</script>