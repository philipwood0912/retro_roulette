(() => {
    
    console.log("linked up");
    
    //double coin drop on number is bugged
    //
    //variables
    
    var start = document.querySelector("#start"),
        startscreen = document.querySelector("#retro"),
        canv = document.querySelector("#container"),
        btmRow = document.querySelector("#bottomRow"),
        cntDown = document.querySelector(".count-down"),
        dropBoard = document.querySelector(".board-grid"),
        dropZones = document.querySelectorAll(".dropZones"),
        board = document.querySelector(".roul-board"),
        wheelScreen = document.querySelector("#wheel-screen"),
        wheel = document.getElementById("svgObject"),
        wheelObj = document.querySelector("#svgObject"),
        numDis = document.querySelector(".numDisplay"),
        timeText = document.querySelector(".time-text"),
        money = document.querySelector(".money"),
        coins = document.querySelectorAll(".chip"),
        bottomBut = document.querySelector(".bottomBut"),
        coinHolder = document.querySelector("#coinHolder"),
        holders = document.querySelectorAll(".holder"),
        boardCoins = document.querySelectorAll(".board-coin"),
        chipText = document.querySelectorAll(".chip-text"),
        numberText = document.querySelector("#spunNumberText"),
        numberCon = document.querySelector("#spunNumberCon"),
        winnerScreen = document.querySelector("#winScreenCon"),
        winnerMoney = document.querySelector("#winnerMoney"),
        helpCon = document.querySelector("#helpCon"),
        helpBut = document.querySelector("#help"),
        helpClose = document.querySelector("#helpClose");
        
    
    var timer = 20,
        deg = 360 / 38;
    
    //
    //Arrays
    
    const wheelArr = [29, 34, 30, 35, 31, 36, 32, 37, 33, 14, 18, 13, 17, 12, 16, 11, 15, 10, 0, 1, 6, 2, 7, 3, 8, 4, 9, 5, 24, 28, 23, 27, 22, 26, 21, 25, 20, 19];
    //const wheelArr = [19, 20, 25, 21, 26, 22, 27, 23, 28, 24, 5, 9, 4, 8, 3, 7, 2, 6, 1, 0, 10, 15, 11, 16, 12, 17, 13, 18, 14, 33, 37, 32, 36, 31, 35, 30, 34, 29];
    const colorAr = ["pink", "blue", "pink", "blue", "pink", "blue", "pink", "blue", "pink", "blue", "pink", "blue", "pink", "blue", "pink", "blue", "pink", "blue", "", "blue", "pink", "blue", "pink", "blue", "pink", "blue", "pink", "blue", "pink", "blue", "pink", "blue", "pink", "blue", "pink", "blue", "pink", ""];
    const numAr = [1, 13, 36, 24, 3, 15, 34, 22, 5, 17, 32, 20, 7, 11,  30, 26, 9, 28, 0, 2, 14, 35, 23, 4, 16, 33, 21, 6, 18, 31, 19, 8, 12, 29, 25, 10, 27, 37];
    const numDisplayAr = [1, 13, 36, 24, 3, 15, 34, 22, 5, 17, 32, 20, 7, 11,  30, 26, 9, 28, 0, 2, 14, 35, 23, 4, 16, 33, 21, 6, 18, 31, 19, 8, 12, 29, 25, 10, 27, 00];
    var angleAr = [];
    var changeAr = [];
    var dropAr = [];
    
    var testAr = [1];
    
    angleAr.push(deg);
    while(angleAr.length < 38){
        angleAr.push(deg + deg * angleAr.length);
    }
    
    //
    //Random function
    
    function getRandomNum(min, max){
        return Math.floor(Math.random() * (max - min) + min);  
    }
    
    //
    //intro
    
    function showBoard() {
        startscreen.classList.add("hidden");
        board.classList.remove("hidden");
        TweenMax.fromTo(board, 1, {opacity: 0}, {opacity: 1}).eventCallback("onComplete", showStats);
    }
    
    function showStats() {
        board.classList.remove("hidden");
        dropBoard.classList.remove("hidden");
        cntDown.classList.remove("hidden");
        btmRow.classList.remove("hidden");
        btmRow.classList.add("bottom-row");
        TweenMax.fromTo(cntDown, 0.5, {opacity: 0}, {opacity: 1});
        TweenMax.fromTo(btmRow, 0.5, {opacity: 0}, {opacity: 1}).eventCallback("onComplete", countDwn, null, this);
        //debugger;
    }
    
    //
    //Countdown - bet handling - drag n drop
    
    function timerReset() {
        timer = 20;
        timeText.innerHTML = timer;
    }
    
    function dropReset() {
        dropZones.forEach(zone => {
            zone.innerHTML = "";
            zone.id = "";
            zone.classList.remove("check");
        });
    }
    var bets;
    function betCheck(x) {
            if(x >= 0){
                    bets = true;
                } else {
                    bets = false;
                }
        }
    
    function countDwn() {
        //var bets;
        var checkIt;
        var moneyAddition = 0;
        var numberSpun = this;
        var actualNum = numberSpun - 1;
        var actualNumber = numAr[actualNum];
        betCheck(actualNum);
        debugger;
        if(bets == true) {
            //use this area to handle bets already placed at beginning of new round
            var checked = document.querySelectorAll(".check");
            //check here for issue with double payout on double chip drop
            for(var i = 0; i < checked.length; i++){
                var chkData = checked[i].dataset.dropref;
                var dataSpl = chkData.split("-");
                var payOut = checked[i].dataset.payout;
                var zoneChip = checked[i].childNodes[0];
                var zoneChipMoney = zoneChip.childNodes[0].textContent;
                for(var x = 0; x < dataSpl.length; x++){
                    if(dataSpl[x] == actualNumber || dataSpl[x] == colorAr[actualNum]){
                        //var currentMoney = money.textContent.slice(1);
                        var moneyMultiply = Number(zoneChipMoney) * Number(payOut);
                        //var addMoney = Number(currentMoney) + moneyMultiply;
                        //money.textContent = "$" + addMoney;
                        //var moneyTotal = 0 + addMoney;
                        moneyAddition += moneyMultiply;
                        checkIt = true;
                        debugger;
                    } else {
                        continue;
                        //checkIt = false;
                        
                    }
                }
                //checked[i].innerHTML = "";
                //checked[i].id = "";
            }
            function numberDisplay(x, y) {
                var displayNum = x;
                var chkNum = y;
                numberCon.classList.remove("hidden");
                numberText.textContent = displayNum;
                function returnNum() {
                    TweenMax.fromTo(numberCon, 2, {opacity: 1}, {opacity: 0}).eventCallback("onComplete", winorlose, null, chkNum);
                    debugger;
                }
                TweenMax.fromTo(numberCon, 2, {opacity: 0}, {opacity: 1}).eventCallback("onComplete", returnNum);
            }
            
            function winScreen(x, y){
                var winningMoney = x;
                var chkNum = y;
                var currentMoney = money.textContent.slice(1);
                var addMoney = Number(currentMoney) + winningMoney;
                winnerScreen.classList.remove("hidden");
                winnerMoney.textContent = "$" + winningMoney;
                money.textContent = "$" + addMoney;
                function returnWin() {
                    TweenMax.fromTo(winnerScreen, 2, {opacity: 1}, {opacity: 0}).eventCallback("onComplete", winorlose, null, chkNum);
                    debugger;
                }
                TweenMax.fromTo(winnerScreen, 2, {opacity: 0}, {opacity: 1}).eventCallback("onComplete", returnWin);
                
            }
            
            function winorlose(){
                numberCon.classList.add("hidden");
                winnerScreen.classList.add("hidden");
                var winChk = this;
                betCheck(winChk);
                //timerGuy(bets);
                if(bets == true){
                    winScreen(moneyAddition, -1);
                } else {
                    timerGuy(bets);
                }
                debugger;
            }
            
            if(checkIt == true) {
                numberDisplay(actualNumber, actualNumber);
                debugger;
            } else {
                numberDisplay(actualNumber, -1);
                debugger;
            }
        } else {
            timerGuy(bets);
        }
        function timerGuy(x){
            if(x == false) {
                dropReset();
                var pause = false;
                helpBut.addEventListener("click", function(e) {
                    e.preventDefault();
                    pause = true;
                    helpCon.classList.remove("hidden");
                });
                helpClose.addEventListener("click", function(e) {
                    e.preventDefault();
                    pause = false;
                    helpCon.classList.add("hidden");
                });
                var cntDownTimer = setInterval(function() {
                    if(!pause){
                        timeText.innerHTML = timer;
                        timer--;
                        if(timer <= -2){
                        clearInterval(cntDownTimer);

                        timerReset();

                        wheelScreen.classList.remove("hidden");
                        wheelScreen.classList.add("wheel-screen");
                        btmRow.classList.remove("bottom-row");
                        dropBoard.classList.add("hidden");
                        cntDown.classList.add("hidden");
                        btmRow.classList.add("hidden");
                        board.classList.add("hidden");

                        TweenMax.fromTo(wheelScreen, 0.5, {opacity: 0}, {opacity: 1}).eventCallback("onComplete", wheelSpin);
                        } 
                    }
                }, 1000);
            }
        }
    }
    
    //drag and drop functionality
    
    holders.forEach(holder => {
                holder.addEventListener("dragstart", function(e) {
                    e.dataTransfer.setData("text/plain", this.id);
                    //debugger;
                }); 
            });
    
    dropZones.forEach(zone => {
            //have to figure out how to reset dropcount on new round
            var dropCounter = 0;
            zone.addEventListener("dragover", function(e) {
                e.preventDefault();
            });

            zone.addEventListener("drop", function(e) {
                 e.preventDefault();
                 dropCounter += 1;
                 if(e.target.innerHTML == ""){
                     dropCounter = 1;
                 }

                 function stopMoney(x, y){
                    var objStop = x;
                    var zone = y;
                    var objNum = objStop.id.split("-")[1];
                    var currentMoneyStr = money.textContent;
                    var currentMoney = Number(currentMoneyStr.slice(1));
                    var moneyAmount = currentMoney - Number(objNum);
                    var moneyCheck = Math.sign(moneyAmount);
                    if (moneyCheck == -1 && dropCounter >= 0){
                            dropCounter = 1;
                            return false;
                            debugger;
                        } else {
                            if(zone.childNodes.length < 1){
                                zone.appendChild(objStop);
                            }
                        }
                 }

                 function moneyDeduction(x) {
                    var currentMoneyStrTwo = money.textContent;
                    var currentMoney = currentMoneyStrTwo.slice(1);
                    var targetSplit = x.id.split("-")[1];
                    var moneyChange = Number(currentMoney) - Number(targetSplit);
                    var moneyCheck = Math.sign(moneyChange);
                    if(moneyCheck == -1) {
                        return false;
                    } else {
                        money.textContent = "$" + moneyChange;
                    }
                    debugger;
                }

                 function createPiece(x, y) {
                     var boolChk = Boolean(y);
                     var obj = x;
                     var newCoin = document.createElement("div");
                     //debugger;
                    if(boolChk === true){
                        var newNum = getRandomNum(0, 200);
                        //let newCoin = document.createElement("div");
                        let newCoinText = document.createElement("h2");
                        var objSpl = obj.id.split("-")[1];
                        newCoin.appendChild(newCoinText);
                        newCoinText.textContent = objSpl;
                        newCoin.classList.add("chip");
                        newCoin.classList.add("board-coin");
                        newCoinText.classList.add("chip-text");
                        newCoin.id = "chip-" + objSpl + "-0-" + newNum;
                        newCoin.setAttribute("draggable", "true");
                        //zone.appendChild(newCoin);
                        stopMoney(newCoin, zone);
                        moneyDeduction(newCoin);
                        //debugger;
                    } else {
                        var prevPar = dupNode.parentElement;
                        prevPar.classList.remove("check");
                        //dropCounter = 1;
                        zone.appendChild(dupNode);


                        //debugger;
                    }
                    newCoin.addEventListener("dragstart", function(e) {
                        e.dataTransfer.setData("text/plain", this.id);
                        var parentZone = this.parentNode;
                        parentZone.id = "zone-0";
                        //dropCounter = 0;
                        //debugger;
                    });
                    var boardDivs = document.querySelectorAll(".dropZones div");
                     boardDivs.forEach(div => {
                        div.addEventListener("dragstart", function(e){
                            e.dataTransfer.setData("text/plain", this.id);
                            var parentZone = this.parentNode;
                            parentZone.id = "zone-0";
                            //dropCounter = 0;
                        }); 
                     });
                     //debugger;
                }    

                 var piece = e.dataTransfer.getData("text/plain");
                 var dupNode = document.querySelector(`#${piece}`);
                 var boolSpl = Number(dupNode.id.split("-")[2]);
                 var dupSplit = piece.split("-")[1];

                 if(dropCounter <= 1){
                     zone.id = "zone-" + dupSplit; 
                 }
                debugger;

                 createPiece(dupNode, boolSpl);

                 if(dropCounter > 1){
                     var zoneSplit = zone.id.split("-")[1];
                     var firstDrop = zone.firstChild;
                     var firstText = firstDrop.firstChild;
                     var newNum = Number(dupSplit) + Number(zoneSplit);
                     var newNumId = getRandomNum(0, 200);
                     zone.classList.remove("check");
                     zone.classList.add("check");
                     //debugger;

                     firstText.textContent = newNum;
                     debugger;
                     zone.id = "zone-" + newNum;
                     firstDrop.id = "chip-" + newNum + "-0-" + newNumId;

                     //zone.removeChild(lastDrop);
                     var zoneChld = zone.lastChild;
                        if(zone.children.length > 1){
                            zone.removeChild(zoneChld);
                        }
                     dropCounter = 1;
                     //debugger;
                 }
                 console.log(dropCounter);
                zone.classList.add("check");
                 //debugger;
             });
            zone.addEventListener("click", function(e) {
                dropCounter = 0;
                var zoneChild = zone.firstChild;
                var zoneChildTxt = zoneChild.firstChild;
                var zoneChildAmount = zone.id.split("-")[1];
                var currentCash = money.textContent.slice(1);
                var cashAddition = Number(zoneChildAmount) + Number(currentCash);

                money.textContent = "$" + cashAddition;

                zone.classList.remove("check");
                zone.removeChild(zoneChild); 
            });

        });
    
    
    //
    //Wheel spin
    
    function wheelSpin() {
        //var spinNum = 0;
        var spinNum = getRandomNum(1, 38);
        var actualNum = spinNum - 1;
        const animationTime = 7000;
        var addInt = 0,
            bg = 0,
            bgR = 0;
        
        var svgDoc = wheel.contentDocument,
            spinBg = svgDoc.querySelectorAll(".bgs"),
            spinArr = Array.from(spinBg);
        
        console.log(spinNum);
        console.log(numAr[spinNum]);
        console.log(wheelArr[spinNum]);
        TweenMax.fromTo(wheelObj, 8, {rotation: 0}, {rotation: angleAr[actualNum] + 1080}).delay(3);
        
        function colorSpin() {
            spinArr[wheelArr[bg]].style.fill = "#fff";
            
        }
        
        function colorReturn() {
            spinArr[wheelArr[bgR]].style.fill = "#" + spinArr[wheelArr[bgR]].dataset.fill;
        }
        
        setTimeout(function() {
            var colorInt = setInterval(function() {
            colorSpin();
            numDis.textContent = numAr[bg - 1];
            function colorReset() {
                for(var i = 0; i < spinArr.length; i++) {
                    spinArr[wheelArr[i]].style.fill = "#" + spinArr[wheelArr[i]].dataset.fill;
                }
            }
            if(bg < spinArr.length) {
                bg += 1;
                addInt += 10;
            }
            if(bg > 1) {
                colorReturn();
                bgR += 1;
            }
            if(bg == spinArr.length) {
                bg = 0;
            }
            if(bgR == spinArr.length) {
                bgR = 0;
            }
            if(addInt === animationTime) {
                clearInterval(colorInt);
                colorReset();
                spinArr[wheelArr[actualNum]].style.fill = "#fff";
                numDis.textContent = numDisplayAr[actualNum];
                var delayInt = setTimeout(function() {
                    colorReset();
                    numDis.textContent = "00";
                    TweenMax.fromTo(wheelObj, 0.0001, {rotation: angleAr[actualNum] + 1080}, {rotation: 0}).eventCallback("onComplete", showStats, null, spinNum);
                    wheelScreen.classList.remove("wheel-screen");
                    wheelScreen.classList.add("hidden");
                    //debugger;
                }, 3000);
            }
        }, 10);
        }, 3000);
        
        
        //debugger;
    }
    
    //
    
    //Events - Start Help ETC
    
    var startTitle = document.querySelector("#start h2");

    start.addEventListener("mouseover", function(e) {
        startTitle.textContent = "Spin!";
    });

    start.addEventListener("mouseleave", function(e) {
        startTitle.textContent = "Ready?";
    });
    
    start.addEventListener("click", function(e) {
        console.log("clicked");
        TweenMax.to(startscreen, 0.1, {opacity: 0}).eventCallback("onComplete", showBoard);
    });
    
    
    
    
})();
