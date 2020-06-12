/******************************
This IS A SOLUTION FOR CAROUSEL 

In this solution, I only used basic DOM operations and javascript concepts
So it can be modified based on advanced js methods
******************************/

// enclose all functions into a single global function 
function autoRollImg(){
    // prepare all the variables
    // timer is a Timer, getElementByClassName returns an array so we should use [] to access
    // ImgWidth can be obtained using offsetWidth
    // index is used to localize the sequence of dots
    var timer = null;
    var showContainer = document.getElementsByClassName("showContainer")[0]; 
    var container = document.getElementsByClassName("container")[0];
    var imgNum = container.children.length;
    var oneimgWidth = container.children[0].offsetWidth;
    var leftTriangle = document.getElementsByClassName("left-triangle")[0];
    var rightTriangle = document.getElementsByClassName("right-triangle")[0];
    var dots = document.getElementsByClassName("dots")[0].children; 
    var index = 0;

    // this func can show dots based on the index 
    function showDots(target){
        var dots = document.getElementsByClassName("dots")[0].children;
        // iterate all the dots and update their state
        for(let i=0;i<dots.length;i++){
            if(i !== target){
                // active class is clarified in CSS style sheet
                dots[i].classList.remove("active");
            }else{
                dots[i].classList.add("active");
            }
        }
    }

    // this func defines the basic movement process which can be used in other functions
    function movement(offset){
        var initialLeft = parseInt(container.style.left);
        var newLeft = initialLeft + offset;
        container.style.left = newLeft + "px";
    }

    // mouse event
    showContainer.onmouseover = function(){
        clearInterval(timer);
    };
    showContainer.onmouseout = function(){
        rollAuto();
    };


    // this func is used to register triangle click event
    function clickTriangle(){
        leftTriangle.onclick = function(){
            if(parseInt(container.style.left) >= 0){
                container.style.left = -(imgNum-1) * oneimgWidth + "px";
            }else{
                movement(oneimgWidth);
            }
            index = index - 1;
            if(index < 0){
                index = imgNum - 1;
            }
            // don't forget to showDots !
            showDots(index);
        };
        rightTriangle.onclick = function(){
            if(parseInt(container.style.left) <= -(imgNum-1) * oneimgWidth){
                container.style.left = "0px";
            }else{
                movement(-oneimgWidth);
            }
            index = index + 1;
            if(index > imgNum - 1){
                index = 0;
            }
            showDots(index);
        };
    }
    clickTriangle();

    // this func used to register dots click event
    function clickDots(){
        
        dots[0].onclick = function(){
            container.style.left = "0px";
            index = 0;
            showDots(index);
        };
        dots[1].onclick = function(){
            container.style.left = - oneimgWidth + "px";
            index = 1;
            showDots(index);
        };
        dots[2].onclick = function(){
            container.style.left = - 2 * oneimgWidth + "px";
            index = 2;
            showDots(index);
        };
    
        return index;
    }
    clickDots();
    
    // auto scroll function
    function rollAuto(){
        // set timer using setInterval
        timer = setInterval(function(){
            movement(-oneimgWidth);
            index++;
            // consider the range of index
            if(index > imgNum - 1){
                index = 0;
            }
            showDots(index);
            // reset the img to the first one
            if(parseInt(container.style.left) <= - imgNum * oneimgWidth){
                container.style.left = "0px";
            }
        }, 2000);
    }
    rollAuto();
}

window.onload = autoRollImg;
