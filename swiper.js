/**
MIT License

Copyright (c) 2018 Evgeniy Poznyak

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const renderHTML = `<div id="res" style="height: 200px; background: gray"></div>`;

    document.body.innerHTML = renderHTML;

    const options = {

        left: function (self) {

            // place your code here
            self.div.style.backgroundColor = 'red';
        },

        right: function (self) {
            // place your code here
            self.div.style.backgroundColor = 'blue';
        },
        up: function (self) {
            // place your code here
            self.div.style.backgroundColor = 'black';
        },
        down: function (self) {
            // place your code here
            self.div.style.backgroundColor = 'green';
        }

    }


    const swiper = new Swiper('#res');

    function Swiper(selector) {

        const self = this;
        
        // options  visible by Closure
        self.options = options;
        self.div = document.querySelector(selector);
        self.xDown = null;
        self.yDown = null;

        self.div.addEventListener('touchstart', function (e) {
            self.xDown = e.touches[0].clientX;
            self.yDown = e.touches[0].clientY;
        })

        self.div.addEventListener('touchmove', function (e) {
            if (!self.xDown || !self.yDown) {
                return;
            }

            self.xUp = e.touches[0].clientX;
            self.yUp = e.touches[0].clientY;

            self.xDiff = self.xDown - self.xUp;
            self.yDiff = self.yDown - self.yUp;


            if (Math.abs(self.xDiff) > Math.abs(self.yDiff)) {
                /!*most significant*!/
                if (self.xDiff > 0) {
                    /!* left swipe *!/
                    self.options.left(self);
                } else {
                    /!* right swipe *!/
                    self.options.right(self);
                }
            } else {
                if (self.yDiff > 0) {
                    /!* up swipe *!/
                    self.options.up(self);
                } else {
                    /!* down swipe *!/
                    self.options.down(self);
                }
            }
            /!* reset values *!/
            self.xDown = null;
            self.yDown = null;


        })
    };
