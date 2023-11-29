(function($, root, undefined) {
    $(function() {
        'use strict';

        dragElement(document.getElementById("copyrightWindow"));
        dragElement(document.getElementById("contactWindow"));
 
        dragElement(document.getElementById("datesWindow"));


        var x, y;

        function dragElement(elmnt) {
            let pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0;

            let dragHandle = elmnt.getElementsByClassName("drag-handle")[0];


            if (dragHandle !== undefined) {
                // if present, the header is where you move the DIV from:
                dragHandle.onmousedown = dragMouseDown;
                //dragHandle.ontouchstart = dragMouseDown;
            } else {
                // otherwise, move the DIV from anywhere inside the DIV:
                elmnt.onmousedown = dragMouseDown;
                //elmnt.ontouchstart = dragMouseDown;
            }

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();

                if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
                    /*let evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
                    let touch = evt.touches[0] || evt.changedTouches[0];
                    x = touch.pageX;
                    y = touch.pageY;
                    // elmnt.classList.add("draggin"); */
                    return false;
                } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover' || e.type == 'mouseout' || e.type == 'mouseenter' || e.type == 'mouseleave') {
                    x = e.clientX;
                    y = e.clientY;

                }

                // get the mouse cursor position at startup:
                pos3 = x;
                pos4 = y;
                document.onmouseup = closeDragElement;
                //document.ontouchend = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
                //document.ontouchmove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();

                if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
                    /*let evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
                    let touch = evt.touches[0] || evt.changedTouches[0];
                    x = touch.pageX;
                    y = touch.pageY;*/
                    return false;
                } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover' || e.type == 'mouseout' || e.type == 'mouseenter' || e.type == 'mouseleave') {
                    x = e.clientX;
                    y = e.clientY;
                }

                // calculate the new cursor position:
                pos1 = pos3 - x;
                pos2 = pos4 - y;
                pos3 = x;
                pos4 = y;
                // set the element's new position:
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }

            function closeDragElement() {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.ontouchcancel = null;
                document.ontouchend = null;
                document.onmousemove = null;
                document.ontouchmove = null;
                // elmnt.classList.remove("draggin");
            }
        }
    });
})(jQuery, this);